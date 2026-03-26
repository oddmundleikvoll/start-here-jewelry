import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { email, path } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (!path || typeof path !== "string") {
      return NextResponse.json(
        { error: "Missing path." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      return NextResponse.json(
        { error: "Email system not configured yet. Check back soon!" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    // First try to find existing contact
    const { data: listData } = await resend.contacts.list({ audienceId });

    if (listData?.data) {
      const existing = (listData.data as any[]).find((c: any) => c.email === email)
      if (existing?.id) {
        // Update existing contact's tags via PATCH
        const currentTags: string[] = (existing.tags as string[] | undefined) || []
        const pathTag = `path:${path}`
        if (!currentTags.includes(pathTag)) {
          await fetch(`https://api.resend.com/audiences/${audienceId}/contacts/${existing.id}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tags: [...currentTags, pathTag] }),
          })
        }
        return NextResponse.json({ success: true, id: existing.id, updated: true })
      }
    }

    // No existing contact — create new with path tag
    const { data, error } = await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: false,
      tags: [`path:${path}`],
    } as any);

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not add email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Subscribe-path error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

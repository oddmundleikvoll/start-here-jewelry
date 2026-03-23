import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Ugyldig e-postadresse." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "E-postsystemet er ikke konfigurert ennå. Sjekk tilbake snart!" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.contacts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      email,
      unsubscribed: false,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Kunne ikke legge til e-postadressen. Prøv igjen." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen." },
      { status: 500 }
    );
  }
}

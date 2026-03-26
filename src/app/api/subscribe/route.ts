import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Force dynamic to prevent static caching - ensure fresh env vars on each request
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // Debug: log what we have (first 8 chars only, never the full key)
  console.log("API Key status:", apiKey ? "SET" : "MISSING/EMPTY");
  console.log("Audience ID:", audienceId ? "SET" : "MISSING");

  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json(
      {
        error: "E-postsystemet er ikke konfigurert ennå. Sjekk tilbake snart!",
        debug: { apiKeyStatus: apiKey ? "set" : "missing", hasAudience: !!audienceId }
      },
      { status: 503 }
    );
  }

  try {
    const { email, locale } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Ugyldig e-postadresse." }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    // 1. Add contact
    await resend.contacts.create({
      audienceId: audienceId!,
      email,
      unsubscribed: false,
    }).catch((e: any) => {
      // Ignore "already exists" errors
      if (!e?.message?.includes("already exists")) {
        console.error("Contact create error:", e?.message);
      }
    });

    // 2. Send welcome email
    const acceptLang = req.headers.get("accept-language") || "";
    const isNorwegian = locale === "no" || (!locale && acceptLang.startsWith("no"));
    const [subject, html] = isNorwegian ? norwegianWelcome() : englishWelcome();

    const emailResult = await resend.emails.send({
      from: "Start Here Jewelry <noreply@wntviral.com>",
      to: email,
      subject,
      html,
    });

    if (emailResult.error) {
      console.error("Email send failed:", JSON.stringify(emailResult.error));
      return NextResponse.json(
        { error: "Kunne ikke sende email. Prøv igjen.", detail: emailResult.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, emailId: emailResult.data?.id });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen." },
      { status: 500 }
    );
  }
}

function englishWelcome(): [string, string] {
  return [
    "Welcome! Take the quiz for your personal jewelry start plan 🎯",
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Welcome to Start Here Jewelry!</title></head><body style="margin:0;padding:0;background:#FDF8F3;font-family:Georgia,serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#FDF8F3;padding:40px 20px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);"><tr><td style="background:#F4EDE4;padding:32px 40px;text-align:center;"><h1 style="margin:0;font-size:28px;color:#7C3D11;font-weight:700;">Welcome!</h1><p style="margin:12px 0 0;font-size:16px;color:#6B4F3A;">Your jewelry start plan is on its way.</p></td></tr><tr><td style="padding:32px 40px;"><p style="font-size:16px;line-height:1.7;color:#3D2B1F;margin:0 0 20px;">Thanks for signing up! You're now among the first to know when new guides and start packages are ready.</p><p style="font-size:16px;line-height:1.7;color:#3D2B1F;margin:0 0 20px;"><strong>Have you taken the quiz yet?</strong><br>Get a personal recommendation in under 2 minutes.</p></td></tr><tr><td style="padding:0 40px 32px;text-align:center;"><a href="https://wntviral.com/quiz" style="display:inline-block;background:#C4622D;color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-size:16px;font-weight:600;">Take the quiz</a></td></tr><tr><td style="background:#F4EDE4;padding:24px 40px;text-align:center;"><p style="font-size:13px;color:#9A7B5B;margin:0;"><a href="https://wntviral.com" style="color:#C4622D;">wntviral.com</a></p></td></tr></table></td></tr></table></body></html>`,
  ];
}

function norwegianWelcome(): [string, string] {
  return [
    "Velkommen! Ta quizen for din personlige smykkestart-plan 🎯",
    `<!DOCTYPE html><html lang="no"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Velkommen til Start Here Jewelry!</title></head><body style="margin:0;padding:0;background:#FDF8F3;font-family:Georgia,serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#FDF8F3;padding:40px 20px;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);"><tr><td style="background:#F4EDE4;padding:32px 40px;text-align:center;"><h1 style="margin:0;font-size:28px;color:#7C3D11;font-weight:700;">Velkommen!</h1><p style="margin:12px 0 0;font-size:16px;color:#6B4F3A;">Din smykkestart-plan er pa vei.</p></td></tr><tr><td style="padding:32px 40px;"><p style="font-size:16px;line-height:1.7;color:#3D2B1F;margin:0 0 20px;">Takk for at du meldte deg pa! Du er na blant de forste som far vite nar nye veiledninger og startpakker er klare.</p><p style="font-size:16px;line-height:1.7;color:#3D2B1F;margin:0 0 20px;"><strong>Har du tatt quizen enda?</strong><br>Fa en personlig anbefaling pa under 2 minutter.</p></td></tr><tr><td style="padding:0 40px 32px;text-align:center;"><a href="https://wntviral.com/quiz" style="display:inline-block;background:#C4622D;color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-size:16px;font-weight:600;">Ta quizen na</a></td></tr><tr><td style="background:#F4EDE4;padding:24px 40px;text-align:center;"><p style="font-size:13px;color:#9A7B5B;margin:0;"><a href="https://wntviral.com" style="color:#C4622D;">wntviral.com</a></p></td></tr></table></td></tr></table></body></html>`,
  ];
}

import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  
  return NextResponse.json({
    resendKeyExists: !!key,
    resendKeyPrefix: key ? key.slice(0, 8) : null,
    resendKeyLength: key ? key.length : 0,
    audienceExists: !!audience,
    allEnvKeys: Object.keys(process.env).filter(k => k.toLowerCase().includes('resend')),
  });
}

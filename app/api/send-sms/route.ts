import twilio from "twilio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone } = await req.json();

  const client = twilio(
    process.env.TWILIO_SID!,
    process.env.TWILIO_AUTH!
  );

  await client.messages.create({
    body: "Your lab test booking is confirmed ✅",
    from: process.env.TWILIO_PHONE!,
    to: phone,
  });

  return NextResponse.json({ success: true });
}
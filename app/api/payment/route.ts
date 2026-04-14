import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST() {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: 159900, // ₹1599
    currency: "INR",
  });

  return NextResponse.json(order);
}
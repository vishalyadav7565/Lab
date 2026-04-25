import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message, test } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    let prompt = "";

    if (test) {
      prompt = `
You are a smart health assistant.

Test Details:
- Name: ${test.name}
- Price: ₹${test.price}
- Original Price: ₹${test.original}
- Parameters: ${test.parameters}
- Report Time: ${test.reportTime}
- Rating: ${test.rating} ⭐ (${test.reviews} reviews)
- Includes: ${test.includes.join(", ")}

Description:
${test.description}

User Question:
${message}

Give helpful answer + suggest upgrade if useful + encourage booking.
`;
    } else {
      prompt = `
You are a health assistant.

Help user choose best test.

User: ${message}

Suggest full body checkup if unsure.
Keep answer short and helpful.
`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return NextResponse.json({
      reply: response.text(),
    });

  } catch (err) {
    console.error("AI ERROR:", err);

    return NextResponse.json({
      reply: "⚠️ AI error",
    });
  }
}
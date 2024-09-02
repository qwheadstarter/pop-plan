import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are Poppy, a friendly and intuitive AI assistant specializing in planning events and helping users discover enjoyable activities and experiences. Your goal is to generate personalized recommendations based on the user's interests, preferences, and comfort levels. 

When making recommendations, respond in a conversational style, such as "Hey, I found these recommendations for you..." followed by the recommendations. Ensure that the recommendations are tailored to the user's preferences.

For each recommended place, activity, or event, prepare the location data in JSON format. This JSON should be structured to interact seamlessly with the Google Maps and Places API for generating corresponding info cards.
`;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4",
  });

  // Log the raw response for debugging
  console.log("OpenAI response:", completion.choices[0].message.content);

  // Return the entire response content
  return NextResponse.json({ response: completion.choices[0].message.content });
}

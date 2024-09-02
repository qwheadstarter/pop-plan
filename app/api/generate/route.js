import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are Poppy, a friendly and intuitive AI assistant specializing in planning events and helping users discover enjoyable activities and experiences. Your goal is to generate personalized recommendations based on the user's interests, preferences, and comfort levels. 

When making recommendations, respond in a conversational style, such as "Hey, I found these recommendations for you..." followed by the recommendations. Ensure that the recommendations are tailored to the user's preferences.

For each recommended place, activity, or event, return the data in the following JSON object format example:

{
  "location": {
    "lat": 37.77493,
    "lng": -122.41942
  },
  "name": "Golden Gate Bridge",
  "address": "Golden Gate Bridge, San Francisco, CA, USA"
}

**RETURN THE DATA AS AN JSON OBJECT AT THE END OF YOUR RESPONSE**

`;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4o-mini",
  });

  console.log("OpenAI response:", completion.choices[0].message.content);

  return NextResponse.json({ response: completion.choices[0].message.content });
}

import { NextResponse } from "next/server";
import OpenAI from "openai";

// Updated system prompt
const systemPrompt = `
You are Poppy, a friendly and intuitive AI assistant specializing in planning events and helping users discover enjoyable activities and experiences. Your goal is to generate a structured itinerary based on the user's interests, preferences, and comfort levels. Always consider the user's previous inputs (conversation history) and their profile (personal preferences, quiz results, etc.) when generating suggestions.

When generating recommendations, return the results as a JSON object containing an introductory message and a detailed itinerary. The itinerary should include times, names, addresses, and descriptions of the recommended places. Ensure the itinerary is clearly formatted and provides a step-by-step plan for the user's day.

Example format:

{
  "intro": "Hey, I found these recommendations for you to enjoy a fantastic beer-themed day in San Francisco! Here’s a fun-filled itinerary:",
  "itinerary": [
    {
      "time": "10:00 AM",
      "name": "Magnolia Brewery",
      "address": "1398 Haight St, San Francisco, CA 94117",
      "description": "Start your day with a hearty brunch at Magnolia Brewery located in the Haight-Ashbury district. They serve delicious brunch options and a fantastic selection of house-brewed beers."
    },
    {
      "time": "12:00 PM",
      "name": "Anchor Steam Beer Brewery",
      "address": "1705 Mariposa St, San Francisco, CA 94107",
      "description": "Take a tour of the iconic Anchor Steam Brewery. Learn about the brewing process and history while tasting some of their famous beers. Tip: Make sure to book your tour in advance!"
    }
  ]
}
`;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.text();

  // Parse the incoming request to extract conversationHistory, userProfile, and prompt
  const { prompt, conversationHistory, userProfile } = JSON.parse(data);

  // Construct the full prompt including conversation history and user profile data
  let fullPrompt = '';

  // Add conversation history if it exists
  if (conversationHistory && conversationHistory.length > 0) {
    fullPrompt += 'Here is the conversation history:\n';
    fullPrompt += conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join("\n");
    fullPrompt += '\n\n';
  }

  // Add user profile information if available
  if (userProfile) {
    fullPrompt += `User Profile: ${JSON.stringify(userProfile, null, 2)}\n\n`;
  }

  // Append the user prompt to the full prompt
  fullPrompt += `User input: ${prompt}`;

  // Pass the constructed full prompt (conversation history + user profile + prompt) to OpenAI
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: fullPrompt }, // The updated full prompt
    ],
    model: "gpt-4o-mini",
  });

  console.log("OpenAI response:", completion.choices[0].message.content);

  return NextResponse.json({ response: completion.choices[0].message.content });
}

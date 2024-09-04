import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        address
      )}&key=${apiKey}&fields=formatted_address,name,rating,user_ratings_total,photos`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google API error response:", errorText);
      return NextResponse.json(
        {
          error: `Failed to fetch place details from Google API: ${errorText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.status !== "OK") {
      console.error(
        "Google API returned an error:",
        data.status,
        data.error_message
      );
      return NextResponse.json(
        { error: `Google API error: ${data.status}` },
        { status: 400 }
      );
    }

    return NextResponse.json(data.results[0]);
  } catch (error) {
    console.error("Server error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

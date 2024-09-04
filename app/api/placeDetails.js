export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&key=${apiKey}&fields=place_Id
`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google API error response:", errorText);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch place details from Google API" });
    }

    const data = await response.json();

    if (data.status !== "OK") {
      console.error(
        "Google API returned an error:",
        data.status,
        data.error_message
      );
      return res
        .status(400)
        .json({ error: `Google API error: ${data.status}` });
    }

    res.status(200).json(data.results[0]);
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

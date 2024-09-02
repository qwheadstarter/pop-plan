import React from "react";
import axios from "axios";

const fetchPlaces = async (query) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/textsearch/json`,
    {
      params: { query: query },
      key: API_KEY,
    }
  );

  return response.data.results;
};

export default fetchPlaces;

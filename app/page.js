"use client";

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import Pricing from "./components/Pricing";
import FeaturedItineraries from "./components/FeaturedItineraries";
import { useState } from "react";

export default function Home() {
  const [currentPrompt, setCurrentPrompt] = useState("");

  return (
    <>
      <Navigation />
      <Hero />
      <FeaturedItineraries onPromptChange={setCurrentPrompt} />
      <Pricing />
      <Footer />
    </>
  );
}

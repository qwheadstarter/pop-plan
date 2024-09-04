import FeaturedDestinations from "./components/FeaturedDestinations";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navigation from "./components/Navigation";
import Pricing from "./components/Pricing";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <FeaturedDestinations />
      <Pricing />
      <Footer />
    </>
  );
}

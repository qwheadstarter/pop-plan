import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navigation from "./components/Navigation";
import PreviewCard from "./components/PreviewCard";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <section id="how">
        <HowItWorks />
      </section>

      <PreviewCard />
    </>
  );
}

"use client";
import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const ContactPage = () => {
  useEffect(() => {
    // Load the Tally widget script asynchronously
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        margin: 0,
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Navigation />
      <iframe
        src="https://tally.so/r/mKD1gK?transparentBackground=2"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Pop-Plan Contact Form"
        style={{
          position: "relative",
          zIndex: 1,
          border: 0,
        }}
      ></iframe>
      <div
        style={{ position: "absolute", bottom: 0, width: "100%", zIndex: 2 }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;

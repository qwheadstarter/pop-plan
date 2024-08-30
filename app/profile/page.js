"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Header from "@/components/header";
import Footer from "@/components/footer"

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    async function getQuizResults() {
      if (!user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), "Quiz Results");
      const docSnap = await getDocs(colRef);

      const quizResults = [];
      docSnap.forEach((doc) => {
        quizResults.push({ id: doc.id, ...doc.data() });
      });
      setQuizResults(quizResults);
    }
    getQuizResults();
    console.log("Quiz Results={quizResults}")
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <div className='container'>
      <Header/ >
      <h3>Quiz Results</h3>
      <div className='quiz-results'>
        {quizResults.map((result, idx) => (
        <p key={idx}>
            {idx+1}. {result.question} <span>{result.answer}</span>
        </p>
        ))}
      </div>
      <Footer/ >
    </div>
  );
}

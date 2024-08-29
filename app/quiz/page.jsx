/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useState } from 'react';
import { db } from "@/firebase";
import { getDoc, doc, collection, writeBatch } from "firebase/firestore";
import { quiz } from '/data.js';
import { useUser } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";

const page = () => {
    const { user } = useUser();
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [answersGiven, setAnswersGiven] = useState([]);

    const { questions } = quiz;
    const { question, answers } = questions[activeQuestion];

    // Record the selected answer
    const onAnswerSelected = (answer, idx) => {
        setSelectedAnswerIndex(idx);
        setAnswersGiven((prev) => [...prev, answer]);
    };

    // Increment to next question
    const nextQuestion = () => {
        setSelectedAnswerIndex(null);
        if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
        } else {
        setActiveQuestion(0);
        setShowResult(true);
        }
    };

    // Save quiz results to database
    const saveResults = async () => {
        const name = "Quiz Results"
        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, "users"), user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const collections = docSnap.data().quizResults || [];
          if (collections.find((f) => f.name === name)) {
            alert("Collection with the same name already exists.");
            return
          }
          collections.push({ name });
          batch.set(userDocRef, { quizResults: collections }, { merge: true });
        } else {
          batch.set(userDocRef, { quizResults: [{ name }] });
        }

        const colRef = collection(userDocRef, name);
        answersGiven.forEach((answerGiven, idx) => {
          const answerDocRef = doc(colRef);
          batch.set(answerDocRef, {"question": questions[idx].question, "answer": answerGiven});
        });

        await batch.commit();
        alert("Saved successfully");
    };

    return (
        <div className='container'>
        <Header/ >
        <h1>Quiz Page</h1>
        <div>
            <h2>
            Question: {activeQuestion + 1}
            <span>/{questions.length}</span>
            </h2>
        </div>
        <div>
            {!showResult ? (
            <div className='quiz-container'>
                <h3>{questions[activeQuestion].question}</h3>
                {answers.map((answer, idx) => (
                <li
                    key={idx}
                    onClick={() => onAnswerSelected(answer, idx)}
                    className={
                    selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'
                    }
                >
                    <span>{answer}</span>
                </li>
                ))}
                <button
                onClick={nextQuestion}
                className={selectedAnswerIndex !== null ? 'btn' : 'btn-disabled'}
                disabled={selectedAnswerIndex === null}
                >
                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
            ) : (
            <div className='quiz-container'>
                <h3>Your Answers</h3>
                {answersGiven.map((answer, idx) => (
                <p key={idx}>
                    Question {idx + 1}: <span>{answer}</span>
                </p>
                ))}
                <button onClick={saveResults}>Save</button>
                <button onClick={() => window.location.reload()}>Restart</button>
            </div>
            )}
        </div>
        <Footer/ >
        </div>
    );
};

export default page;
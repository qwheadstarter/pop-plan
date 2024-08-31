/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { db } from "../firebase"; // Make sure to have firebase configured
import {
  deleteDoc,
  getDoc,
  getDocs,
  doc,
  collection,
  writeBatch,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook for user management
import { quiz } from "/data.js";
// import Header from "@/components/header";
// import Footer from "@/components/footer";

const Page = () => {
  const { user } = useUser(); // Get the currently logged-in user
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState([]);
  const [userInput, setUserInput] = useState(""); // To store user input
  const [showInputField, setShowInputField] = useState(false); // To show/hide input field for "yes"
  const [showResult, setShowResult] = useState(false);
  const [answersGiven, setAnswersGiven] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]); // To store user-provided answers

  const { questions } = quiz;
  const { question, answers } = questions[activeQuestion];

  // Handle user input
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Add user input to the list of answers
  const addUserAnswer = () => {
    if (userInput.trim()) {
      setUserAnswers((prev) => [...prev, userInput.trim()]);
      setUserInput(""); // Clear input field
    }
  };

  // Remove a user-provided answer
  const removeUserAnswer = (idx) => {
    setUserAnswers((prev) => prev.filter((_, i) => i !== idx));
  };

  // Toggle selection of an answer
  const onAnswerSelected = (idx) => {
    if (questions[activeQuestion].id === 6) {
      if (answers[idx].toLowerCase() === "no") {
        setSelectedAnswerIndices([idx]);
        setShowInputField(false); // Hide the input field if "no" is selected
        setUserAnswers([]); // Clear any previously entered input
      } else if (answers[idx].toLowerCase() === "yes") {
        setSelectedAnswerIndices([idx]);
        setShowInputField(true); // Show the input field if "yes" is selected
      }
    } else if (answers[idx].toLowerCase() === "none of the above") {
      setSelectedAnswerIndices([idx]);
    } else {
      // Otherwise, toggle the selected answer
      setSelectedAnswerIndices((prev) =>
        prev.includes(idx)
          ? prev.filter((i) => i !== idx)
          : [
              ...prev.filter(
                (i) => answers[i].toLowerCase() !== "none of the above"
              ),
              idx,
            ]
      );
    }
  };

  // Go to the previous question
  const prevQuestion = () => {
    setActiveQuestion((prev) => prev - 1);
    setSelectedAnswerIndices([]);
    setUserAnswers([]);
    setShowInputField(false); // Reset input field visibility
    setAnswersGiven((prev) => prev.slice(0, -1));
  };

  // Increment to next question
  const nextQuestion = () => {
    if (
      (answers[0] === "" && questions[activeQuestion].id !== 6) ||
      (questions[activeQuestion].id === 6 && showInputField)
    ) {
      // Handle user input questions or when "yes" is selected for question id 6
      setAnswersGiven((prev) => [...prev, userAnswers]);
    } else {
      setAnswersGiven((prev) => [
        ...prev,
        selectedAnswerIndices.map((idx) => answers[idx]),
      ]);
    }
    setSelectedAnswerIndices([]);
    setUserAnswers([]);
    setShowInputField(false); // Reset input field visibility
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  // Save quiz results to database
  const saveResults = async () => {
    const name = "Quiz Results";
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().quizResults || [];
      if (!collections.find((f) => f.name === name)) {
        collections.push({ name });
        batch.set(userDocRef, { quizResults: collections }, { merge: false });
      }
    } else {
      batch.set(userDocRef, { quizResults: [{ name }] });
    }

    const colRef = collection(userDocRef, name);

    // clear previous quizResults
    const docList = await getDocs(colRef);
    docList.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    answersGiven.forEach((answerGiven, idx) => {
      const answerDocRef = doc(colRef);
      batch.set(answerDocRef, {
        category: questions[idx].category,
        question: questions[idx].question,
        answer: answerGiven,
      });
    });

    await batch.commit();
    alert("Saved successfully");
  };

  return (
    <div className="container">
      <h1>Quiz Page</h1>
      <div>
        <h2>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <h3>{question}</h3>
            {questions[activeQuestion].id === 6 ? (
              <>
                <ul>
                  {answers.map((answer, idx) => (
                    <li
                      key={idx}
                      onClick={() => onAnswerSelected(idx)}
                      className={
                        selectedAnswerIndices.includes(idx)
                          ? "li-selected"
                          : "li-hover"
                      }
                    >
                      <span>{answer}</span>
                      {selectedAnswerIndices.includes(idx) && (
                        <span className="checkmark">✔</span>
                      )}
                    </li>
                  ))}
                </ul>
                {showInputField && (
                  <>
                    <ul className="user-answers-list">
                      {userAnswers.map((answer, idx) => (
                        <li
                          key={idx}
                          className="user-answer"
                          onClick={() => removeUserAnswer(idx)}
                        >
                          <span>{answer}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="input-group">
                      <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Type your answer"
                        className="input-field"
                      />
                      <button onClick={addUserAnswer} className="btn add-btn">
                        Add
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {(answers[0] === "" && questions[activeQuestion].id !== 6) ||
                showInputField ? (
                  <>
                    <ul className="user-answers-list">
                      {userAnswers.map((answer, idx) => (
                        <li
                          key={idx}
                          className="user-answer"
                          onClick={() => removeUserAnswer(idx)}
                        >
                          <span>{answer}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="input-group">
                      <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Type your answer"
                        className="input-field"
                      />
                      <button onClick={addUserAnswer} className="btn add-btn">
                        Add
                      </button>
                    </div>
                  </>
                ) : (
                  <ul>
                    {answers.map((answer, idx) => (
                      <li
                        key={idx}
                        onClick={() => onAnswerSelected(idx)}
                        className={
                          selectedAnswerIndices.includes(idx)
                            ? "li-selected"
                            : "li-hover"
                        }
                      >
                        <span>{answer}</span>
                        {selectedAnswerIndices.includes(idx) && (
                          <span className="checkmark">✔</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
            <div className="button-group">
              {activeQuestion > 0 && (
                <button onClick={prevQuestion} className="btn back-btn">
                  Back
                </button>
              )}
              <button
                onClick={nextQuestion}
                className={`btn next-btn ${
                  selectedAnswerIndices.length > 0 || userAnswers.length > 0
                    ? ""
                    : "btn-disabled"
                }`}
                disabled={
                  selectedAnswerIndices.length === 0 && userAnswers.length === 0
                }
              >
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <div className="quiz-container">
            <h3>Your Answers</h3>
            {answersGiven.map((answers, idx) => (
              <div key={idx}>
                <p>Question {idx + 1}:</p>
                <ul>
                  {answers.map((answer, answerIdx) => (
                    <li key={answerIdx}>{answer}</li>
                  ))}
                </ul>
              </div>
            ))}
            <button onClick={saveResults}>Save Results</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

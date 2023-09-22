"use client";
import React, { useState, useEffect } from "react";
import { StartPage, Report, OverviewPanel, Quiz } from "@/components/index";
import { fetchQuestions } from "@/utils/helper";

const API_URL = "https://opentdb.com/api.php?amount=15";

const IndexPage = () => {
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchQuestions(API_URL);
      setQuestions(data);
    };
    getData();
  }, []);

  const handleCurrentQuestion = (newQuestionIndex) => {
    setCurrentQuestion(newQuestionIndex);
  };

  const startQuiz = (userEmail) => {
    setEmail(userEmail);
    setQuizStarted(true);
  };
  const handleUserAnswers = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = answer;
    console.log(userAnswers);
    setUserAnswers(updatedAnswers);
  };

  const endQuiz = (answers, timeLeft) => {
    handleUserAnswers(answers);
    setQuizEnded(true);
    setTimeLeft(timeLeft);
  };

  return (
    <div className="container mx-auto py-8">
      {!quizStarted && !quizEnded && <StartPage startQuiz={startQuiz} />}
      {quizStarted && !quizEnded && (
        <div className="flex">
          <div className="w-2/3 pr-4">
            <Quiz
              questions={questions}
              onQuizEnd={endQuiz}
              currentQuestion={currentQuestion}
              setCurrentQuestion={handleCurrentQuestion}
              userAnswers={userAnswers}
              setUserAnswers={handleUserAnswers}
            />
          </div>
          <div className="w-1/3">
            <OverviewPanel
              questions={questions}
              userAnswers={userAnswers}
              currentQuestion={currentQuestion}
              handleCurrentQuestion={handleCurrentQuestion}
            />
          </div>
        </div>
      )}
      {quizEnded && (
        <Report
          questions={questions}
          userName={email}
          userAnswers={userAnswers}
          timeTaken={timeLeft}
        />
      )}
    </div>
  );
};

export default IndexPage;

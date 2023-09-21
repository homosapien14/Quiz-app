"use client";
import React, { useState, useEffect } from "react";
import StartPage from "@/components/startPage";
import Quiz from "@/components/quiz";
import OverviewPanel from "@/components/overviewPanel";
import Report from "@/components/report";

const API_URL = "https://opentdb.com/api.php?amount=15";

const IndexPage = () => {
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft,setTimeLeft] = useState(1800);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const formattedQuestions = data.results.map((q) => {
        return {
          question: q.question,
          choices: [...q.incorrect_answers, q.correct_answer],
          correct_answer: q.correct_answer,
        };
      });
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
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

  const endQuiz = (answers,timeLeft) => {
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

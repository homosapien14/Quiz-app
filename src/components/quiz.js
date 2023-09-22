import React, { useState, useEffect } from "react";
import { displayTime } from "@/utils/helper";

export const Quiz = ({
  questions,
  onQuizEnd,
  currentQuestion,
  setCurrentQuestion,
  userAnswers,
  setUserAnswers,
}) => {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [currentAnswer, setCurrentAnswer] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
        onQuizEnd(userAnswers);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, userAnswers, onQuizEnd]);

  const handleAnswerSelect = (answer) => {
    console.log(currentAnswer);
    setCurrentAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswers(currentAnswer);
      setCurrentAnswer(null);
    }
  };

  const handleClearResponse = () => {
    setCurrentAnswer(null);
  };
  const handleQuizEnd = () => {
    onQuizEnd(currentAnswer, 1800 - timeLeft);
  };

  return (
    <div className="w-full max-w-md border-2 rounded-md p-5 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Question {currentQuestion + 1} of {questions?.length}
        </h2>
        <div className="text-red-500">{displayTime(timeLeft)} left</div>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-lg text-black font-semibold mb-4">
          {questions[currentQuestion].question}
        </h3>
        {questions[currentQuestion].choices.map((choice, index) => (
          <div key={index} className="mb-2">
            <label className="block text-gray-700">
              <input
                type="radio"
                className="mr-2"
                value={choice}
                checked={
                  currentAnswer === choice ||
                  userAnswers[currentQuestion] == choice
                }
                onChange={() => handleAnswerSelect(choice)}
              />
              {choice}
            </label>
          </div>
        ))}
        <div className="mt-4 flex justify-between">
          {currentQuestion < questions.length - 1 ? (
            <div className="w-full flex justify-between mt-4 ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  handleNextQuestion();
                }}
              >
                Save & Next
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleClearResponse()}
              >
                Clear Response
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleQuizEnd()}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

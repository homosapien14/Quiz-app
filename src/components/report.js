import { displayTime ,checkAnswers} from "@/utils/helper";
import React, { useState, useEffect } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaCalendar,
} from "react-icons/fa";
const API_URL = 'https://opentdb.com/api.php?amount=15';

export const Report = ({  userAnswers, userName, timeTaken }) => {
  const [score, setScore] = useState(0);
  const [questionsWithAnswer, setQuestionsWithAnswer] = useState([]);
  const [scorePercentage, setScorePercentages] =useState('-');
  useEffect(() => {
    const checkScore = async()=>{
      const {score,questionsWithAnswers,scorePercentage} = await checkAnswers(API_URL,userAnswers);
      setScore(score);
      setQuestionsWithAnswer(questionsWithAnswers);
      setScorePercentages(scorePercentage);
    }
    checkScore();
  },[]);
  const check = (userAnswer,index)=>{
    if( userAnswer && userAnswer === questionsWithAnswer[index].correct_answer) {
      return 'bg-green-500';
    }
    else{
      return 'bg-red-500';
    }
  }
  console.log(questionsWithAnswer);
  const passOrFail = score > 7 ? "Pass" : "Fail";
  const thumbsIcon =
    score > 7 ? (
      <FaThumbsUp className="text-green-500 text-4xl" />
    ) : (
      <FaThumbsDown className="text-red-500 text-4xl" />
    );

  return (
    <div className="bg-white mx-16 text-black shadow-lg rounded-lg p-6 mb-4">
      <h1 className="text-3xl font-semibold mb-2">Quiz Results</h1>
      <hr/>
      <div className="flex justify-between items-center mb-5 mt-2 border-1.5 rounded-lg shadow-md p-4">
        <div className="flex items-center">
          <div className="rounded-full bg-blue-500 text-white p-3">
            <FaUser className="text-2xl" />
          </div>
          <span className="ml-3 text-lg font-semibold">{userName}</span>
        </div>
        
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-2xl" />
          <span className="ml-2 text-lg font-semibold">Quiz Score</span>
          <span className="ml-2 text-lg font-semibold">{score} / 15</span>
        </div>
        <div className="flex flex-col items-center">
          <FaClock className="text-blue-500 text-2xl" />
          <span className="ml-2 text-lg font-semibold">Time Taken</span>
          <span className="ml-2 text-lg font-semibold">{displayTime(timeTaken)}</span>
        </div>
        <div className="flex flex-col items-center">
          {thumbsIcon}
          <span className="ml-2 text-lg font-semibold">{passOrFail}</span>
        </div>
        
      </div>
      <div className="w-full mx-auto flex justify-around items-center">
          <div >
          <div className="rounded-full border-2 border-blue-500 text-blue-500 p-3 text-center">
            <span className="text-2xl">{scorePercentage}%</span>
          </div>
          <span className="ml-2 text-lg font-semibold ">Score Percentage</span>
          </div>
          <div>
          <div className="rounded-full border-2 border-blue-500 text-blue-500 p-3 text-center">
            <span className="text-2xl">60%</span>
          </div>
          <span className="ml-2 text-lg font-semibold">Average Percentage</span>
          </div>
        </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Questions</span>
          </div>
          {questionsWithAnswer.map((question, index) => (
            <details
              key={index}
              className="flex w-full border-2 shadow rounder-lg p-4 mx-auto justify-around mb-2"
            >
              
                <summary className="w-1/2 cursor-pointer">
                  <span>Question {index+1}</span>
                </summary>
                <div className="border-2 shadow rounded p-4">
                  <div className="mb-2 font-semibold">Q: {question.question}</div>
                  <div className="mb-2">
                    <span className="text-gray-600 font-semibold">
                      User Answer:
                    </span>
                    <span className={ `ml-2 ${check(userAnswers[index],index)} p-2 rounded-xl text-white`}>
                      {userAnswers[index] || "Not Answered"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-semibold">
                      Correct Answer:
                    </span>
                    <span className="ml-2">{question.correct_answer}</span>
                  </div>
                </div>
              
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};



'use client';
import React, { useState } from "react";

export const StartPage = ({ startQuiz }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    startQuiz(email);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-white font-semibold  my-5 text-xl text-center">Welcome to the Quiz </h2>
      <h3  className="text-white font-semibold mb-8  text-lg text-center ">All the best!</h3>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );
};


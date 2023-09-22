export const displayTime = (timeLeft) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} `;
};

export const fetchQuestions = async (API_URL) => {
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
    return formattedQuestions;
    
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};
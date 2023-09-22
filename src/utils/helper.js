export const displayTime = (timeLeft) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} `;
};

export const fetchQuestions = async (API_URL) => {
  try {
    const data = {
      API_URL: API_URL
    }
    const response = await fetch('https://quiz-app-45o7.onrender.com/getQuestions', {
      method: "POST",  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });
    const questions = await response.json();
    return questions;
    
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

export const checkAnswers = async (API_URL,userAnswers)=>{
  try {
    const data = {
      API_URL:API_URL,
      userAnswers:userAnswers
    }
    const response = await fetch('https://quiz-app-45o7.onrender.com/checkAnswers', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });
    const result = await response.json();
    console.log(result);
    return result;
    
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

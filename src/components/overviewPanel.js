const OverviewPanel = ({
  questions,
  userAnswers,
  currentQuestion,
  handleCurrentQuestion,
}) => {
  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Questions:</h1>
      <div className="bg-white border-2 w-80 shadow-lg rounded p-4 grid grid-cols-4 gap-2">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-full h-8 w-8 flex items-center justify-center ${
              (userAnswers[index])
                ? "bg-green-500 text-white"
                : userAnswers[index]===null
                ? "bg-red-500 text-white"
                : currentQuestion === index
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
            onClick={() => handleCurrentQuestion(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className='flex mt-3'>

      <div className="rounded-full h-8 w-8 flex items-center justify-center bg-green-500 text-white"></div>
      <h4 className="ml-1">Answered</h4>
      </div>
      <div className='flex mt-3'>

      <div className="rounded-full h-8 w-8 flex items-center justify-center bg-red-500 text-white"></div>
      <h4 className="ml-1"> Not Answered</h4>
      </div>
    </div>
  );
};

export default OverviewPanel;

import React, { useState, useEffect } from "react";
import questions from "./Quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRedo, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function StartScreen({ onStartClick, highScore }) {
  useEffect(() => {
    document.title = `IKKEA | QuizGame`;
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black sm:w-auto ">
      <div className="bg-black rounded-3xl border-8 border-gray-300 p-3 ">
        <div className="bg-white rounded shadow-lg p-8 w-96 text-center">
          <h1 className="text-3xl font-bold mb-4  bg-black hover:z-10 hover:scale-105 text-white justify-center items-center p-4 rounded-full border-b-8 border-gray-300">
            Quiz Game
          </h1>
          <p className="text-lg mb-4">
            Tes pengetahuan Anda tentang Indonesia.
          </p>
          <p className="text-lg mb-8">Skor Tertinggi: {highScore}</p>
          <button
            onClick={onStartClick}
            className=" animate-pulse  hover:bg-gray-700 focus:outline-none hover:scale-105 hover:z-50 bg-black text-white p-4 rounded-full border-b-8 border-gray-300 shadow-2xl"
          >
            <FontAwesomeIcon icon={faPlay} /> Play
          </button>
          <p className="text-gray-500 text-sm absolute top-4 left-4">
            <Link to="/game" className="flex items-center ">
              {" "}
              <FontAwesomeIcon
                icon={faArrowLeft}
                size="1x"
                className="mr-2 text-white bg-gray-600 rounded-full p-2 hover:scale-110 hover:z-10 drop-shadow-2xl shadow-2xl"
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") || 0
  );
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    document.title = `IKKEA | PlayGame`;
  });


  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);

      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score.toString());
      }
    }
  };

  const handleBackButtonClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handlePlayAgain = () => {
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setGameStarted(false);
  };

  useEffect(() => {
    const savedHighScore = localStorage.getItem("highScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {gameStarted ? (
        <div className="min-h-screen flex items-center justify-center bg-black  sm:w-auto ">
          <div className="bg-black p-3 rounded-3xl border-8 border-gray-300 ">
            <div className="bg-white rounded-lg shadow-lg p-12 w-96 drop-shadow-2xl">
              {showScore ? (
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Skor Anda</h2>
                  <p className="text-2xl font-semibold mb-4">{score}</p>
                  <p className="text-lg">Skor Tertinggi: {highScore} </p>
                  <button
                    onClick={handlePlayAgain}
                    className=" hover:bg-gray-700 focus:outline-none hover:scale-105 hover:z-50 bg-black text-white p-4 rounded-full border-b-8 border-gray-300 shadow-2xl mt-4 animate-pulse"
                  >
                    <FontAwesomeIcon icon={faRedo} /> Main Lagi
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Pertanyaan {currentQuestion + 1}
                  </h2>
                  <p className="text-xl mb-8">
                    {questions[currentQuestion].questionText}
                  </p>
                  <div className="grid grid-cols-2 gap-4 ">
                    {questions[currentQuestion].answerOptions.map(
                      (option, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleAnswerOptionClick(option.isCorrect)
                          }
                          className="bg-black text-white rounded hover:bg-gray-700 focus:outline-none hover:scale-105 hover:z-50 bg-black text-white p-4 rounded-full border-b-8 border-gray-300 shadow-2xl"
                        >
                          {option.answerText}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <StartScreen onStartClick={startGame} highScore={highScore} />
      )}
      <p className="text-gray-500 text-sm absolute top-4 left-4">
        <Link to="/game" className="flex items-center ">
          {" "}
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="1x"
            className="mr-2 text-white bg-gray-600 rounded-full p-2 hover:scale-110 hover:z-10 drop-shadow-2xl shadow-2xl"
          />
        </Link>
      </p>
    </div>
  );
}

export default QuizApp;

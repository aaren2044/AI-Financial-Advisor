import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Quiz as QuizType } from '../types';

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number) => void;
}

export default function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
      }, 0);
      onComplete(score);
      setShowResults(true);
    }
  };

  const question = quiz.questions[currentQuestion];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
      {!showResults ? (
        <>
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
            <h3 className="text-xl font-bold text-white">{question.text}</h3>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 text-left rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h3>
          <div className="flex items-center justify-center space-x-2 text-lg text-white">
            <span>Score: {answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length}</span>
            <span>/</span>
            <span>{quiz.questions.length}</span>
          </div>
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center mt-4 text-white">
              {answer === quiz.questions[index].correctAnswer ? (
                <CheckCircle className="text-green-500 mr-2" />
              ) : (
                <XCircle className="text-red-500 mr-2" />
              )}
              Question {index + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
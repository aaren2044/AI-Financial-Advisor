import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Quiz as QuizType } from '../types';

interface Props {
  quiz: QuizType;
  onComplete: (score: number) => void;
}

export default function Quiz({ quiz, onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
      }, 0);
      setShowResults(true);
      onComplete(score);
    }
  };

  const question = quiz.questions[currentQuestion];

  if (showResults) {
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);

    return (
      <div className="module-card p-6 rounded-xl">
        <h3 className="text-2xl font-bold text-white mb-4">Quiz Results</h3>
        <p className="text-xl text-gray-300 mb-4">
          You scored {score} out of {quiz.questions.length}!
        </p>
        {quiz.questions.map((q, index) => (
          <div key={q.id} className="mb-4">
            <p className="text-white mb-2">{q.text}</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Your answer: </span>
              {answers[index] === q.correctAnswer ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="module-card p-6 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-4">
        Question {currentQuestion + 1} of {quiz.questions.length}
      </h3>
      <p className="text-lg text-gray-300 mb-6">{question.text}</p>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="btn-primary w-full p-4 text-white rounded-lg"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
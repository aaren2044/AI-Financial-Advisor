import React, { useState } from 'react';

interface QuizProps {
  moduleIndex: number;
  onComplete: () => void;
}

export default function Quiz({ moduleIndex, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const quizzes = [
    // Module 1: Digital Marketing Fundamentals
    {
      questions: [
        {
          question: "What is digital marketing?",
          options: [
            "Marketing only on social media",
            "Promoting products through digital channels",
            "Email marketing only",
            "Traditional advertising"
          ],
          correct: 1
        },
        {
          question: "Which is NOT a digital marketing channel?",
          options: [
            "Social Media",
            "Billboard advertising",
            "Email Marketing",
            "Search Engine Optimization"
          ],
          correct: 1
        },
        // Add more questions here...
      ]
    },
    // Module 2: Social Media Marketing
    {
      questions: [
        {
          question: "What is engagement rate?",
          options: [
            "Number of followers",
            "Interaction with content relative to followers",
            "Number of posts",
            "Amount spent on advertising"
          ],
          correct: 1
        },
        {
          question: "Which metric is most important for brand awareness?",
          options: [
            "Sales",
            "Reach",
            "Comments",
            "Direct messages"
          ],
          correct: 1
        },
        // Add more questions here...
      ]
    },
    // Add more modules...
  ];

  const handleAnswer = (selectedOption: number) => {
    const correct = selectedOption === quizzes[moduleIndex].questions[currentQuestion].correct;
    if (correct) setScore(score + 1);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizzes[moduleIndex].questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {showScore ? (
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Quiz Complete!</h2>
          <p className="text-xl">
            You scored {score} out of {quizzes[moduleIndex].questions.length}
          </p>
          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300"
          >
            Return to Module
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-8">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1}/{quizzes[moduleIndex].questions.length}
            </span>
            <span className="text-sm text-gray-400">
              Score: {score}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-6">
            {quizzes[moduleIndex].questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-4">
            {quizzes[moduleIndex].questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 text-left rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
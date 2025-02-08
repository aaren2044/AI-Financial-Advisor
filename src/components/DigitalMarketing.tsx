import React, { useState } from 'react';
import { BookOpen, Youtube, BrainCircuit, MessageSquareText } from 'lucide-react';
import ModuleContent from './ModuleContent';
import Quiz from './QuizD';
import AiAssistant from './AIAssistantD';

export default function DigitalMarketing() {
  const [activeModule, setActiveModule] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAi, setShowAi] = useState(false);

  const modules = [
    {
      title: "Digital Marketing Fundamentals",
      description: "Learn the core concepts of digital marketing",
      videoUrl: "https://www.youtube.com/embed/bixR-KIJKYM",
    },
    {
      title: "Social Media Marketing",
      description: "Master social media platforms and strategies",
      videoUrl: "https://www.youtube.com/embed/q8PpU2Ey0To",
    },
    {
      title: "SEO & Content Marketing",
      description: "Optimize your content for search engines",
      videoUrl: "https://www.youtube.com/embed/DvwS7cV9GmQ",
    },
    {
      title: "Analytics & Measurement",
      description: "Track and analyze marketing performance",
      videoUrl: "https://www.youtube.com/embed/uWzNDUnnJPk",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Digital Marketing Mastery
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {modules.map((module, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                activeModule === index
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              onClick={() => {
                setActiveModule(index);
                setShowQuiz(false);
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                {index === 0 && <BookOpen className="w-6 h-6" />}
                {index === 1 && <Youtube className="w-6 h-6" />}
                {index === 2 && <BrainCircuit className="w-6 h-6" />}
                {index === 3 && <MessageSquareText className="w-6 h-6" />}
                <h3 className="text-xl font-semibold">{module.title}</h3>
              </div>
              <p className="text-gray-300">{module.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          {!showQuiz && !showAi && (
            <ModuleContent module={modules[activeModule]} />
          )}
          {showQuiz && (
            <Quiz moduleIndex={activeModule} onComplete={() => setShowQuiz(false)} />
          )}
          {showAi && (
            <AiAssistant />
          )}
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => {
              setShowQuiz(true);
              setShowAi(false);
            }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Take Quiz
          </button>
          <button
            onClick={() => {
              setShowAi(true);
              setShowQuiz(false);
            }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
}
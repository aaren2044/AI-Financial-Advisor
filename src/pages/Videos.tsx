import React, { useState } from 'react';
import { GraduationCap, Brain } from 'lucide-react';
import { Module } from '../types';
import { modules } from '../data/modulesB';
import ModuleCard from '../components/ModuleCardB';
import Quiz from '../components/QuizB';
import AIAssistant from '../components/AIAssistantB';

function Videos() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const handleModuleComplete = (score: number) => {
    // Handle module completion (could save progress, show certificates, etc.)
    console.log(`Module completed with score: ${score}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Financial Literacy Program</h1>
          <p className="text-xl text-gray-300">Master your financial future with our comprehensive modules</p>
        </header>

        {!selectedModule && !showAI && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} onSelect={setSelectedModule} />
            ))}
          </div>
        )}

        {selectedModule && !showQuiz && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">{selectedModule.title}</h2>
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <iframe
                  src={selectedModule.videoUrl}
                  className="w-full h-[400px] rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <button
                onClick={() => setShowQuiz(true)}
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                <GraduationCap size={20} className="mr-2" />
                Take Quiz
              </button>
            </div>
          </div>
        )}

        {showQuiz && selectedModule && (
          <Quiz quiz={selectedModule.quiz} onComplete={handleModuleComplete} />
        )}

        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => {
              setShowAI(!showAI);
              setSelectedModule(null);
              setShowQuiz(false);
            }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <Brain size={20} className="mr-2" />
            AI Assistant
          </button>
        </div>

        {showAI && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl">
              <button
                onClick={() => setShowAI(false)}
                className="absolute top-2 right-2 text-white hover:text-gray-300"
              >
                ×
              </button>
              <AIAssistant />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Videos;
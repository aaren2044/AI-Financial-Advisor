import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { GraduationCap, Brain } from 'lucide-react';
import { modules } from '../data/modulesI';
import { Module } from '../types';
import ModuleCard from '../components/ModuleCardsI';
import Quiz from '../components/QuizI';
import AIAssistant from '../components/AIAssistantI';

function Investment() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
    setShowQuiz(false);
    setQuizCompleted(false);
  };

  const handleVideoEnd = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Investment Basics</h1>
          </div>
          <p className="text-xl text-gray-300">Master the fundamentals of investing with our comprehensive modules</p>
        </header>

        {!selectedModule ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onSelect={handleModuleSelect}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <button
              onClick={() => setSelectedModule(null)}
              className="text-purple-300 hover:text-purple-200 transition-colors"
            >
              ← Back to Modules
            </button>

            <div className="module-card p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4">{selectedModule.title}</h2>
              {!showQuiz && (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <ReactPlayer
                    url={selectedModule.videoUrl}
                    width="100%"
                    height="100%"
                    controls
                    onEnded={handleVideoEnd}
                  />
                </div>
              )}
            </div>

            {showQuiz && !quizCompleted && (
              <Quiz quiz={selectedModule.quiz} onComplete={handleQuizComplete} />
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => setShowAI(!showAI)}
        className="ai-button"
        title="AI Assistant"
      >
        <Brain className="w-6 h-6 text-white" />
      </button>

      {showAI && <AIAssistant />}
    </div>
  );
}

export default Investment;
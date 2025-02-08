import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Check, Lock } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: 'Understanding Money Basics',
    description: 'Learn about currency, banking, and basic financial terms',
    duration: '30 mins',
    completed: false
  },
  {
    id: 2,
    title: 'Budgeting Fundamentals',
    description: 'Create and manage your personal budget',
    duration: '45 mins',
    completed: false
  },
  {
    id: 3,
    title: 'Savings and Banking',
    description: 'Different types of savings accounts and banking services',
    duration: '40 mins',
    completed: false
  },
  {
    id: 4,
    title: 'Understanding Credit',
    description: 'Learn about loans, interest rates, and credit management',
    duration: '35 mins',
    completed: false
  },
  {
    id: 5,
    title: 'Basic Investment Concepts',
    description: 'Introduction to different investment options',
    duration: '50 mins',
    completed: false
  }
];

const BasicFinancialLiteracy = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Basic Financial Literacy</h2>
      
      <div className="space-y-4">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <BookOpen className="text-purple-400" size={24} />
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                </div>
                <p className="text-gray-400 mt-2">{module.description}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <span className="text-sm text-gray-400">
                    Duration: {module.duration}
                  </span>
                  {module.completed ? (
                    <span className="flex items-center text-green-400 text-sm">
                      <Check size={16} className="mr-1" />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-400 text-sm">
                      <Lock size={16} className="mr-1" />
                      Not Started
                    </span>
                  )}
                </div>
              </div>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Module
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BasicFinancialLiteracy;
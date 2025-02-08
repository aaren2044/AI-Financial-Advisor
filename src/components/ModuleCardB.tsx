import React from 'react';
import { Play, BookOpen } from 'lucide-react';
import { Module } from '../types';

interface ModuleCardProps {
  module: Module;
  onSelect: (module: Module) => void;
}

export default function ModuleCard({ module, onSelect }: ModuleCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl leading-none flex flex-col h-full">
        <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{module.description}</p>
        <button
          onClick={() => onSelect(module)}
          className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 group"
        >
          <Play size={16} className="mr-2" />
          Start Learning
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { Play } from 'lucide-react';
import { Module } from '../types';

interface Props {
  module: Module;
  onSelect: (module: Module) => void;
}

export default function ModuleCard({ module, onSelect }: Props) {
  return (
    <div className="module-card rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
      <p className="text-gray-300 mb-4">{module.description}</p>
      <button
        onClick={() => onSelect(module)}
        className="btn-primary w-full py-3 px-6 text-white rounded-lg flex items-center justify-center gap-2"
      >
        <Play className="w-5 h-5" />
        <span>Start Learning</span>
      </button>
    </div>
  );
}
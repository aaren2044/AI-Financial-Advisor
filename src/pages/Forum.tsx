import React from 'react';
import { Toaster } from 'react-hot-toast';
import { MentorList } from '../components/MentorList';
import { Forums } from '../components/Forums';
import { Events } from '../components/Events';
import { AIAssistant } from '../components/AIAssistantF';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Toaster position="top-right" />
      
      <h1 className="text-4xl font-bold mb-12">Community & Mentorship</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <MentorList />
        <Forums />
      </div>
      
      <div className="mb-12">
        <Events />
      </div>
      
      <div className="max-w-3xl mx-auto">
        <AIAssistant />
      </div>
    </div>
  );
}

export default App;
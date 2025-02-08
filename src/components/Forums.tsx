import React from 'react';
import { MessageSquare, Activity } from 'lucide-react';
import { ForumTopic } from '../typesf';

const forumTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'Starting a Home Business',
    replies: 24,
    isActive: true
  },
  {
    id: '2',
    title: 'Saving Tips & Tricks',
    replies: 18,
    isActive: true
  },
  {
    id: '3',
    title: 'Government Schemes',
    replies: 32,
    isActive: true
  }
];

export const Forums: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="text-purple-400" />
          Community Forums
        </h2>
      </div>
      
      <div className="grid gap-4">
        {forumTopics.map((topic) => (
          <div 
            key={topic.id} 
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 p-6 rounded-lg border border-purple-500/20 transform transition-all hover:scale-[1.01] cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
              <div className="flex items-center gap-2">
                <MessageSquare className="text-purple-400 h-4 w-4" />
                <span className="text-purple-300">{topic.replies} replies</span>
              </div>
            </div>
            {topic.isActive && (
              <div className="flex items-center gap-2 mt-2">
                <Activity className="text-green-400 h-4 w-4 animate-pulse" />
                <span className="text-green-400 text-sm">Active Now</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
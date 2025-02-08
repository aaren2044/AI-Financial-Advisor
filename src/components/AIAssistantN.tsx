import React, { useState } from 'react';
import { MessageSquareText, Send, Loader2 } from 'lucide-react';

interface AIAssistantProps {
  onAsk: (question: string) => Promise<void>;
  response: string | null;
  isLoading: boolean;
}

export function AIAssistant({ onAsk, response, isLoading }: AIAssistantProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onAsk(question);
      setQuestion('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquareText className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
      </div>
      
      {response && (
        <div className="mb-4 p-4 bg-gray-700/30 rounded-lg">
          <p className="text-gray-200">{response}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-gray-700/30 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          Ask
        </button>
      </form>
    </div>
  );
}
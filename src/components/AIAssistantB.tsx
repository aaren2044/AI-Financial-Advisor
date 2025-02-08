import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SendHorizontal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const genAI = new GoogleGenerativeAI('AIzaSyBe2nbxp1NYpt5BTD0yiIkPfXCYvQ-GHHo');

export default function AIAssistant() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `As a financial advisor, please help with this question: ${question}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResponse(response.text());
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, I encountered an error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white">AI Financial Assistant</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask any financial question..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <SendHorizontal size={20} />
            )}
          </button>
        </div>
      </form>

      {response && (
        <div className="mt-6 p-4 rounded-lg bg-gray-700/50 text-white">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageCircle, Send } from 'lucide-react';

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
      const prompt = `As an investment expert, please answer this question: ${question}`;
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
    <div className="fixed bottom-24 right-6 w-96 module-card p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-bold text-white">AI Investment Assistant</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask any investment-related question..."
            className="w-full p-4 bg-gray-800/50 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            rows={3}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute bottom-3 right-3 p-2 btn-primary rounded-full disabled:opacity-50"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>

      {loading && (
        <div className="mt-4 text-purple-400">
          Thinking...
        </div>
      )}

      {response && (
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg max-h-96 overflow-y-auto">
          <p className="text-white whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}
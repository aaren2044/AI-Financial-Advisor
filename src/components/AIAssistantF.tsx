import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageCircle, Bot, Send } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' }
];

export const AIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyBe2nbxp1NYpt5BTD0yiIkPfXCYvQ-GHHo');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Please provide advice about starting a home business. Translate the response to ${
        languages.find(l => l.code === language)?.name || 'English'
      }. Question: ${message}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResponse(response.text());
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, there was an error processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 p-6 rounded-lg space-y-4 shadow-xl border border-purple-500/20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bot className="text-purple-400" />
          AI Business Assistant
        </h2>
        <MessageCircle className="text-purple-400 h-6 w-6 animate-pulse" />
      </div>
      
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full p-3 bg-gray-800/50 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about starting a home business..."
            className="w-full p-4 bg-gray-800/50 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
            rows={4}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Get Advice
            </>
          )}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-purple-500/30">
          <p className="text-white whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};
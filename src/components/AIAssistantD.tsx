import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';

export default function AIAssistantD() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBe2nbxp1NYpt5BTD0yiIkPfXCYvQ-GHHo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: userMessage
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting right now. Please try again later.", 
        isUser: false 
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">AI Assistant</span>
          </div>
          <p className="text-gray-300">
            Hello! I'm your Digital Marketing AI assistant. Feel free to ask me any questions about digital marketing concepts, strategies, or best practices.
          </p>
        </div>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.isUser
                ? 'bg-purple-600 ml-auto max-w-[80%]'
                : 'bg-gray-700 mr-auto max-w-[80%]'
            }`}
          >
            {message.text}
          </div>
        ))}

        {isLoading && (
          <div className="bg-gray-700 p-4 rounded-lg mr-auto max-w-[80%]">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask anything about digital marketing..."
            className="flex-1 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="p-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors duration-300 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
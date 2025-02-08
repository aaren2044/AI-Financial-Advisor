import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Mic, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ai } from '../services/api';
import toast from 'react-hot-toast';

interface Message {
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isRecording, setIsRecording] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      setIsLoading(true);
      
      // Add user message immediately
      const userMessage: Message = {
        type: 'user',
        message: inputMessage.trim(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      // Get AI response
      const response = await ai.chat(userMessage.message, selectedLanguage);
      
      if (!response?.success) {
        throw new Error(response?.error || 'Failed to get response');
      }

      // Add bot message
      const botMessage: Message = {
        type: 'bot',
        message: response.reply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Voice input is not supported in your browser');
      return;
    }

    try {
      setIsRecording(true);
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = selectedLanguage === 'English' ? 'en-IN' : 'hi-IN';
      
      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        
        try {
          const response = await ai.voiceTranscribe(transcript, selectedLanguage);
          
          if (!response?.success) {
            throw new Error(response?.error || 'Failed to process voice input');
          }

          const botMessage: Message = {
            type: 'bot',
            message: response.reply,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
        } catch (error) {
          console.error('Voice transcription error:', error);
          toast.error('Failed to process voice input');
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        toast.error('Voice recognition failed');
      };

      recognition.start();
    } catch (error) {
      console.error('Voice input error:', error);
      toast.error('Failed to start voice input');
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 w-96 bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Financial Assistant</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="mt-2 w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Gujarati">Gujarati</option>
            </select>
          </div>

          {/* Messages */}
          <div 
            ref={chatContainerRef}
            className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600"
          >
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.type === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="text-xs opacity-50">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <button
                onClick={handleVoiceInput}
                disabled={isRecording}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Mic size={20} />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Ask in ${selectedLanguage}...`}
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChat;
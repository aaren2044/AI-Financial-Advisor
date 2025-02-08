import React, { useState } from 'react';
import { Bot, Send, ArrowRight, Coins, PieChart, Timer, Target, BarChart3, HelpCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface InvestmentForm {
  goal: string;
  riskTolerance: string;
  timeHorizon: string;
  initialAmount: string;
  returnPreference: string;
  preferredType: string;
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyBe2nbxp1NYpt5BTD0yiIkPfXCYvQ-GHHo');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

function InvestmentGuide() {
  const [step, setStep] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState<InvestmentForm>({
    goal: '',
    riskTolerance: '',
    timeHorizon: '',
    initialAmount: '',
    returnPreference: '',
    preferredType: '',
  });
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; content: string }>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof InvestmentForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateInitialPrompt = () => {
    return `You are an expert investment advisor. Based on the following user profile, provide tailored investment advice:
    
    Investment Goal: ${formData.goal}
    Risk Tolerance: ${formData.riskTolerance}
    Time Horizon: ${formData.timeHorizon}
    Initial Investment: $${formData.initialAmount}
    Return Preference: ${formData.returnPreference}
    Preferred Investment Type: ${formData.preferredType}
    
    Please provide a comprehensive analysis and investment strategy based on this profile.`;
  };

  const handleSubmit = async () => {
    setShowChat(true);
    setIsLoading(true);
    try {
      const prompt = generateInitialPrompt();
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages([
        {
          type: 'ai',
          content: text
        }
      ]);
    } catch (error) {
      setMessages([
        {
          type: 'ai',
          content: "I apologize, but I'm having trouble connecting to the AI service. Please try asking your question again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;
    
    const userMessage = currentMessage;
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const chat = model.startChat({
        history: messages.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'model',
          parts: msg.content,
        })),
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { type: 'ai', content: text }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: "I apologize, but I'm having trouble connecting to the AI service. Please try asking your question again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {!showChat ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Smart Investment Guide
              </h1>
              <p className="text-gray-300">Let's create your personalized investment strategy</p>
            </div>

            <div className="card">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      Investment Goal
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g., Retirement, Education"
                      value={formData.goal}
                      onChange={(e) => handleInputChange('goal', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                      Risk Tolerance
                    </label>
                    <select
                      className="input-field"
                      value={formData.riskTolerance}
                      onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                    >
                      <option value="">Select Risk Level</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <button className="gradient-button w-full" onClick={() => setStep(2)}>
                    Next <ArrowRight className="w-4 h-4 inline ml-2" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <Timer className="w-5 h-5 text-purple-400" />
                      Investment Time Horizon
                    </label>
                    <select
                      className="input-field"
                      value={formData.timeHorizon}
                      onChange={(e) => handleInputChange('timeHorizon', e.target.value)}
                    >
                      <option value="">Select Time Horizon</option>
                      <option value="short">Short-term (&lt;3 years)</option>
                      <option value="medium">Medium-term (3-7 years)</option>
                      <option value="long">Long-term (&gt;7 years)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-purple-400" />
                      Initial Investment Amount
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Enter amount"
                      value={formData.initialAmount}
                      onChange={(e) => handleInputChange('initialAmount', e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button className="gradient-button w-1/2" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button className="gradient-button w-1/2" onClick={() => setStep(3)}>
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-purple-400" />
                      Expected Returns Preference
                    </label>
                    <select
                      className="input-field"
                      value={formData.returnPreference}
                      onChange={(e) => handleInputChange('returnPreference', e.target.value)}
                    >
                      <option value="">Select Return Preference</option>
                      <option value="stable">Stable Returns</option>
                      <option value="high">High Returns</option>
                      <option value="balanced">Balanced</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-purple-400" />
                      Preferred Investment Type
                    </label>
                    <select
                      className="input-field"
                      value={formData.preferredType}
                      onChange={(e) => handleInputChange('preferredType', e.target.value)}
                    >
                      <option value="">Select Investment Type</option>
                      <option value="stocks">Stocks</option>
                      <option value="mutual_funds">Mutual Funds</option>
                      <option value="bonds">Bonds</option>
                      <option value="real_estate">Real Estate</option>
                      <option value="crypto">Cryptocurrency</option>
                      <option value="diversified">Diversified Portfolio</option>
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <button className="gradient-button w-1/2" onClick={() => setStep(2)}>
                      Back
                    </button>
                    <button className="gradient-button w-1/2" onClick={handleSubmit}>
                      Get Guidance
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="card space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">AI Investment Assistant</h2>
            </div>

            <div className="h-[400px] overflow-y-auto space-y-4 mb-4">
              {messages.map((message, index) => (
                <div key={index} className="ai-container">
                  <div className={message.type === 'user' ? 'user-message' : 'ai-message'}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="ai-container">
                  <div className="ai-message">
                    <div className="flex items-center gap-2">
                      <div className="animate-pulse">Thinking</div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                className="input-field flex-1"
                placeholder="Ask about investment strategies, market analysis, or specific options..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isLoading}
              />
              <button 
                className="gradient-button" 
                onClick={sendMessage}
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvestmentGuide;
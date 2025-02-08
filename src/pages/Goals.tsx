import React, { useState } from 'react';
import { Target, Wallet, AlertTriangle, TrendingUp, Plus, Calendar, MessageSquare, PiggyBank, CreditCard, X, Heart } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  amount: number;
  collected: number;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  category: 'savings' | 'investment' | 'expense';
}

interface Loan {
  id: string;
  farmerName: string;
  amount: number;
  dueDate: string;
  paid: number;
}

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Farm Equipment',
      amount: 500000,
      collected: 350000,
      deadline: '2024-12-31',
      priority: 'high',
      category: 'expense'
    }
  ]);

  const [loans, setLoans] = useState<Loan[]>([
    {
      id: '1',
      farmerName: 'John Smith',
      amount: 250000,
      dueDate: '2024-06-30',
      paid: 150000
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showUpdateProgress, setShowUpdateProgress] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [progressAmount, setProgressAmount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your financial assistant. How can I help you manage your expenses today?", sender: 'ai' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [newGoal, setNewGoal] = useState({
    title: '',
    amount: 0,
    deadline: '',
    priority: 'medium' as const,
    category: 'expense' as const,
    monthlySalary: 0,
    monthlyExpenses: 0
  });

  const calculateUrgency = (deadline: string): string => {
    const months = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30));
    return months <= 1 ? 'bg-red-500' : months <= 3 ? 'bg-yellow-500' : 'bg-green-500';
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setMessages(prev => [...prev, { text: newMessage, sender: 'user' }]);
    setNewMessage('');

    // Simulated AI response - In production, this would use the Gemini API
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Based on your financial goals and current savings, I recommend allocating 50% of your income to necessities, 30% to goals, and 20% to savings. Would you like a detailed breakdown?",
        sender: 'ai'
      }]);
    }, 1000);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const monthlySavings = newGoal.monthlySalary - newGoal.monthlyExpenses;
    const monthsToGoal = newGoal.amount / monthlySavings;

    setGoals(prev => [...prev, {
      id: Date.now().toString(),
      title: newGoal.title,
      amount: newGoal.amount,
      collected: 0,
      deadline: newGoal.deadline,
      priority: newGoal.priority,
      category: newGoal.category
    }]);

    setShowAddGoal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 hover:scale-[1.01] transition-transform duration-300">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Target className="w-10 h-10" />
            Goals Dashboard
          </h1>
          <p className="text-gray-300">Track your financial goals and manage loans efficiently</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 card-hover">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Target /> Financial Goals
              </h2>
              <button
                onClick={() => setShowAddGoal(!showAddGoal)}
                className="btn btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Goal
              </button>
            </div>

            <div className="space-y-4">
              {goals.map(goal => (
                <div key={goal.id} className="bg-gray-700 bg-opacity-50 rounded-lg p-4 table-row-animate">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{goal.title}</h3>
                      <span className="text-xs text-gray-400">{goal.category}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${calculateUrgency(goal.deadline)} ${
                      calculateUrgency(goal.deadline) === 'bg-red-500' ? 'pulse' : ''
                    }`}>
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{Math.round((goal.collected / goal.amount) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2 progress-bar">
                      <div
                        className="bg-purple-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${(goal.collected / goal.amount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300 mb-3">
                    <span>Collected: ₹{goal.collected.toLocaleString()}</span>
                    <span>Target: ₹{goal.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedGoal(goal);
                        setShowUpdateProgress(true);
                      }}
                      className="btn btn-update flex-1 flex items-center justify-center gap-2 text-sm"
                    >
                      <Plus className="w-4 h-4" /> Update Progress
                    </button>
                    <button
                      onClick={() => {
                        setSelectedGoal(goal);
                        setShowDonateModal(true);
                      }}
                      className="btn btn-donate flex-1 flex items-center justify-center gap-2 text-sm"
                    >
                      <Heart className="w-4 h-4" /> Donate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 card-hover">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Wallet /> Farmer Loans
              </h2>
              <button
                onClick={() => setShowAddLoan(!showAddLoan)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Loan
              </button>
            </div>

            <div className="space-y-4">
              {loans.map(loan => (
                <div key={loan.id} className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{loan.farmerName}</h3>
                    <span className="text-sm text-gray-300">Due: {new Date(loan.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Repayment Progress</span>
                      <span>{Math.round((loan.paid / loan.amount) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${(loan.paid / loan.amount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Paid: ₹{loan.paid.toLocaleString()}</span>
                    <span>Total: ₹{loan.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold">Total Progress</h3>
            </div>
            <p className="text-3xl font-bold">₹{goals.reduce((acc, goal) => acc + goal.collected, 0).toLocaleString()}</p>
            <p className="text-gray-400 text-sm mt-2">Total funds collected across all goals</p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-semibold">Pending Loans</h3>
            </div>
            <p className="text-3xl font-bold">₹{loans.reduce((acc, loan) => acc + (loan.amount - loan.paid), 0).toLocaleString()}</p>
            <p className="text-gray-400 text-sm mt-2">Total outstanding loan amount</p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <PiggyBank className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-semibold">Monthly Savings</h3>
            </div>
            <p className="text-3xl font-bold">₹{(goals.reduce((acc, goal) => acc + goal.collected, 0) * 0.1).toLocaleString()}</p>
            <p className="text-gray-400 text-sm mt-2">Recommended monthly savings</p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-semibold">Upcoming Deadlines</h3>
            </div>
            <p className="text-3xl font-bold">{goals.filter(goal => new Date(goal.deadline) > new Date()).length}</p>
            <p className="text-gray-400 text-sm mt-2">Active goals with upcoming deadlines</p>
          </div>
        </div>

        <button
          onClick={() => setShowAIChat(!showAIChat)}
          className="fixed bottom-8 right-8 p-4 bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 transition-all"
        >
          <MessageSquare className="w-6 h-6" />
        </button>

        {showAIChat && (
          <div className="fixed bottom-24 right-8 w-96 bg-gray-800 bg-opacity-95 backdrop-blur-lg rounded-xl border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> Financial Assistant
              </h3>
              <button onClick={() => setShowAIChat(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.sender === 'user' ? 'ml-auto bg-purple-600' : 'mr-auto bg-gray-700'
                  } max-w-[80%] rounded-lg p-3`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about your finances..."
                  className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Add New Goal</h3>
                <button onClick={() => setShowAddGoal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Title</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Salary</label>
                  <input
                    type="number"
                    value={newGoal.monthlySalary}
                    onChange={(e) => setNewGoal({ ...newGoal, monthlySalary: Number(e.target.value) })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Expenses</label>
                  <input
                    type="number"
                    value={newGoal.monthlyExpenses}
                    onChange={(e) => setNewGoal({ ...newGoal, monthlyExpenses: Number(e.target.value) })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target Amount (₹)</label>
                  <input
                    type="number"
                    value={newGoal.amount}
                    onChange={(e) => setNewGoal({ ...newGoal, amount: Number(e.target.value) })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Deadline</label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as 'savings' | 'investment' | 'expense' })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="savings">Savings</option>
                    <option value="investment">Investment</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all"
                >
                  Add Goal
                </button>
              </form>
            </div>
          </div>
        )}

        {showUpdateProgress && selectedGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md modal-animate">
              <input
                type="number"
                value={progressAmount}
                onChange={(e) => setProgressAmount(Number(e.target.value))}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 input-effect"
                required
              />
              <button
                type="submit"
                className="btn btn-update w-full"
              >
                Update Progress
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Goals;
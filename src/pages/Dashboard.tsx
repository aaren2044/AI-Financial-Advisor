import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, BookOpen, BrainCircuit, Building2, Calculator, Calendar, ChevronRight,
  Coins, FileText, PiggyBank, Target, Users, LineChart, MessageCircle, Video, HandCoins,
  Wallet, TrendingUp, Milestone,
  Newspaper
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AIChat from '../components/AIChat';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [learningModules, setLearningModules] = useState([]);
  const [financialGoals, setFinancialGoals] = useState([]);
  const [savings, setSavings] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [income, setIncome] = useState(0);
  const navigate = useNavigate();
  const tools = [
    {
      title: 'Budget Calculator',
      icon: Calculator,
      description: 'Plan your monthly budget and track expenses',
      path: '/budget-calculator',
    },
    {
      title: 'Loan Eligibility',
      icon: FileText,
      description: 'Check your eligibility for various loan types',
      path: '/loan-eligibility',
    },
    {
      title: 'Savings Planner',
      icon: Calendar,
      description: 'Set savings goals and track progress',
      path: '/savings-planner',
    },
    {
      title: 'Investment Guide',
      icon: BrainCircuit,
      description: 'Get personalized investment recommendations',
      path: '/investment-guide',
    },
  ];

  // The "Open Tool" button for Budget Calculator
  const handleOpenTool = (path) => {
    navigate(path); // Navigate to the provided path
  };  

  // Course data
  const courses = [
    {
      title: 'Basic Financial Literacy',
      icon: BookOpen,
      progress: 60,
      modules: 3,
      path: '/financial-literacy',
    },
    {
      title: 'Digital Banking',
      icon: Building2,
      progress: 30,
      modules: 4,
      path: '/digital',
    },
    {
      title: 'Business Planning',
      icon: LineChart,
      progress: 0,
      modules: 6,
      path: '/business-plans',  // Define path for Business Planning
    },
    {
      title: 'Investment Basics',
      icon: HandCoins,
      progress: 0,
      modules: 3,
      path: '/investment',
    },
  ];

  // Function to handle course click and navigation
  const handleCourseClick = (path: string) => {
    navigate(path);  // Navigate to the specified path (in this case, Business Planning)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const fetchLearningModules = async () => {
          try {
            const res = await fetch('http://localhost:5000/api/learning/modules'); // Corrected endpoint
            const data = await res.json();
        
            if (Array.isArray(data.modules)) { // Ensure response is an array
              setLearningModules(data.modules);
            } else {
              console.error("Unexpected response format:", data);
            }
          } catch (error) {
            console.error("Error fetching learning modules:", error);
          }
        };        
    
        const fetchVideos = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/learning/videos'); // Corrected URL
            const data = await response.json();
            setVideos(data.videos); // Make sure to access `data.videos`
          } catch (error) {
            console.error("Error fetching videos:", error);
          }
        };        

        fetchLearningModules();
        fetchVideos();
  
        const responses = await Promise.all([
          fetch('http://localhost:5000/api/finance/financial-goals', { headers }).then(res => res.json()),
          fetch('http://localhost:5000/api/finance/savings', { headers }).then(res => res.json()),
          fetch('http://localhost:5000/api/finance/expenses', { headers }).then(res => res.json()),
          fetch('http://localhost:5000/api/finance/total-savings', { headers }).then(res => res.json()),
          fetch('http://localhost:5000/api/finance/income', { headers }).then(res => res.json()),
        ]);
  
        setFinancialGoals(responses[0]);
        setSavings(responses[1]);
        setExpenses(responses[2]);
        setTotalSavings(responses[3][0]?.amount || 0);
        setIncome(responses[4][0]?.amount || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);  

  // Process savings data for chart
  const savingsData = {
    labels: savings.map(entry => entry.month || 'Unknown'),
    datasets: [
      {
        label: 'Monthly Savings',
        data: savings.map(entry => entry.amount || 0),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
      },
    ],
  };

  // Process expenses data for chart
  const expenseData = {
    labels: expenses.map(entry => entry.category || 'Unknown'),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: expenses.map(entry => entry.amount || 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 px-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <nav className="space-y-2">
                {[{ id: 'overview', icon: BarChart3, label: 'Overview' },
                  { id: 'learning', icon: BookOpen, label: 'Learning Modules' },
                  { id: 'finance', icon: Coins, label: 'Financial Tools' },
                  { id: 'community', icon: Users, label: 'Community' },
                  { id: 'goals', icon: Target, label: 'Goals' },
                  { id: 'news', icon: Newspaper, label: 'News' },
                ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-purple-600/20'
                      }`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 px-4">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Financial Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[{
                      label: 'Total Savings',
                      value: `₹${totalSavings.toLocaleString()}`,
                      icon: PiggyBank
                    },
                    {
                      label: 'Monthly Income',
                      value: `₹${income.toLocaleString()}`,
                      icon: Coins
                    },
                    {
                      label: 'Active Goals',
                      value: `${financialGoals.length}`,
                      icon: Target
                    }].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-purple-600/20 rounded-xl p-4"
                      >
                        <div className="flex items-center space-x-3">
                          <stat.icon className="text-purple-400" size={24} />
                          <div>
                            <p className="text-gray-400">{stat.label}</p>
                            <p className="text-xl font-bold text-white">{stat.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700/50 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Savings Trend</h3>
                      <Line data={savingsData} />
                    </div>
                    <div className="bg-gray-700/50 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Expense Breakdown</h3>
                      <Bar data={expenseData} />
                    </div>
                  </div>
                </div>
              )}

              {/* Learning Tab */}
              {activeTab === 'learning' && (
                <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Learning Modules</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-700/50 rounded-xl p-6 hover:bg-gray-600/50 transition-colors cursor-pointer"
            onClick={() => handleCourseClick(course.path || '')}  // Navigate to the path when clicked
          >
            <div className="flex items-start justify-between">
              <div>
                <course.icon className="text-purple-400 mb-3" size={24} />
                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                <p className="text-gray-400 mt-1">{course.modules} Modules</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-purple-600/20 flex items-center justify-center">
                <span className="text-lg font-bold text-purple-400">{course.progress}%</span>
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-600 rounded-full">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

                  {/* Video Tutorials */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-white mb-4">Featured Video Tutorials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {videos.map((video, index) => (
                        <a key={index} href={video.link} target="_blank" rel="noopener noreferrer" className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-600/50 transition-colors">
                          <div className="aspect-video bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
                            <Video className="text-gray-400" size={40} />
                          </div>
                          <h4 className="text-white font-medium">{video.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">{video.duration} mins</p>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 text-center">
  </div>
                </div>
              )}

{activeTab === 'finance' && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-6">Financial Tools</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[{
        title: 'Budget Calculator',
        icon: Calculator,
        description: 'Plan your monthly budget and track expenses',
        path: '/budget-calculator', // Add path for Budget Calculator
      },
      {
        title: 'Loan Eligibility',
        icon: FileText,
        description: 'Check your eligibility for various loan types',
        path: '/loan-eligibility', // Add path for Loan Eligibility
      },
      {
        title: 'Savings Planner',
        icon: Calendar,
        description: 'Set savings goals and track progress',
        path: '/savings-planner',
      },
      {
        title: 'Investment Guide',
        icon: BrainCircuit,
        description: 'Get personalized investment recommendations',
        path: '/investment-guide',
      },
    ].map((tool, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-700/50 rounded-xl p-6 hover:bg-gray-600/50 transition-colors cursor-pointer"
        >
          <tool.icon className="text-purple-400 mb-3" size={24} />
          <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
          <p className="text-gray-400 mt-2">{tool.description}</p>
          <button 
            onClick={() => handleOpenTool(tool.path)} // Use the path dynamically
            className="mt-4 flex items-center text-purple-400 hover:text-purple-300"
          >
            Open Tool <ChevronRight size={16} className="ml-1" />
          </button>
        </motion.div>
      ))}
    </div>
  </div>
)}

              {activeTab === 'community' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Community & Mentorship</h2>

                  <button 
      className="w-full mt-4 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700"
      onClick={() => navigate('/forum')} // ✅ Navigate to goals.tsx
    >
      Open Forum
    </button>   
                </div>
              )}

              {/* Goals Tab */}
              {activeTab === 'goals' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Financial Goals</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {financialGoals.map((goal) => (
                      <div key={goal._id} className="bg-gray-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white">{goal.name}</h3>
                        <span className="text-purple-400">₹{goal.current} / ₹{goal.target}</span>
                        <p className="text-gray-400 text-sm mt-2">
                          <div className="h-2 bg-gray-600 rounded-full">
                            <div
                              className="h-full bg-yellow-600 rounded-full"
                              style={{
                                width: `${(goal.current / goal.target) * 100}%`,
                              }}
                            />
                          </div>
                          {((goal.current / goal.target) * 100).toFixed(1)}% Complete
                        </p>
                      </div>
                    ))}
                  </div>
                  <button 
      className="w-full mt-4 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700"
      onClick={() => navigate('/goals')} // ✅ Navigate to goals.tsx
    >
      Open Goals Dashboard
    </button>
                </div>
              )}

              {/* News Tab */}
              {activeTab === 'news' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">News</h2>
                  <button 
      className="w-full mt-4 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700"
      onClick={() => navigate('/news')}
    >
      Open News
    </button>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* AI Chatbot */}
        <div className="fixed bottom-6 right-6">
          {isAIChatOpen ? (
            <AIChat isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAIChatOpen(true)}
              className="bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-colors"
            >
              <MessageCircle size={24} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { Book, PlayCircle, BrainCircuit, ChevronRight, ArrowRight } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  quiz: {
    questions: Array<{
      id: number;
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
}

const modules: Module[] = [
  {
    id: 1,
    title: "Business Model Development",
    description: "Learn how to create and validate your business model using proven frameworks",
    videoUrl: "https://www.youtube.com/embed/IP0cUBWTgpY",
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is a value proposition?",
          options: [
            "A product's price",
            "The unique benefit your product/service offers",
            "A marketing strategy",
            "A business location"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Which of these is NOT a key component of the Business Model Canvas?",
          options: [
            "Customer Segments",
            "Revenue Streams",
            "Stock Options",
            "Key Partners"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "What is the primary purpose of a business model?",
          options: [
            "To make profit only",
            "To describe how a business creates, delivers, and captures value",
            "To manage employees",
            "To track inventory"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "What is customer segmentation?",
          options: [
            "Dividing customers based on their buying behavior",
            "Selling different products",
            "Marketing strategy",
            "Customer service approach"
          ],
          correctAnswer: 0
        },
        {
          id: 5,
          question: "Which of these is a revenue stream?",
          options: [
            "Employee salaries",
            "Office rent",
            "Subscription fees",
            "Marketing expenses"
          ],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 2,
    title: "Market Research & Analysis",
    description: "Master the techniques of market research and competitive analysis",
    videoUrl: "https://www.youtube.com/embed/PZZUQJyZFxU",
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is market segmentation?",
          options: [
            "Dividing the market into distinct groups",
            "Selling different products",
            "Advertising strategy",
            "Pricing strategy"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "Which analysis tool examines Strengths, Weaknesses, Opportunities, and Threats?",
          options: [
            "PEST Analysis",
            "Porter's Five Forces",
            "SWOT Analysis",
            "BCG Matrix"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "What is primary market research?",
          options: [
            "Research done by other companies",
            "Historical data analysis",
            "Direct research with potential customers",
            "Internet research"
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "Which is NOT a type of market research?",
          options: [
            "Surveys",
            "Focus Groups",
            "Social Media Analysis",
            "Product Manufacturing"
          ],
          correctAnswer: 3
        },
        {
          id: 5,
          question: "What is a competitive advantage?",
          options: [
            "Having more employees",
            "Lower prices",
            "Unique value proposition",
            "Bigger office space"
          ],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 3,
    title: "Financial Planning & Management",
    description: "Learn essential financial planning and management techniques",
    videoUrl: "https://www.youtube.com/embed/1r1kJZ0ZI6I",
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is a cash flow statement?",
          options: [
            "A record of all sales",
            "A document showing cash inflows and outflows",
            "A list of expenses",
            "Bank account statement"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "What is working capital?",
          options: [
            "Total assets",
            "Current assets minus current liabilities",
            "Total investments",
            "Annual revenue"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "Which financial statement shows a company's assets, liabilities, and equity?",
          options: [
            "Income Statement",
            "Cash Flow Statement",
            "Balance Sheet",
            "Profit & Loss Statement"
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "What is break-even analysis?",
          options: [
            "Analysis of profits",
            "Point where total costs equal total revenues",
            "Analysis of losses",
            "Market analysis"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "What is ROI?",
          options: [
            "Return on Investment",
            "Rate of Interest",
            "Return on Income",
            "Rate of Inflation"
          ],
          correctAnswer: 0
        }
      ]
    }
  },
  {
    id: 4,
    title: "Marketing Strategy",
    description: "Develop effective marketing strategies for business growth",
    videoUrl: "https://www.youtube.com/embed/ZMf9o6P0NEw",
    quiz: {
      questions: [
        {
          id: 1,
          question: "What are the 4 Ps of Marketing?",
          options: [
            "Price, Product, Place, Promotion",
            "People, Process, Product, Price",
            "Place, Position, Price, People",
            "Promotion, Process, Place, People"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "What is content marketing?",
          options: [
            "Paid advertising",
            "Creating valuable content to attract customers",
            "Email marketing",
            "Social media posts"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "What is a marketing funnel?",
          options: [
            "A sales technique",
            "Customer journey from awareness to purchase",
            "Social media strategy",
            "Email list"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "What is brand positioning?",
          options: [
            "Logo design",
            "Website placement",
            "How customers perceive your brand",
            "Advertisement placement"
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          question: "What is SEO?",
          options: [
            "Search Engine Optimization",
            "Social Engine Operation",
            "Search Email Operation",
            "Social Email Optimization"
          ],
          correctAnswer: 0
        }
      ]
    }
  },
  {
    id: 5,
    title: "Operations Management",
    description: "Master the fundamentals of business operations and management",
    videoUrl: "https://www.youtube.com/embed/6aV_8MtwM3Q",
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is supply chain management?",
          options: [
            "Managing suppliers",
            "End-to-end management of product flow",
            "Inventory control",
            "Transportation management"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "What is quality control?",
          options: [
            "Customer service",
            "Product testing",
            "Maintaining consistent product standards",
            "Employee training"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "What is inventory management?",
          options: [
            "Storing products",
            "Ordering supplies",
            "Managing stock levels and movement",
            "Selling products"
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "What is process optimization?",
          options: [
            "Improving efficiency of business processes",
            "Hiring more staff",
            "Buying new equipment",
            "Reducing costs"
          ],
          correctAnswer: 0
        },
        {
          id: 5,
          question: "What is capacity planning?",
          options: [
            "Office space planning",
            "Determining production capabilities",
            "Staff scheduling",
            "Budget planning"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 6,
    title: "Leadership & Team Management",
    description: "Develop essential leadership skills and team management techniques",
    videoUrl: "https://www.youtube.com/embed/L1Wqj9cPqNo",
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is transformational leadership?",
          options: [
            "Changing company policies",
            "Leading by inspiring and motivating others",
            "Managing transitions",
            "Organizational restructuring"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "What is delegation?",
          options: [
            "Assigning tasks and authority to others",
            "Making decisions",
            "Team meetings",
            "Project planning"
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          question: "What is emotional intelligence?",
          options: [
            "Being smart",
            "Understanding and managing emotions",
            "Technical skills",
            "Problem-solving ability"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "What is team building?",
          options: [
            "Hiring new employees",
            "Office parties",
            "Activities to improve team cohesion",
            "Project management"
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          question: "What is conflict resolution?",
          options: [
            "Avoiding problems",
            "Fighting",
            "Process of resolving disagreements",
            "Team building"
          ],
          correctAnswer: 2
        }
      ]
    }
  }
];

function BusinessPlanning() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const askAI = async () => {
    if (!userQuestion.trim()) return;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `As a business planning expert, please answer this question: ${userQuestion}`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setAiResponse(data.candidates[0].content.parts[0].text);
      } else {
        setAiResponse('I apologize, but I was unable to generate a response. Please try rephrasing your question.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAiResponse('Sorry, there was an error processing your request. Please try again later.');
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === selectedModule?.quiz.questions[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestionIndex < selectedModule!.quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Business Planning Academy
        </h1>

        {!selectedModule ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="p-6 rounded-xl bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedModule(module)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Book className="w-8 h-8 text-purple-400" />
                  <h2 className="text-xl font-semibold">{module.title}</h2>
                </div>
                <p className="text-gray-300 mb-4">{module.description}</p>
                <button className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                  Start Learning <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <button
              onClick={() => {
                setSelectedModule(null);
                setShowQuiz(false);
                resetQuiz();
              }}
              className="mb-4 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4" /> Back to Modules
            </button>

            {!showQuiz ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">{selectedModule.title}</h2>
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  <iframe
                    src={selectedModule.videoUrl}
                    className="w-full h-[400px] rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" /> Take Quiz
                </button>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-6">Module Quiz</h3>
                {!quizCompleted ? (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <p className="text-lg mb-2">Question {currentQuestionIndex + 1} of {selectedModule.quiz.questions.length}</p>
                      <p className="text-xl">{selectedModule.quiz.questions[currentQuestionIndex].question}</p>
                    </div>
                    <div className="space-y-3">
                      {selectedModule.quiz.questions[currentQuestionIndex].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-4 rounded-lg text-left transition-colors ${
                            selectedAnswer === index
                              ? 'bg-purple-600 text-white'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className={`mt-6 px-6 py-3 rounded-lg transition-colors ${
                        selectedAnswer === null
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-purple-600 hover:bg-purple-700'
                      }`}
                    >
                      Next Question
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <h4 className="text-2xl mb-4">Quiz Completed!</h4>
                    <p className="text-xl mb-6">Your score: {score} out of {selectedModule.quiz.questions.length}</p>
                    <button
                      onClick={resetQuiz}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Retry Quiz
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <BrainCircuit className="w-6 h-6" /> AI Assistant
              </h3>
              <div className="space-y-4">
                <textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  className="w-full p-4 rounded-lg bg-white/5 border border-purple-500/30 focus:border-purple-500 outline-none transition-colors"
                  placeholder="Ask anything about business planning..."
                  rows={3}
                />
                <button
                  onClick={askAI}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Ask AI Assistant
                </button>
                {aiResponse && (
                  <div className="mt-4 p-4 rounded-lg bg-white/5 border border-purple-500/30">
                    <p className="text-gray-300">{aiResponse}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessPlanning;
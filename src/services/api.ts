import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: any) => api.post('/api/auth/register', data),
  login: (data: any) => api.post('/api/auth/login', data),
  voiceAuth: (data: any) => api.post('/api/auth/voice-auth', data),
  faceAuth: (data: any) => api.post('/api/auth/face-auth', data),
  fingerprintAuth: (data: any) => api.post('/api/auth/fingerprint-auth', data)
};

export const ai = {
  chat: async (message: string, language: string = 'English') => {
    try {
      const response = await api.post('/api/ai/chat', { message, language });
      return response.data;
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  },
  getRecommendations: async (userId: string, financialProfile: any) => {
    try {
      const response = await api.post('/api/ai/recommend', { userId, financialProfile });
      return response.data;
    } catch (error) {
      console.error('Recommendations API Error:', error);
      throw error;
    }
  },
  voiceTranscribe: async (audioText: string, language: string = 'English') => {
    try {
      const response = await api.post('/api/ai/voice-transcribe', { audioText, language });
      return response.data;
    } catch (error) {
      console.error('Voice Transcription API Error:', error);
      throw error;
    }
  }
};

export const finance = {
  getGoals: () => api.get('/api/finance/goals'),
  addGoal: (data: any) => api.post('/api/finance/goals', data),
  updateGoal: (id: string, data: any) => api.put(`/api/finance/goals/${id}`, data),
  deleteGoal: (id: string) => api.delete(`/api/finance/goals/${id}`),
  getSavings: () => api.get('/api/finance/savings'),
  addTransaction: (data: any) => api.post('/api/finance/transactions', data),
  getLoanEligibility: () => api.get('/api/finance/loan-eligibility'),
};

export const learning = {
  getModules: () => api.get('/api/learning/modules'),
  getProgress: () => api.get('/api/learning/progress'),
  updateProgress: (moduleId: string, data: any) => 
    api.put(`/api/learning/progress/${moduleId}`, data),
  getQuizzes: (moduleId: string) => api.get(`/api/learning/quizzes/${moduleId}`),
  submitQuiz: (quizId: string, answers: any) => 
    api.post(`/api/learning/quizzes/${quizId}/submit`, answers),
};

export const community = {
  getMentors: () => api.get('/api/community/mentors'),
  requestMentorship: (mentorId: string) => 
    api.post(`/api/community/mentorship-requests/${mentorId}`),
  getForumTopics: () => api.get('/api/community/forum-topics'),
  createForumPost: (data: any) => api.post('/api/community/forum-posts', data),
  getEvents: () => api.get('/api/community/events'),
  registerForEvent: (eventId: string) => 
    api.post(`/api/community/event-registrations/${eventId}`),
};

// Enhanced API endpoints
export const features = {
  // Voice and Language Features
  voiceAssistant: (audioData: Blob) => api.post('/api/features/voice-assist', audioData),
  languageTranslation: (text: string, targetLang: string) => 
    api.post('/api/features/translate', { text, targetLang }),
  
  // Financial Features
  microFinance: {
    getLoans: () => api.get('/api/finance/micro-loans'),
    applyForLoan: (data: any) => api.post('/api/finance/micro-loans/apply', data),
    getRepaymentSchedule: (loanId: string) => 
      api.get(`/api/finance/micro-loans/${loanId}/schedule`)
  },
  
  // Business Tools
  businessPlanning: {
    generatePlan: (data: any) => api.post('/api/business/plan-generator', data),
    getMarketInsights: (category: string) => 
      api.get(`/api/business/market-insights/${category}`)
  },
  
  // Community Features
  skillSharing: {
    getSkills: () => api.get('/api/community/skills'),
    offerSkill: (data: any) => api.post('/api/community/skills/offer', data),
    requestSkill: (data: any) => api.post('/api/community/skills/request', data)
  },
  
  // Government Schemes
  govSchemes: {
    getEligibleSchemes: () => api.get('/api/gov-schemes/eligible'),
    applyForScheme: (schemeId: string, data: any) => 
      api.post(`/api/gov-schemes/${schemeId}/apply`, data)
  },
  
  // Analytics
  analytics: {
    getFinancialHealth: () => api.get('/api/analytics/financial-health'),
    getSavingsPredictions: () => api.get('/api/analytics/savings-predictions'),
    getExpenseAnalysis: () => api.get('/api/analytics/expense-analysis')
  }
};

export default api;
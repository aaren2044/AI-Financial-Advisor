import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import BudgetCalculator from './pages/BudgetCalculator.tsx';  
import LoanEligibility from './pages/LoanEligibility.tsx';  
import SavingsPlanner from './pages/SavingsPlanner.tsx';  
import InvestmentGuide from './pages/InvestmentGuide.tsx';  
import Videos from './pages/Videos.tsx';  
import BusinessPlans from './pages/BusinessPlans.tsx';  
import FinancialLiteracy from './pages/FinancialLiteracy.tsx';  
import Investment from './pages/Investment.tsx';  
import Digital from './pages/Digital.tsx';  
import Goals from './pages/Goals.tsx';  
import Forum from './pages/Forum.tsx';  
import News from './pages/News.tsx';  

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
            <div className="fixed top-4 right-4 z-50">
              <LanguageSelector />
            </div>
            
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/budget-calculator" element={<BudgetCalculator />} />
              <Route path="/loan-eligibility" element={<LoanEligibility />} />
              <Route path="/savings-planner" element={<SavingsPlanner />} />
              <Route path="/investment-guide" element={<InvestmentGuide />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/business-plans" element={<BusinessPlans />} />
              <Route path="/financial-literacy" element={<FinancialLiteracy />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/digital" element={<Digital />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/news" element={<News />} />
            </Routes>
            
            <Toaster position="top-right" />
            
            <div className="fixed bottom-4 left-0 right-0 text-center">
              <p className="text-lg font-semibold text-purple-400">
                Team SEND NODES - GenAI-Thon'25
              </p>
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
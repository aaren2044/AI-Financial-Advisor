import React, { useState } from 'react';
import { Calculator, IndianRupee, Home, Car, GraduationCap, Briefcase } from 'lucide-react';

interface LoanEligibilityForm {
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: number;
  employmentYears: number;
  existingLoans: number;
  loanType: string;
}

function LoanEligibility() {
  const [formData, setFormData] = useState<LoanEligibilityForm>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    creditScore: 700,
    employmentYears: 0,
    existingLoans: 0,
    loanType: 'home'
  });

  const [result, setResult] = useState<string>('');

  const getBankRecommendations = (loanType: string) => {
    switch (loanType) {
      case 'home':
        return `Top Banks for Home Loans:\n` +
               `1. SBI - Starting from 8.40% p.a.\n` +
               `2. HDFC Bank - Starting from 8.45% p.a.\n` +
               `3. ICICI Bank - Starting from 8.50% p.a.\n` +
               `4. Bank of Baroda - Starting from 8.40% p.a.\n` +
               `5. Kotak Mahindra Bank - Starting from 8.45% p.a.`;
      case 'car':
        return `Top Banks for Car Loans:\n` +
               `1. Bank of Baroda - Starting from 7.35% p.a.\n` +
               `2. Canara Bank - Starting from 7.40% p.a.\n` +
               `3. Union Bank - Starting from 7.45% p.a.\n` +
               `4. SBI - Starting from 7.50% p.a.\n` +
               `5. HDFC Bank - Starting from 7.60% p.a.`;
      case 'education':
        return `Top Banks for Education Loans:\n` +
               `1. SBI Scholar Loan - Starting from 7.35% p.a.\n` +
               `2. Bank of Baroda - Starting from 7.35% p.a.\n` +
               `3. Canara Bank - Starting from 7.40% p.a.\n` +
               `4. Punjab National Bank - Starting from 7.45% p.a.\n` +
               `5. Central Bank of India - Starting from 7.50% p.a.`;
      case 'personal':
        return `Top Banks for Personal Loans:\n` +
               `1. SBI - Starting from 10.50% p.a.\n` +
               `2. HDFC Bank - Starting from 10.50% p.a.\n` +
               `3. ICICI Bank - Starting from 10.75% p.a.\n` +
               `4. Axis Bank - Starting from 10.75% p.a.\n` +
               `5. Kotak Mahindra Bank - Starting from 10.99% p.a.`;
      default:
        return '';
    }
  };

  const calculateEligibility = () => {
    const { monthlyIncome, monthlyExpenses, creditScore, employmentYears, existingLoans, loanType } = formData;
    const disposableIncome = monthlyIncome - monthlyExpenses - existingLoans;
    const debtToIncomeRatio = (existingLoans / monthlyIncome) * 100;

    let maxLoanAmount = 0;
    let interestRate = 0;
    let message = '';

    if (creditScore < 600) {
      setResult("We're sorry, but a higher credit score (CIBIL Score) is needed to qualify for a loan. Consider improving your credit score first.");
      return;
    }

    if (debtToIncomeRatio > 43) {
      setResult("Your debt-to-income ratio is too high. Consider reducing your existing debt before applying for a new loan.");
      return;
    }

    switch (loanType) {
      case 'home':
        maxLoanAmount = disposableIncome * 250; // Adjusted for Indian home loan standards
        interestRate = creditScore > 740 ? 8.5 : 9.5; // Typical Indian home loan rates
        break;
      case 'car':
        maxLoanAmount = disposableIncome * 36; // Adjusted for Indian car loan standards
        interestRate = creditScore > 740 ? 7.5 : 8.5; // Typical Indian car loan rates
        break;
      case 'personal':
        maxLoanAmount = disposableIncome * 24; // Adjusted for Indian personal loan standards
        interestRate = creditScore > 740 ? 10.5 : 12.5; // Typical Indian personal loan rates
        break;
      case 'education':
        maxLoanAmount = disposableIncome * 96; // Adjusted for Indian education loan standards
        interestRate = 7.5; // Typical Indian education loan rates
        break;
    }

    message = `Based on your financial profile, you may qualify for a ${loanType} loan up to ₹${maxLoanAmount.toLocaleString('en-IN')}.\n\n`;
    message += `Estimated interest rate: ${interestRate}%\n\n`;
    message += `${getBankRecommendations(loanType)}\n\n`;
    message += "Next steps to apply:\n";
    message += "1. Gather required documents (Aadhaar, PAN, proof of income, bank statements)\n";
    message += "2. Check your CIBIL Score for accuracy\n";
    message += "3. Compare offers from multiple banks and NBFCs\n";
    message += "4. Submit formal application with chosen lender\n";
    message += "5. Provide additional documentation if requested\n\n";
    message += "Remember: This is an estimate. Final loan terms will be determined by the lender.\n\n";
    message += "Pro Tips:\n";
    message += "• Consider public sector banks for potentially lower interest rates\n";
    message += "• Watch for festive season offers and special promotions\n";
    message += "• Maintain a CIBIL score above 750 for best rates\n";
    message += "• Compare processing fees and other charges across banks";

    setResult(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-violet-400" />
            <h1 className="text-2xl font-bold text-white">Loan Eligibility Calculator</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Income (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    className="pl-10 w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-400"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({...formData, monthlyIncome: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Expenses (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    className="pl-10 w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-400"
                    value={formData.monthlyExpenses}
                    onChange={(e) => setFormData({...formData, monthlyExpenses: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CIBIL Score (300-850)
                </label>
                <input
                  type="range"
                  min="300"
                  max="850"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500"
                  value={formData.creditScore}
                  onChange={(e) => setFormData({...formData, creditScore: Number(e.target.value)})}
                />
                <span className="text-sm text-gray-400">{formData.creditScore}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Years of Employment
                </label>
                <input
                  type="number"
                  className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-400"
                  value={formData.employmentYears}
                  onChange={(e) => setFormData({...formData, employmentYears: Number(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Existing Monthly Loan Payments (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    className="pl-10 w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-400"
                    value={formData.existingLoans}
                    onChange={(e) => setFormData({...formData, existingLoans: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type of Loan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                      formData.loanType === 'home' 
                        ? 'bg-violet-500/20 border-violet-500 text-violet-300' 
                        : 'border-gray-600 text-gray-400 hover:border-violet-500 hover:text-violet-300'
                    }`}
                    onClick={() => setFormData({...formData, loanType: 'home'})}
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </button>
                  <button
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                      formData.loanType === 'car' 
                        ? 'bg-violet-500/20 border-violet-500 text-violet-300' 
                        : 'border-gray-600 text-gray-400 hover:border-violet-500 hover:text-violet-300'
                    }`}
                    onClick={() => setFormData({...formData, loanType: 'car'})}
                  >
                    <Car className="w-5 h-5" />
                    <span>Car</span>
                  </button>
                  <button
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                      formData.loanType === 'education' 
                        ? 'bg-violet-500/20 border-violet-500 text-violet-300' 
                        : 'border-gray-600 text-gray-400 hover:border-violet-500 hover:text-violet-300'
                    }`}
                    onClick={() => setFormData({...formData, loanType: 'education'})}
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Education</span>
                  </button>
                  <button
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-300 ${
                      formData.loanType === 'personal' 
                        ? 'bg-violet-500/20 border-violet-500 text-violet-300' 
                        : 'border-gray-600 text-gray-400 hover:border-violet-500 hover:text-violet-300'
                    }`}
                    onClick={() => setFormData({...formData, loanType: 'personal'})}
                  >
                    <Briefcase className="w-5 h-5" />
                    <span>Personal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={calculateEligibility}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium
                transition-all duration-300 transform hover:scale-[1.02] hover:from-violet-500 hover:to-purple-500
                active:scale-[0.98] active:from-violet-700 active:to-purple-700
                focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900
                shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
            >
              Calculate Eligibility
            </button>
          </div>

          {result && (
            <div className="mt-6 p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Eligibility Results</h2>
              <pre className="whitespace-pre-wrap text-gray-300 font-sans">
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanEligibility;
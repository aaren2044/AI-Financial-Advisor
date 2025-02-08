import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, FileText, HelpCircle } from 'lucide-react';

const LoanEligibility = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [existingEMI, setExistingEMI] = useState('');
  const [loanType, setLoanType] = useState('personal');
  const [eligibility, setEligibility] = useState(null);

  const calculateEligibility = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const monthlyExpenses = parseFloat(expenses) || 0;
    const emi = parseFloat(existingEMI) || 0;

    const disposableIncome = income - monthlyExpenses - emi;
    let maxEMI = disposableIncome * 0.5; // 50% of disposable income

    let interestRate;
    let tenure;
    switch (loanType) {
      case 'personal':
        interestRate = 0.12; // 12% p.a.
        tenure = 36; // 3 years
        break;
      case 'business':
        interestRate = 0.15; // 15% p.a.
        tenure = 60; // 5 years
        break;
      case 'education':
        interestRate = 0.09; // 9% p.a.
        tenure = 84; // 7 years
        break;
      default:
        interestRate = 0.12;
        tenure = 36;
    }

    const monthlyRate = interestRate / 12;
    const totalPayments = tenure;
    
    // PMT formula: maxEMI = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const maxLoanAmount = (maxEMI * (Math.pow(1 + monthlyRate, totalPayments) - 1)) / 
                         (monthlyRate * Math.pow(1 + monthlyRate, totalPayments));

    setEligibility({
      maxAmount: Math.round(maxLoanAmount),
      maxEMI: Math.round(maxEMI),
      interestRate: interestRate * 100,
      tenure: tenure / 12
    });
  };

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl">
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Loan Eligibility Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Monthly Income (₹)
            </label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your monthly income"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Monthly Expenses (₹)
            </label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your monthly expenses"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Existing EMI (₹)
            </label>
            <input
              type="number"
              value={existingEMI}
              onChange={(e) => setExistingEMI(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter existing EMI if any"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Loan Type
            </label>
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="personal">Personal Loan</option>
              <option value="business">Business Loan</option>
              <option value="education">Education Loan</option>
            </select>
          </div>

          <button
            onClick={calculateEligibility}
            className="w-full bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors"
          >
            Calculate Eligibility
          </button>
        </div>

        {eligibility && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-700/50 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Loan Eligibility Results</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Maximum Loan Amount</p>
                <p className="text-2xl font-bold text-green-400">
                  ₹{eligibility.maxAmount.toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-gray-400">Maximum EMI</p>
                <p className="text-xl font-semibold text-purple-400">
                  ₹{eligibility.maxEMI.toLocaleString()}/month
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Interest Rate</p>
                  <p className="text-lg font-medium text-white">
                    {eligibility.interestRate}% p.a.
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-400">Loan Tenure</p>
                  <p className="text-lg font-medium text-white">
                    {eligibility.tenure} years
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LoanEligibility;
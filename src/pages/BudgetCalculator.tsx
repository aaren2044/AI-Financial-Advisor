import React, { useState } from 'react';
import { Calculator, Target, Wallet, PiggyBank, Calendar, TrendingUp, Milestone } from 'lucide-react';

interface BudgetGoal {
  goalName: string;
  targetAmount: string;
  timeframe: string;
  currentSavings: string;
  monthlyIncome: string;
  monthlyExpenses: string;
}

interface SavingsProgress {
  amount: number;
  date: string;
}

function BudgetCalculator() {
  const [formData, setFormData] = useState<BudgetGoal>({
    goalName: '',
    targetAmount: '',
    timeframe: '',
    currentSavings: '',
    monthlyIncome: '',
    monthlyExpenses: ''
  });

  const [savingsHistory, setSavingsHistory] = useState<SavingsProgress[]>([]);
  const [newSavingsAmount, setNewSavingsAmount] = useState('');

  const [calculatedBudget, setCalculatedBudget] = useState<{
    dailySavingsNeeded: number;
    monthlySavingsNeeded: number;
    feasible: boolean;
  } | null>(null);

  const formatIndianRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const targetAmount = parseFloat(formData.targetAmount) || 0;
    const currentSavings = parseFloat(formData.currentSavings) || 0;
    const monthlyIncome = parseFloat(formData.monthlyIncome) || 0;
    const monthlyExpenses = parseFloat(formData.monthlyExpenses) || 0;
    const timeframe = parseFloat(formData.timeframe) || 1;
    
    const remainingAmount = targetAmount - currentSavings;
    const monthlyAvailable = monthlyIncome - monthlyExpenses;
    const monthlyNeeded = remainingAmount / timeframe;
    const dailyNeeded = monthlyNeeded / 30;
    
    setCalculatedBudget({
      dailySavingsNeeded: dailyNeeded,
      monthlySavingsNeeded: monthlyNeeded,
      feasible: monthlyAvailable >= monthlyNeeded
    });

    // Initialize savings history with current savings
    if (currentSavings > 0) {
      setSavingsHistory([{
        amount: currentSavings,
        date: new Date().toISOString().split('T')[0]
      }]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSavings = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newSavingsAmount);
    if (amount > 0) {
      setSavingsHistory(prev => [...prev, {
        amount,
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewSavingsAmount('');
    }
  };

  const getTotalSavings = () => {
    return savingsHistory.reduce((total, entry) => total + entry.amount, 0);
  };

  const getProgress = () => {
    const targetAmount = parseFloat(formData.targetAmount) || 0;
    const totalSaved = getTotalSavings();
    return (totalSaved / targetAmount) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Budget Goal Tracker
            </h1>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    Goal Name
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="text"
                      name="goalName"
                      value={formData.goalName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="e.g., New Car"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    Target Amount (₹)
                  </label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="number"
                      name="targetAmount"
                      value={formData.targetAmount}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Target Amount in ₹"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    Timeframe (months)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="number"
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Number of months"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    Current Savings (₹)
                  </label>
                  <div className="relative">
                    <PiggyBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="number"
                      name="currentSavings"
                      value={formData.currentSavings}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Current savings in ₹"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    Monthly Income (₹)
                  </label>
                  <div className="relative">
                    <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="number"
                      name="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Monthly income in ₹"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-300">
                    Monthly Expenses (₹)
                  </label>
                  <div className="relative">
                    <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="number"
                      name="monthlyExpenses"
                      value={formData.monthlyExpenses}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Monthly expenses in ₹"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:ring-purple-500/50 transform hover:scale-[1.02] transition-all duration-200"
              >
                Calculate Budget Plan
              </button>
            </form>

            {calculatedBudget && (
              <>
                <div className="mt-8 p-6 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 text-purple-300">Your Budget Plan</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-purple-300">Daily Savings Needed</p>
                      <p className="text-2xl font-bold">{formatIndianRupees(calculatedBudget.dailySavingsNeeded)}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-sm text-purple-300">Monthly Savings Needed</p>
                      <p className="text-2xl font-bold">{formatIndianRupees(calculatedBudget.monthlySavingsNeeded)}</p>
                    </div>
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${calculatedBudget.feasible ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {calculatedBudget.feasible ? (
                      <p className="font-semibold">✨ Your goal appears achievable with your current income and expenses!</p>
                    ) : (
                      <p className="font-semibold">⚠️ You may need to increase your income or reduce expenses to reach this goal.</p>
                    )}
                  </div>
                </div>

                <div className="mt-8 p-6 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 text-purple-300">Savings Progress</h2>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-purple-300 mb-2">
                      <span>Progress: {getProgress().toFixed(1)}%</span>
                      <span>{formatIndianRupees(getTotalSavings())} / {formatIndianRupees(parseFloat(formData.targetAmount) || 0)}</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                        style={{ width: `${Math.min(getProgress(), 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Add New Savings Form */}
                  <form onSubmit={addSavings} className="mb-6">
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                        <input
                          type="number"
                          value={newSavingsAmount}
                          onChange={(e) => setNewSavingsAmount(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Enter amount saved"
                          min="0"
                          step="100"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:ring-purple-500/50 transform hover:scale-[1.02] transition-all duration-200"
                      >
                        Add Savings
                      </button>
                    </div>
                  </form>

                  {/* Savings History */}
                  {savingsHistory.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-300">Savings History</h3>
                      <div className="space-y-2">
                        {savingsHistory.map((entry, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                            <span className="text-purple-300">{entry.date}</span>
                            <span className="font-semibold">{formatIndianRupees(entry.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetCalculator;
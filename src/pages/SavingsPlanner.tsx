import React, { useState } from 'react';
import { Calculator, PiggyBank, HelpCircle, ArrowRight } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { getInvestmentAdvice } from '../lib/gemini';
type FormData = {
  monthlyIncome: number;
  monthlyExpenses: number;
  savingGoal: number;
  timeframe: number;
  savingMethod: string;
  emergencyFund: number;
};

function SavingsPlanner() {
  const [formData, setFormData] = useState<FormData>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingGoal: 0,
    timeframe: 12,
    savingMethod: 'fixed',
    emergencyFund: 20,
  });
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'savingMethod' ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const advice = await getInvestmentAdvice(formData);
      setAiAdvice(advice);
    } catch (error) {
      toast.error('Failed to get investment advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <PiggyBank className="w-10 h-10 mr-3" />
          <h1 className="text-4xl font-bold">Smart Savings Planner</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Income (₹)</label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                    min="0"
                    step="1000"
                    placeholder="e.g., 50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Expenses (₹)</label>
                  <input
                    type="number"
                    name="monthlyExpenses"
                    value={formData.monthlyExpenses}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                    min="0"
                    step="1000"
                    placeholder="e.g., 30000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Saving Goal (₹)</label>
                  <input
                    type="number"
                    name="savingGoal"
                    value={formData.savingGoal}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                    min="0"
                    step="10000"
                    placeholder="e.g., 500000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Timeframe (months)</label>
                  <input
                    type="number"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                    min="1"
                    max="360"
                    placeholder="e.g., 12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Saving Method</label>
                  <select
                    name="savingMethod"
                    value={formData.savingMethod}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="fixed">Fixed Monthly Amount</option>
                    <option value="percentage">Percentage of Income</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Emergency Fund (%)</label>
                  <input
                    type="number"
                    name="emergencyFund"
                    value={formData.emergencyFund}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                    min="0"
                    max="100"
                    placeholder="e.g., 20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Getting AI Recommendations...'
                ) : (
                  <>
                    Get Investment Advice
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <div className="flex items-center mb-4">
              <Calculator className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-semibold">AI Investment Recommendations</h2>
            </div>
            
            {aiAdvice ? (
              <div className="prose prose-invert">
                <div className="whitespace-pre-wrap">{aiAdvice}</div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center text-gray-400">
                <HelpCircle className="w-12 h-12 mb-4" />
                <p>Fill out the form and submit to get personalized AI-powered investment recommendations</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default SavingsPlanner;
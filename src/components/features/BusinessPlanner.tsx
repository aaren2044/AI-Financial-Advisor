import React, { useState } from 'react';
import { Building2, LineChart, Target } from 'lucide-react';
import { features } from '../../services/api';

const BusinessPlanner = () => {
  const [businessType, setBusinessType] = useState('');
  const [investment, setInvestment] = useState('');
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = async () => {
    try {
      const response = await features.businessPlanning.generatePlan({
        businessType,
        investment: parseFloat(investment)
      });
      setPlan(response.data);
    } catch (error) {
      console.error('Error generating business plan:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-4">Business Planner</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Business Type
          </label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
          >
            <option value="">Select Business Type</option>
            <option value="retail">Retail Shop</option>
            <option value="handicraft">Handicraft Business</option>
            <option value="food">Food Business</option>
            <option value="service">Service Business</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Initial Investment (₹)
          </label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
            placeholder="Enter amount"
          />
        </div>

        <button
          onClick={generatePlan}
          className="w-full bg-purple-600 text-white rounded-lg px-4 py-2"
        >
          Generate Business Plan
        </button>

        {plan && (
          <div className="mt-6 space-y-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-2">
                Business Overview
              </h4>
              <p className="text-gray-300">{plan.overview}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <Target className="text-purple-400 mb-2" size={24} />
                <h5 className="text-white font-medium">Expected ROI</h5>
                <p className="text-purple-400 text-lg font-bold">
                  {plan.roi}%
                </p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <LineChart className="text-purple-400 mb-2" size={24} />
                <h5 className="text-white font-medium">Break-even Period</h5>
                <p className="text-purple-400 text-lg font-bold">
                  {plan.breakEvenPeriod} months
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessPlanner;
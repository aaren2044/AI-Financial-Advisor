import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBe2nbxp1NYpt5BTD0yiIkPfXCYvQ-GHHo');

export async function getInvestmentAdvice(savingsData: {
  monthlyIncome: number;
  monthlyExpenses: number;
  savingGoal: number;
  timeframe: number;
  savingMethod: string;
  emergencyFund: number;
}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `As a financial advisor in India, provide detailed investment recommendations for the following scenario:
    - Monthly Income: ₹${savingsData.monthlyIncome}
    - Monthly Expenses: ₹${savingsData.monthlyExpenses}
    - Saving Goal: ₹${savingsData.savingGoal}
    - Timeframe: ${savingsData.timeframe} months
    - Saving Method: ${savingsData.savingMethod}
    - Emergency Fund: ${savingsData.emergencyFund}%

    Please provide specific recommendations for:
    1. Best mutual funds and SIP (Systematic Investment Plan) options available in India
    2. Indian stock market investment strategy (including Nifty and Sensex insights)
    3. Risk assessment based on Indian market conditions
    4. Portfolio diversification across Indian equity, debt, and gold
    5. Monthly saving breakdown in Indian Rupees
    
    Keep the response concise but informative, focusing on Indian investment options.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting investment advice:', error);
    throw new Error('Failed to get investment recommendations');
  }
}
import { Module } from '../types';

export const modules: Module[] = [
  {
    id: 1,
    title: "Understanding Stock Markets",
    description: "Learn the fundamentals of stock markets and how they work",
    videoUrl: "https://www.youtube.com/watch?v=p7HKvqRI_Bo",
    quiz: {
      questions: [
        {
          id: 1,
          text: "What is a stock market?",
          options: [
            "A place to buy groceries",
            "A marketplace for trading company shares",
            "A type of bank",
            "A government institution"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "What is market capitalization?",
          options: [
            "The total number of employees in a company",
            "The company's annual revenue",
            "The total value of a company's shares",
            "The company's profit margin"
          ],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 2,
    title: "Investment Strategies",
    description: "Explore different investment strategies and portfolio management",
    videoUrl: "https://www.youtube.com/watch?v=f5j9v9dfinQ",
    quiz: {
      questions: [
        {
          id: 1,
          text: "What is diversification?",
          options: [
            "Investing all money in one stock",
            "Spreading investments across different assets",
            "Keeping all money in cash",
            "Taking high-risk investments only"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "What is dollar-cost averaging?",
          options: [
            "Buying stocks all at once",
            "Investing fixed amounts regularly",
            "Trading daily",
            "Borrowing money to invest"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 3,
    title: "Risk Management",
    description: "Learn how to manage and mitigate investment risks",
    videoUrl: "https://www.youtube.com/watch?v=TI6O7vUm0Ec",
    quiz: {
      questions: [
        {
          id: 1,
          text: "What is risk tolerance?",
          options: [
            "The ability to handle investment losses",
            "The speed of market trading",
            "The minimum investment amount",
            "The maximum profit potential"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          text: "What is a stop-loss order?",
          options: [
            "An order to buy stocks",
            "An order to sell stocks at a specific profit",
            "An order to sell stocks if they fall below a certain price",
            "A market manipulation technique"
          ],
          correctAnswer: 2
        }
      ]
    }
  }
];
import { Module } from '../types';

export const modules: Module[] = [
  {
    id: 1,
    title: "Budgeting Basics",
    description: "Learn the fundamentals of creating and maintaining a personal budget",
    videoUrl: "https://www.youtube.com/embed/HQzoZfc3GwQ",
    quiz: {
      questions: [
        {
          id: 1,
          text: "What is the 50/30/20 rule in budgeting?",
          options: [
            "50% needs, 30% wants, 20% savings",
            "50% savings, 30% needs, 20% wants",
            "50% wants, 30% savings, 20% needs",
            "50% needs, 30% savings, 20% wants"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          text: "Which of these is considered a fixed expense?",
          options: [
            "Dining out",
            "Monthly rent",
            "Entertainment",
            "Shopping"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          text: "What should be your first step in creating a budget?",
          options: [
            "Start saving money",
            "Calculate your total income",
            "Cut all expenses",
            "Open a new bank account"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "What is an emergency fund?",
          options: [
            "Money for vacations",
            "Savings for retirement",
            "3-6 months of living expenses saved",
            "Investment in stocks"
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          text: "Which budgeting method tracks every penny spent?",
          options: [
            "Zero-based budgeting",
            "Envelope system",
            "50/30/20 rule",
            "Pay yourself first"
          ],
          correctAnswer: 0
        },
        {
          id: 6,
          text: "What is discretionary income?",
          options: [
            "Total income before taxes",
            "Money left after paying taxes",
            "Money left after paying all necessities",
            "Money borrowed from credit cards"
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          text: "Which expense is typically the largest in a household budget?",
          options: [
            "Food",
            "Housing",
            "Transportation",
            "Entertainment"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          text: "What is a zero-based budget?",
          options: [
            "Having zero debt",
            "Spending zero money",
            "Assigning every dollar a purpose",
            "Saving zero money"
          ],
          correctAnswer: 2
        },
        {
          id: 9,
          text: "How often should you review your budget?",
          options: [
            "Once a year",
            "Monthly",
            "Weekly",
            "Never"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "What is the envelope system?",
          options: [
            "Saving money in envelopes",
            "Allocating cash into categories",
            "Mailing bills in envelopes",
            "Filing receipts in envelopes"
          ],
          correctAnswer: 1
        },
        {
          id: 11,
          text: "Which is NOT a common budgeting category?",
          options: [
            "Housing",
            "Transportation",
            "Lottery tickets",
            "Utilities"
          ],
          correctAnswer: 2
        },
        {
          id: 12,
          text: "What percentage of income should typically go to housing?",
          options: [
            "10-20%",
            "20-25%",
            "25-30%",
            "30-35%"
          ],
          correctAnswer: 2
        },
        {
          id: 13,
          text: "What is lifestyle inflation?",
          options: [
            "Rising prices of goods",
            "Increasing spending as income rises",
            "High cost of living",
            "Inflation rate in luxury goods"
          ],
          correctAnswer: 1
        },
        {
          id: 14,
          text: "Which tool is most helpful for tracking expenses?",
          options: [
            "Social media",
            "Budgeting app or spreadsheet",
            "Calendar",
            "Notes app"
          ],
          correctAnswer: 1
        },
        {
          id: 15,
          text: "What is the purpose of a budget?",
          options: [
            "To restrict spending completely",
            "To make you feel guilty about spending",
            "To track and plan money usage",
            "To impress others"
          ],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 2,
    title: "Saving Strategies",
    description: "Discover effective methods to save money and build wealth",
    videoUrl: "https://www.youtube.com/embed/kKZh1VLsUeY",
    quiz: {
      questions: [
        {
          id: 1,
          text: "What is compound interest?",
          options: [
            "Interest earned only on the principal amount",
            "Interest earned on both principal and accumulated interest",
            "A fixed interest rate that never changes",
            "Interest paid to lenders only"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "What is the rule of 72?",
          options: [
            "A retirement age requirement",
            "A formula to estimate investment doubling time",
            "A credit score threshold",
            "A tax calculation method"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          text: "Which saving strategy is most effective for short-term goals?",
          options: [
            "High-yield savings account",
            "Stock market investment",
            "Real estate investment",
            "Cryptocurrency"
          ],
          correctAnswer: 0
        },
        {
          id: 4,
          text: "What is dollar-cost averaging?",
          options: [
            "Converting dollars to foreign currency",
            "Investing fixed amounts regularly",
            "Calculating average expenses",
            "Paying bills in dollars"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          text: "Which account typically offers the highest interest rate?",
          options: [
            "Checking account",
            "Basic savings account",
            "Certificate of Deposit (CD)",
            "Money market account"
          ],
          correctAnswer: 2
        },
        {
          id: 6,
          text: "What is a good monthly savings goal percentage?",
          options: [
            "5% of income",
            "10% of income",
            "15-20% of income",
            "50% of income"
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          text: "What is the purpose of an emergency fund?",
          options: [
            "For vacation expenses",
            "For unexpected expenses",
            "For retirement",
            "For regular bills"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          text: "Which is NOT a good saving strategy?",
          options: [
            "Automatic transfers to savings",
            "Keeping all money in cash",
            "Setting specific goals",
            "Tracking expenses"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          text: "What is a CD ladder?",
          options: [
            "A tool for organizing CDs",
            "A strategy of staggering CD maturity dates",
            "A type of music collection",
            "A savings account feature"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "What is the main benefit of automatic savings?",
          options: [
            "Higher interest rates",
            "Removes temptation to spend",
            "Lower bank fees",
            "Better customer service"
          ],
          correctAnswer: 1
        },
        {
          id: 11,
          text: "What is a sinking fund?",
          options: [
            "A failed investment",
            "A savings account for a specific future expense",
            "A type of debt",
            "A retirement account"
          ],
          correctAnswer: 1
        },
        {
          id: 12,
          text: "Which factor most affects savings growth?",
          options: [
            "Bank location",
            "Account type",
            "Time in the account",
            "Monthly fees"
          ],
          correctAnswer: 2
        },
        {
          id: 13,
          text: "What is liquidity in savings?",
          options: [
            "The amount of water in a bank",
            "How easily money can be accessed",
            "The bank's profit",
            "Interest rate fluctuation"
          ],
          correctAnswer: 1
        },
        {
          id: 14,
          text: "What is the primary purpose of a high-yield savings account?",
          options: [
            "To earn higher interest than traditional savings",
            "To protect against theft",
            "To avoid taxes",
            "To get bank perks"
          ],
          correctAnswer: 0
        },
        {
          id: 15,
          text: "Which saving method is best for long-term goals?",
          options: [
            "Keeping cash at home",
            "Regular checking account",
            "Investment accounts",
            "Short-term CDs"
          ],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 3,
    title: "Investment Fundamentals",
    description: "Understanding basic investment concepts and strategies",
    videoUrl: "https://www.youtube.com/embed/gFQNPmLKj1k",
    quiz: {
      questions: [
        {
          id: 1,
          text: "What is diversification?",
          options: [
            "Investing all money in one stock",
            "Spreading investments across different assets",
            "Only investing in bonds",
            "Keeping all money in savings"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "What is a stock?",
          options: [
            "A loan to a company",
            "Ownership share in a company",
            "A government bond",
            "A savings account"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          text: "What is a bond?",
          options: [
            "Ownership in a company",
            "A loan to an entity",
            "A type of stock",
            "A savings account"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "What is an ETF?",
          options: [
            "Electronic Transfer Fund",
            "Exchange-Traded Fund",
            "Extra Tax Fee",
            "Extended Time Finance"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          text: "What is market capitalization?",
          options: [
            "The number of employees in a company",
            "Total value of a company's shares",
            "Company's profit",
            "Stock price"
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          text: "What is a mutual fund?",
          options: [
            "Individual stock",
            "Pooled investment vehicle",
            "Savings account",
            "Government bond"
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          text: "What is asset allocation?",
          options: [
            "Buying stocks",
            "Distribution of investments across asset classes",
            "Selling bonds",
            "Bank transfers"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          text: "What is a dividend?",
          options: [
            "Company debt",
            "Stock price",
            "Distribution of profits to shareholders",
            "Investment loss"
          ],
          correctAnswer: 2
        },
        {
          id: 9,
          text: "What is a bear market?",
          options: [
            "Rising market",
            "Falling market",
            "Stable market",
            "New market"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "What is a bull market?",
          options: [
            "Rising market",
            "Falling market",
            "Stable market",
            "New market"
          ],
          correctAnswer: 0
        },
        {
          id: 11,
          text: "What is volatility?",
          options: [
            "Guaranteed returns",
            "Price stability",
            "Price fluctuation",
            "Fixed interest"
          ],
          correctAnswer: 2
        },
        {
          id: 12,
          text: "What is a portfolio?",
          options: [
            "Single stock",
            "Collection of investments",
            "Bank account",
            "Credit card"
          ],
          correctAnswer: 1
        },
        {
          id: 13,
          text: "What is risk tolerance?",
          options: [
            "Amount of money invested",
            "Ability to handle investment losses",
            "Investment returns",
            "Market timing"
          ],
          correctAnswer: 1
        },
        {
          id: 14,
          text: "What is a P/E ratio?",
          options: [
            "Profit/Expense ratio",
            "Price/Earnings ratio",
            "Portfolio/Equity ratio",
            "Personal/Enterprise ratio"
          ],
          correctAnswer: 1
        },
        {
          id: 15,
          text: "What is compound growth?",
          options: [
            "Linear growth",
            "Growth on growth",
            "Fixed growth",
            "Negative growth"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 4,
    title: "Credit Management",
    description: "Learn how to manage credit and maintain a good credit score",
    videoUrl: "https://www.youtube.com/embed/Vn9ounAgG3w",
    quiz: {
      questions: [
        {
          id: 1,
          text: "What factor has the biggest impact on your credit score?",
          options: [
            "Payment history",
            "Credit utilization",
            "Length of credit history",
            "Types of credit"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          text: "What is a good credit utilization ratio?",
          options: [
            "Below 30%",
            "50%",
            "75%",
            "100%"
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          text: "What is a credit report?",
          options: [
            "Monthly bill",
            "Bank statement",
            "Record of credit history",
            "Investment report"
          ],
          correctAnswer: 2
        },
        {
          id: 4,
          text: "How often can you get a free credit report?",
          options: [
            "Monthly",
            "Quarterly",
            "Annually",
            "Weekly"
          ],
          correctAnswer: 2
        },
        {
          id: 5,
          text: "What is a good credit score range?",
          options: [
            "300-500",
            "500-600",
            "600-700",
            "700-850"
          ],
          correctAnswer: 3
        },
        {
          id: 6,
          text: "What is a hard inquiry?",
          options: [
            "Checking your own credit",
            "Credit check for loan application",
            "Credit card statement",
            "Bank statement"
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          text: "How long do most negative items stay on your credit report?",
          options: [
            "1 year",
            "4 years",
            "7 years",
            "10 years"
          ],
          correctAnswer: 2
        },
        {
          id: 8,
          text: "What is a secured credit card?",
          options: [
            "Card with high limit",
            "Card backed by deposit",
            "Card with rewards",
            "Card with no fees"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          text: "What is APR?",
          options: [
            "Annual Percentage Rate",
            "Average Payment Rate",
            "Applied Payment Record",
            "Annual Payment Record"
          ],
          correctAnswer: 0
        },
        {
          id: 10,
          text: "What is a balance transfer?",
          options: [
            "Monthly payment",
            "Moving debt between cards",
            "Credit limit increase",
            "Cash advance"
          ],
          correctAnswer: 1
        },
        {
          id: 11,
          text: "What is a credit freeze?",
          options: [
            "Closing credit card",
            "Restricting access to credit report",
            "Stopping payments",
            "Lowering credit limit"
          ],
          correctAnswer: 1
        },
        {
          id: 12,
          text: "What is a grace period?",
          options: [
            "Late payment allowance",
            "Time before interest charges",
            "Credit limit extension",
            "Payment due date"
          ],
          correctAnswer: 1
        },
        {
          id: 13,
          text: "What is a co-signer?",
          options: [
            "Joint account holder",
            "Person responsible if primary borrower defaults",
            "Credit card company",
            "Bank manager"
          ],
          correctAnswer: 1
        },
        {
          id: 14,
          text: "What is a charge-off?",
          options: [
            "Paid debt",
            "Debt written off as uncollectible",
            "Credit limit",
            "Monthly payment"
          ],
          correctAnswer: 1
        },
        {
          id: 15,
          text: "What is a credit mix?",
          options: [
            "Credit score",
            "Different types of credit accounts",
            "Credit limit",
            "Credit report"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 5,
    title: "Tax Planning",
    description: "Understanding basic tax concepts and planning strategies",
    videoUrl: "https://www.youtube.com/embed/7Qtr_vA3Prw",
    quiz: {
      questions: [
        {
          id: 1,
          text: "What is the difference between tax deduction and tax credit?",
          options: [
            "They are the same thing",
            "Tax deduction reduces taxable income, credit reduces tax directly",
            "Tax credit reduces taxable income, deduction reduces tax directly",
            "Neither affects your tax liability"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "What is adjusted gross income (AGI)?",
          options: [
            "Total income",
            "Income after all deductions",
            "Income minus specific adjustments",
            "Net income"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          text: "What is a tax bracket?",
          options: [
            "Fixed tax rate",
            "Range of income taxed at specific rate",
            "Tax refund amount",
            "Tax credit"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "What is a W-2 form?",
          options: [
            "Tax return",
            "Wage and tax statement",
            "Investment record",
            "Business license"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          text: "What is a 1099 form?",
          options: [
            "Employment contract",
            "Independent contractor income",
            "Tax return",
            "Business expense"
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          text: "What is itemized deduction?",
          options: [
            "Standard deduction",
            "Listing specific tax-deductible expenses",
            "Tax credit",
            "Tax bracket"
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          text: "What is capital gains tax?",
          options: [
            "Income tax",
            "Tax on investment profits",
            "Property tax",
            "Sales tax"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          text: "What is tax withholding?",
          options: [
            "Tax refund",
            "Money employer withholds for taxes",
            "Tax credit",
            "Tax deduction"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          text: "What is a tax year?",
          options: [
            "Calendar year",
            "Fiscal period for tax purposes",
            "Filing deadline",
            "Extension period"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "What is estimated tax?",
          options: [
            "Final tax bill",
            "Quarterly tax payments",
            "Tax refund",
            "Tax credit"
          ],
          correctAnswer: 1
        },
        {
          id: 11,
          text: "What is tax-deferred growth?",
          options: [
            "Tax-free income",
            "Postponing taxes on earnings",
            "Tax credit",
            "Tax deduction"
          ],
          correctAnswer: 1
        },
        {
          id: 12,
          text: "What is the standard deduction?",
          options: [
            "Itemized deduction",
            "Fixed amount reducing taxable income",
            "Tax credit",
            "Tax bracket"
          ],
          correctAnswer: 1
        },
        {
          id: 13,
          text: "What is tax liability?",
          options: [
            "Tax refund",
            "Amount of tax owed",
            "Tax credit",
            "Tax deduction"
          ],
          correctAnswer: 1
        },
        {
          id: 14,
          text: "What is a tax exemption?",
          options: [
            "Tax credit",
            "Income excluded from taxation",
            "Tax deduction",
            "Tax bracket"
          ],
          correctAnswer: 1
        },
        {
          id: 15,
          text: "What is tax basis?",
          options: [
            "Tax rate",
            "Original cost of asset for tax purposes",
            "Tax credit",
            "Tax deduction"
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 6,
    title: "Retirement Planning",
    description: "Planning for a secure financial future",
    videoUrl: "https://www.youtube.com/embed/ZuxQzI5tC5g",
    quiz: {
      questions: [
        {
          id: 1,
          text: "What is a 401(k)?",
          options: [
            "A type of savings account",
            "A retirement investment account offered by employers",
            "A government bond",
            "A type of credit card"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "What is an IRA?",
          options: [
            "International Revenue Account",
            "Individual Retirement Account",
            "Investment Return Analysis",
            "Internal Rate Assessment"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          text: "What is a Roth IRA?",
          options: [
            "Pre-tax retirement account",
            "After-tax retirement account",
            "Government pension",
            "Employer pension"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "What is Social Security?",
          options: [
            "Private insurance",
            "Government retirement benefit",
            "Investment account",
            "Savings account"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          text: "What is a pension?",
          options: [
            "Personal savings",
            "Employer-sponsored retirement plan",
            "Government benefit",
            "Investment account"
          ],
          correctAnswer: 1
        },
        {
          id: 6,
          text: "What is the retirement age for full Social Security benefits?",
          options: [
            "62",
            "65",
            "67",
            "70"
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          text: "What is a required minimum distribution (RMD)?",
          options: [
            "Maximum contribution",
            "Required withdrawal from retirement accounts",
            "Investment return",
            "Social Security payment"
          ],
          correctAnswer: 1
        },
        {
          id: 8,
          text: "What is an annuity?",
          options: [
            "One-time payment",
            "Insurance product providing regular income",
            "Investment account",
            "Savings account"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          text: "What is a target date fund?",
          options: [
            "Savings account",
            "Investment that adjusts with retirement date",
            "Fixed income fund",
            "Stock fund"
          ],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "What is a catch-up contribution?",
          options: [
            "Regular contribution",
            "Additional allowed contribution for older workers",
            "Employer match",
            "Tax penalty"
          ],
          correctAnswer: 1
        },
        {
          id: 11,
          text: "What is vesting?",
          options: [
            "Investment choice",
            "Ownership rights to employer contributions",
            "Withdrawal penalty",
            "Tax benefit"
          ],
          correctAnswer: 1
        },
        {
          id: 12,
          text: "What is a rollover?",
          options: [
            "Investment loss",
            "Moving retirement funds between accounts",
            "Tax penalty",
            "Contribution limit"
          ],
          correctAnswer: 1
        },
        {
          id: 13,
          text: "What is the 4% rule?",
          options: [
            "Investment return",
            "Safe withdrawal rate in retirement",
            "Contribution rate",
            "Interest rate"
          ],
          correctAnswer: 1
        },
        {
          id: 14,
          text: "What is a beneficiary?",
          options: [
            "Account holder",
            "Person who inherits retirement accounts",
            "Financial advisor",
            "Employer"
          ],
          correctAnswer: 1
        },
        {
          id: 15,
          text: "What is asset allocation in retirement?",
          options: [
            "Spending plan",
            "Distribution of investments based on age/goals",
            "Social Security benefit",
            "Tax strategy"
          ],
          correctAnswer: 1
        }
      ]
    }
  }
];
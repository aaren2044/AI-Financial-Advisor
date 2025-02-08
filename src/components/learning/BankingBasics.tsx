import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Shield, CreditCard, Smartphone, AlertTriangle, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const bankingModules = [
  {
    id: 'account-types',
    title: 'Types of Bank Accounts',
    description: 'Learn about savings, current, and fixed deposit accounts',
    duration: '30 mins',
    icon: Building2
  },
  {
    id: 'security',
    title: 'Banking Security',
    description: 'Understand PIN, passwords, and secure banking practices',
    duration: '45 mins',
    icon: Shield
  },
  {
    id: 'cards',
    title: 'ATM and Debit Cards',
    description: 'How to use cards safely and manage transactions',
    duration: '40 mins',
    icon: CreditCard
  },
  {
    id: 'mobile-banking',
    title: 'Mobile Banking',
    description: 'Using banking apps and UPI payments securely',
    duration: '35 mins',
    icon: Smartphone
  },
  {
    id: 'fraud-prevention',
    title: 'Fraud Prevention',
    description: 'Identify and avoid common banking scams',
    duration: '50 mins',
    icon: AlertTriangle
  }
];

const BankingBasics = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">{t('bankingBasics')}</h2>
      
      <div className="space-y-4">
        {bankingModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <module.icon className="text-purple-400" size={24} />
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                </div>
                <p className="text-gray-400 mt-2">{module.description}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <span className="text-sm text-gray-400">
                    Duration: {module.duration}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Start Module
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BankingBasics;
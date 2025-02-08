import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const TransactionSecurity = () => {
  const securityChecks = [
    {
      type: 'safe',
      title: 'Official Bank Apps',
      description: 'Use only official banking applications',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      type: 'warning',
      title: 'Public Networks',
      description: 'Avoid banking on public Wi-Fi networks',
      icon: AlertTriangle,
      color: 'text-yellow-400'
    },
    {
      type: 'danger',
      title: 'Suspicious Links',
      description: 'Never click on unknown banking links',
      icon: XCircle,
      color: 'text-red-400'
    }
  ];

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Transaction Security</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {securityChecks.map((check, index) => (
          <div
            key={index}
            className="bg-gray-700/50 rounded-lg p-4"
          >
            <check.icon className={check.color} size={24} />
            <h3 className="text-lg font-semibold text-white mt-3">{check.title}</h3>
            <p className="text-gray-400 mt-2">{check.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Checklist</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-gray-300">Verify recipient details before transfer</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-gray-300">Enable transaction notifications</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-gray-300">Set daily transaction limits</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-gray-300">Use secure payment gateways</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSecurity;
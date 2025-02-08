import React, { useState } from 'react';
import { Shield, Lock, Fingerprint, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SecurityCenter = () => {
  const [securityScore, setSecurityScore] = useState(75);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const securityChecks = [
    {
      id: 'password',
      title: 'Strong Password',
      status: 'complete',
      description: 'Your password meets security requirements'
    },
    {
      id: '2fa',
      title: 'Two-Factor Authentication',
      status: twoFactorEnabled ? 'complete' : 'pending',
      description: 'Add an extra layer of security to your account'
    },
    {
      id: 'biometric',
      title: 'Biometric Authentication',
      status: biometricEnabled ? 'complete' : 'pending',
      description: 'Use fingerprint or face recognition for secure access'
    }
  ];

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    setSecurityScore(twoFactorEnabled ? securityScore - 10 : securityScore + 10);
  };

  const toggleBiometric = () => {
    setBiometricEnabled(!biometricEnabled);
    setSecurityScore(biometricEnabled ? securityScore - 10 : securityScore + 10);
  };

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Security Center</h2>
      </div>

      {/* Security Score */}
      <div className="mb-8">
        <div className="bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Security Score</h3>
          <div className="relative h-4 bg-gray-600 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${securityScore}%` }}
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
            />
          </div>
          <div className="mt-2 text-right">
            <span className="text-white font-semibold">{securityScore}%</span>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="space-y-4">
        {securityChecks.map((check) => (
          <div key={check.id} className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  {check.status === 'complete' ? (
                    <CheckCircle className="text-green-400" size={20} />
                  ) : (
                    <AlertTriangle className="text-yellow-400" size={20} />
                  )}
                  <h4 className="text-lg font-semibold text-white">{check.title}</h4>
                </div>
                <p className="text-gray-400 mt-1">{check.description}</p>
              </div>
              
              {check.id === '2fa' && (
                <button
                  onClick={toggleTwoFactor}
                  className={`px-4 py-2 rounded-lg ${
                    twoFactorEnabled
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {twoFactorEnabled ? 'Enabled' : 'Enable'}
                </button>
              )}
              
              {check.id === 'biometric' && (
                <button
                  onClick={toggleBiometric}
                  className={`px-4 py-2 rounded-lg ${
                    biometricEnabled
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {biometricEnabled ? 'Enabled' : 'Enable'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Security Tips */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Security Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Lock className="text-purple-400 mt-1" size={20} />
            <p className="text-gray-300">Never share your password or OTP with anyone</p>
          </div>
          <div className="flex items-start space-x-3">
            <Eye className="text-purple-400 mt-1" size={20} />
            <p className="text-gray-300">Always check the URL before entering banking details</p>
          </div>
          <div className="flex items-start space-x-3">
            <Fingerprint className="text-purple-400 mt-1" size={20} />
            <p className="text-gray-300">Use biometric authentication when available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
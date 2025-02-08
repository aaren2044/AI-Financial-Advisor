import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { Mic, Camera, Fingerprint, User, Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';  // Import axios for API requests

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVoiceAuth, setIsVoiceAuth] = useState(false);
  const [isFaceAuth, setIsFaceAuth] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string; // Email input value
    const password = formData.get('password') as string; // Password input value
    const name = formData.get('name') as string; // Only for registration

    const userData = {
      email,
      password,
    };

    if (!isLogin) {
      userData.name = name; // Include name if registering
    }

    try {
      let response;

      if (isLogin) {
        // Login request
        response = await axios.post('http://localhost:5000/api/auth/login', userData);
        toast.success('Login successful!');
      } else {
        // Registration request
        response = await axios.post('http://localhost:5000/api/auth/register', userData);
        toast.success('Registration successful!');
      }

      // If login is successful, save token and navigate
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Store JWT token in localStorage (can be used for authentication)
        navigate('/dashboard');  // Redirect to dashboard after login
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleVoiceAuth = () => {
    setIsVoiceAuth(true);
    // TODO: Implement voice authentication
    toast.success('Voice authentication started');
  };

  const handleFaceAuth = () => {
    setIsFaceAuth(true);
    // TODO: Implement face authentication
    toast.success('Face authentication started');
  };

  const handleFingerprint = () => {
    // TODO: Implement fingerprint authentication
    toast.success('Fingerprint authentication started');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            NariDhanSakhi
          </h1>
          <p className="text-gray-400 mt-2">Financial Empowerment Platform</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-lg ${isLogin ? 'bg-purple-600' : 'bg-gray-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-lg ${!isLogin ? 'bg-purple-600' : 'bg-gray-700'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceAuth}
              type="button"
              className="p-3 bg-purple-600 rounded-full hover:bg-purple-700"
            >
              <Mic size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFaceAuth}
              type="button"
              className="p-3 bg-purple-600 rounded-full hover:bg-purple-700"
            >
              <Camera size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFingerprint}
              type="button"
              className="p-3 bg-purple-600 rounded-full hover:bg-purple-700"
            >
              <Fingerprint size={20} />
            </motion.button>
          </div>

          {(isVoiceAuth || isFaceAuth) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              {isFaceAuth && (
                <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="absolute w-full h-full object-cover"
                  />
                </div>
              )}
              {isVoiceAuth && (
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <p>Speak your passphrase...</p>
                  <div className="mt-2 animate-pulse">
                    <Mic size={24} className="mx-auto text-purple-500" />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {isLogin ? 'Login' : 'Register'}
          </motion.button>
        </form>
      </motion.div>

      {/* Telegram Logo at Bottom Right */}
    <div className="fixed bottom-4 right-4 flex items-center p-4 bg-gray-800/50 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 text-white">
      <button
  onClick={() => {
    setIsLogin(true);
    window.location.href = "https://web.telegram.org/a/#7852822223"; 
  }}
  className={`px-4 py-2 rounded-lg ${isLogin ? 'bg-purple-600' : 'bg-gray-700'}`}
>
  Telegram
</button>
      </div>
    </div>
    </div>
  );
};

export default AuthPage;
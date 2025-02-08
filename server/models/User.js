import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'mentor', 'admin'],
    default: 'user'
  },
  profile: {
    language: String,
    location: String,
    occupation: String,
    interests: [String],
    skills: [String]
  },
  financialProfile: {
    monthlyIncome: Number,
    savings: Number,
    goals: [{
      type: String,
      target: Number,
      deadline: Date
    }],
    loans: [{
      type: String,
      amount: Number,
      interestRate: Number,
      status: String
    }]
  },
  learningProgress: {
    completedModules: [String],
    quizScores: [{
      moduleId: String,
      score: Number,
      date: Date
    }],
    certificates: [{
      name: String,
      issueDate: Date,
      url: String
    }]
  },
  biometricData: {
    voicePrint: String,
    faceData: String,
    fingerprintHash: String
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
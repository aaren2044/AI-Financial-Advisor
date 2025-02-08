import mongoose from 'mongoose';

const financialGoalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  target: { type: Number, required: true },
  current: { type: Number, required: true }
});

export default mongoose.model('FinancialGoal', financialGoalSchema);

import mongoose from 'mongoose';

const savingsSchema = new mongoose.Schema({
  month: { type: String, required: true },
  amount: { type: Number, required: true }
});

export default mongoose.model('Savings', savingsSchema);

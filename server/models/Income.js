import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  amount: { type: Number, required: true }
});

export default mongoose.model('Income', incomeSchema);
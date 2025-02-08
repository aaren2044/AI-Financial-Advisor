import mongoose from 'mongoose';

const totalSavingsSchema = new mongoose.Schema({
  amount: { type: Number, required: true }
});

export default mongoose.model('TotalSavings', totalSavingsSchema);
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true }
});

export default mongoose.model('Expense', expenseSchema);

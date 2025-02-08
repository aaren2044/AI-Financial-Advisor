import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Trash2 } from 'lucide-react';

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

const BudgetCalculator = () => {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [newItem, setNewItem] = useState({
    category: '',
    amount: '',
    type: 'expense'
  });

  const addItem = () => {
    if (!newItem.category || !newItem.amount) return;

    setItems([
      ...items,
      {
        id: Date.now().toString(),
        category: newItem.category,
        amount: parseFloat(newItem.amount),
        type: newItem.type as 'income' | 'expense'
      }
    ]);

    setNewItem({ category: '', amount: '', type: 'expense' });
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalIncome = items
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="text-purple-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Budget Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Add New Item</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Category
              </label>
              <input
                type="text"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Salary, Groceries"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                value={newItem.amount}
                onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Type
              </label>
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <button
              onClick={addItem}
              className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
          <div className="space-y-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Total Income</p>
                  <p className="text-green-400 text-xl font-semibold">₹{totalIncome}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Expenses</p>
                  <p className="text-red-400 text-xl font-semibold">₹{totalExpenses}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-600">
                <p className="text-gray-400">Balance</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ₹{balance}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3"
                >
                  <div>
                    <p className="text-white">{item.category}</p>
                    <p className={`text-sm ${item.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      ₹{item.amount}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
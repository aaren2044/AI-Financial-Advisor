import React, { useState } from 'react';
import { PlusCircle, Mail } from 'lucide-react';
import { Mentor } from '../typesf';
import toast from 'react-hot-toast';

const initialMentors: Mentor[] = [
  {
    id: '1',
    name: 'Siddhant Jadhav',
    email: 'sidak4712@gmail.com',
    expertise: 'Business Development',
    bio: 'Experienced business mentor with focus on startups',
    available: true
  },
  {
    id: '2',
    name: 'Tejas Salvi',
    email: 'sidzt2104@gmail.com',
    expertise: 'Financial Planning',
    bio: 'Financial advisor with 10+ years experience',
    available: true
  }
];

export const MentorList: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>(initialMentors);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    bio: '',
  });

  const handleConnect = async (mentor: Mentor) => {
    try {
      // Send email using a backend service or email API
      const emailUrl = `mailto:${mentor.email}?subject=Mentor Connection Request&body=Hello ${mentor.name},%0D%0A%0D%0AI would like to connect with you as a mentor.%0D%0A%0D%0AThank you`;
      window.location.href = emailUrl;
      toast.success(`Opening email client to connect with ${mentor.name}`);
    } catch (error) {
      toast.error('Failed to send email. Please try again.');
    }
  };

  const handleAddMentor = (e: React.FormEvent) => {
    e.preventDefault();
    const newMentor: Mentor = {
      id: Date.now().toString(),
      ...formData,
      available: true
    };
    setMentors([...mentors, newMentor]);
    setShowForm(false);
    setFormData({ name: '', email: '', expertise: '', bio: '' });
    toast.success('New mentor added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Find a Mentor</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all transform hover:scale-[1.02]"
        >
          <PlusCircle size={20} />
          Add Mentor
        </button>
      </div>

      {showForm && (
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 p-6 rounded-lg border border-purple-500/20">
          <form onSubmit={handleAddMentor} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 bg-gray-800/50 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 bg-gray-800/50 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              required
            />
            <input
              type="text"
              placeholder="Expertise"
              value={formData.expertise}
              onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
              className="w-full p-3 bg-gray-800/50 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              required
            />
            <textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 bg-gray-800/50 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all transform hover:scale-[1.02]"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 p-6 rounded-lg flex justify-between items-center border border-purple-500/20">
            <div>
              <h3 className="text-xl font-semibold text-white">{mentor.name}</h3>
              <p className="text-purple-300">{mentor.expertise}</p>
              <p className="text-gray-400">{mentor.bio}</p>
            </div>
            <button
              onClick={() => handleConnect(mentor)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all transform hover:scale-[1.02] flex items-center gap-2"
            >
              <Mail size={18} />
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
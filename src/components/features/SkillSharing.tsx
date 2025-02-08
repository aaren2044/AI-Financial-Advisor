import React, { useState, useEffect } from 'react';
import { BookOpen, Users, MessageSquare } from 'lucide-react';
import { features } from '../../services/api';

const SkillSharing = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [newSkill, setNewSkill] = useState({
    title: '',
    description: '',
    type: 'offer' // or 'request'
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await features.skillSharing.getSkills();
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newSkill.type === 'offer') {
        await features.skillSharing.offerSkill(newSkill);
      } else {
        await features.skillSharing.requestSkill(newSkill);
      }
      fetchSkills();
      setNewSkill({ title: '', description: '', type: 'offer' });
    } catch (error) {
      console.error('Error submitting skill:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-4">Skill Sharing</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Type
            </label>
            <select
              value={newSkill.type}
              onChange={(e) => setNewSkill({ ...newSkill, type: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
            >
              <option value="offer">Offer a Skill</option>
              <option value="request">Request a Skill</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newSkill.title}
              onChange={(e) => setNewSkill({ ...newSkill, title: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
              placeholder="Enter skill title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              value={newSkill.description}
              onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
              placeholder="Describe the skill"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white rounded-lg px-4 py-2"
          >
            {newSkill.type === 'offer' ? 'Offer Skill' : 'Request Skill'}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-gray-700/50 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-block px-2 py-1 rounded text-xs ${
                  skill.type === 'offer'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {skill.type === 'offer' ? 'Offering' : 'Requesting'}
                </span>
                <h4 className="text-lg font-semibold text-white mt-2">
                  {skill.title}
                </h4>
                <p className="text-gray-400 mt-1">
                  {skill.description}
                </p>
              </div>

              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                Connect
              </button>
            </div>

            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-400">
              <span>
                <Users size={16} className="inline mr-1" />
                {skill.connections} connections
              </span>
              <span>
                <MessageSquare size={16} className="inline mr-1" />
                {skill.messages} messages
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSharing;
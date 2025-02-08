import React from 'react';
import { Event } from '../typesf';

const events: Event[] = [
  {
    id: '1',
    title: 'Financial Planning Workshop',
    date: 'March 15, 2024',
    type: 'Online'
  },
  {
    id: '2',
    title: 'Business Networking Meet',
    date: 'March 20, 2024',
    type: 'In-Person'
  },
  {
    id: '3',
    title: 'Digital Banking Seminar',
    date: 'March 25, 2024',
    type: 'Online'
  }
];

export const Events: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white">{event.title}</h3>
            <p className="text-gray-400 mt-2">{event.date}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-white text-sm rounded-full ${
                event.type === 'Online' ? 'bg-blue-600' : 'bg-purple-600'
              }`}
            >
              {event.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
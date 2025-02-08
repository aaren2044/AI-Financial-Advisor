import React, { useState } from 'react';
import { Search, Globe2, MessageSquareText } from 'lucide-react';

interface NewsSearchProps {
  onSearch: (query: string, language: string) => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'mr', name: 'Marathi' },
];

export function NewsSearch({ onSearch }: NewsSearchProps) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, language);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="relative flex gap-2 p-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex-1 flex items-center gap-2 bg-gray-700/50 rounded-md px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for news..."
            className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-700/50 text-white rounded-md px-4 py-2 appearance-none cursor-pointer hover:bg-gray-600/50 transition-colors"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-2"
        >
          <Globe2 className="w-5 h-5" />
          Search
        </button>
      </div>
    </form>
  );
}
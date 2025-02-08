import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import type { NewsArticle } from '../typesn';

export function NewsCard({ article }: { article: NewsArticle }) {
  const date = new Date(article.publishedAt).toLocaleDateString();

  return (
    <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
            {article.title}
          </h3>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        <p className="text-gray-300 mb-4">{article.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {date}
          </span>
          <span className="bg-gray-700/50 px-3 py-1 rounded-full">
            {article.source.name}
          </span>
        </div>
      </div>
    </div>
  );
}
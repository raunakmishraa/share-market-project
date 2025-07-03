import React from 'react';
import { Newspaper, ExternalLink, Clock } from 'lucide-react';
import { mockNews } from '../data/mockData';

export function News() {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Market News</h1>
        <p className="text-gray-400">Latest financial news and market updates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockNews.map((article, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-750 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">{article.source}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{article.time}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-gray-300 mb-4 line-clamp-3">
              {article.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {article.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors">
                <span className="text-sm">Read more</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
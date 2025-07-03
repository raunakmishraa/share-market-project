import React from 'react';
import { BookOpen, Play, Download, CheckCircle } from 'lucide-react';
import { educationContent } from '../data/mockData';

export function Education() {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Education Center</h1>
        <p className="text-gray-400">Learn about stock market investing and trading</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationContent.map((content, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-750 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                content.type === 'video' ? 'bg-red-500/20' : 
                content.type === 'article' ? 'bg-blue-500/20' : 'bg-green-500/20'
              }`}>
                {content.type === 'video' ? (
                  <Play className={`w-6 h-6 ${
                    content.type === 'video' ? 'text-red-400' : 
                    content.type === 'article' ? 'text-blue-400' : 'text-green-400'
                  }`} />
                ) : content.type === 'article' ? (
                  <BookOpen className="w-6 h-6 text-blue-400" />
                ) : (
                  <Download className="w-6 h-6 text-green-400" />
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  content.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  content.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {content.difficulty}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">{content.title}</h3>
            <p className="text-gray-300 mb-4">{content.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span>{content.duration}</span>
              <span>{content.type.charAt(0).toUpperCase() + content.type.slice(1)}</span>
            </div>

            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Start Learning
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Learning Progress</h2>
        <div className="space-y-3">
          {[
            { title: 'Stock Market Basics', progress: 100, completed: true },
            { title: 'Technical Analysis', progress: 75, completed: false },
            { title: 'Risk Management', progress: 30, completed: false },
            { title: 'Portfolio Diversification', progress: 0, completed: false }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">{item.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{item.progress}%</span>
                    {item.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
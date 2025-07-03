import React from 'react';
import { Activity } from 'lucide-react';
import { useStock } from '../contexts/StockContext';

export function TrendingStocks() {
  const { stocks } = useStock();
  const trendingStocks = stocks
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Trending Stocks</h3>
      </div>
      
      <div className="space-y-3">
        {trendingStocks.map((stock) => (
          <div key={stock.symbol} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">{stock.symbol}</div>
              <div className="text-sm text-gray-400">Rs. {stock.price.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-blue-400">
                {stock.volume.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Volume</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
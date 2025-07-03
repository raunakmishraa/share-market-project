import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useStock } from '../contexts/StockContext';

export function TopGainers() {
  const { stocks } = useStock();
  const topGainers = stocks
    .filter(stock => stock.change > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-semibold text-white">Top Gainers</h3>
      </div>
      
      <div className="space-y-3">
        {topGainers.map((stock) => (
          <div key={stock.symbol} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">{stock.symbol}</div>
              <div className="text-sm text-gray-400">Rs. {stock.price.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-emerald-400">
                +{stock.changePercent.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-400">
                +Rs. {stock.change.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
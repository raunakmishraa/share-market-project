import React from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Stock } from '../types/stock';
import { useStock } from '../contexts/StockContext';

interface StockCardProps {
  stock: Stock;
}

export function StockCard({ stock }: StockCardProps) {
  const { addToWatchlist, removeFromWatchlist, watchlist } = useStock();
  const isInWatchlist = watchlist.some(item => item.symbol === stock.symbol);
  const isPositive = stock.change >= 0;

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white">{stock.symbol}</h3>
          <p className="text-sm text-gray-400">{stock.name}</p>
        </div>
        <button
          onClick={handleWatchlistToggle}
          className={`p-1 rounded ${
            isInWatchlist ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
          }`}
        >
          <Star className="w-4 h-4" fill={isInWatchlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">Rs. {stock.price.toFixed(2)}</span>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-medium">
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Volume</span>
            <p className="font-medium text-white">{stock.volume.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-gray-400">Market Cap</span>
            <p className="font-medium text-white">Rs. {stock.marketCap}B</p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Star, Trash2, Plus } from 'lucide-react';
import { useStock } from '../contexts/StockContext';
import { StockCard } from './StockCard';

export function Watchlist() {
  const { watchlist, removeFromWatchlist } = useStock();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Watchlist</h1>
          <p className="text-gray-400">Track your favorite stocks</p>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 font-medium">{watchlist.length} stocks</span>
        </div>
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Your watchlist is empty</h3>
          <p className="text-gray-500">Start adding stocks to track their performance</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {watchlist.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
}
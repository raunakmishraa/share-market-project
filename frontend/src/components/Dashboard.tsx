import React from 'react';
import { StockCard } from './StockCard';
import { MarketOverview } from './MarketOverview';
import { TopGainers } from './TopGainers';
import { TopLosers } from './TopLosers';
import { TrendingStocks } from './TrendingStocks';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { useStock } from '../contexts/StockContext';

export function Dashboard() {
  const { stocks, loading, error, lastUpdated, refreshData, testApiConnectivity } = useStock();

  if (loading && stocks.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && stocks.length === 0) {
    return <ErrorMessage message={error} onRetry={refreshData} />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Market Dashboard</h1>
          <p className="text-gray-400">Real-time Nepal Stock Exchange data</p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={testApiConnectivity}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Test APIs
          </button>
          <button
            onClick={refreshData}
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-400 text-sm">
            {error}
          </p>
        </div>
      )}

      <MarketOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopGainers />
        <TopLosers />
        <TrendingStocks />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">All Stocks ({stocks.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  );
}
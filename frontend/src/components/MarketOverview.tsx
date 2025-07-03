import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { useStock } from '../contexts/StockContext';

export function MarketOverview() {
  const { stocks } = useStock();

  // Calculate market statistics from real data
  const calculateMarketStats = () => {
    if (stocks.length === 0) {
      return {
        totalMarketCap: 0,
        totalVolume: 0,
        gainers: 0,
        losers: 0,
        avgChange: 0
      };
    }

    const totalMarketCap = stocks.reduce((sum, stock) => sum + stock.marketCap, 0);
    const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);
    const gainers = stocks.filter(stock => stock.change > 0).length;
    const losers = stocks.filter(stock => stock.change < 0).length;
    const avgChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length;

    return { totalMarketCap, totalVolume, gainers, losers, avgChange };
  };

  const stats = calculateMarketStats();

  const marketData = [
    {
      label: 'NEPSE Index',
      value: '2,084.32',
      change: stats.avgChange > 0 ? `+${stats.avgChange.toFixed(2)}` : stats.avgChange.toFixed(2),
      changePercent: `${stats.avgChange > 0 ? '+' : ''}${stats.avgChange.toFixed(2)}%`,
      isPositive: stats.avgChange >= 0,
      icon: stats.avgChange >= 0 ? TrendingUp : TrendingDown
    },
    {
      label: 'Total Market Cap',
      value: `Rs. ${(stats.totalMarketCap / 1000).toFixed(1)}T`,
      change: `+Rs. ${(stats.totalMarketCap * 0.02 / 1000).toFixed(0)}B`,
      changePercent: '+1.4%',
      isPositive: true,
      icon: DollarSign
    },
    {
      label: 'Volume Traded',
      value: `${(stats.totalVolume / 1000000).toFixed(1)}M`,
      change: `${(stats.totalVolume / 1000000 * 0.1).toFixed(1)}M`,
      changePercent: '+10.2%',
      isPositive: true,
      icon: Activity
    },
    {
      label: 'Gainers vs Losers',
      value: `${stats.gainers}/${stats.losers}`,
      change: `+${stats.gainers - stats.losers}`,
      changePercent: stats.gainers > stats.losers ? 'Bullish' : 'Bearish',
      isPositive: stats.gainers >= stats.losers,
      icon: stats.gainers >= stats.losers ? TrendingUp : TrendingDown
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {marketData.map((data, index) => {
        const Icon = data.icon;
        return (
          <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${data.isPositive ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                <Icon className={`w-6 h-6 ${data.isPositive ? 'text-emerald-400' : 'text-red-400'}`} />
              </div>
              <div className={`text-right ${data.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                <div className="text-sm font-medium">{data.change}</div>
                <div className="text-xs">{data.changePercent}</div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{data.value}</h3>
              <p className="text-sm text-gray-400">{data.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
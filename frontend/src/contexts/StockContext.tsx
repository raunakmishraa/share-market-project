import React, { createContext, useContext, useState, useEffect } from 'react';
import { Stock, Alert } from '../types/stock';
import { stockApiService } from '../services/stockApi';
import { mapNepseApiToStock } from '../utils/stockMapper';
import { mockStocks } from '../data/mockData';

interface StockContextType {
  stocks: Stock[];
  watchlist: Stock[];
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  addToWatchlist: (stock: Stock) => void;
  removeFromWatchlist: (symbol: string) => void;
  addAlert: (alert: Alert) => void;
  removeAlert: (id: string) => void;
  refreshData: () => Promise<void>;
  testApiConnectivity: () => Promise<void>;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: React.ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching real-time stock data...');
      const apiStocks = await stockApiService.fetchAllStocks();
      
      if (apiStocks.length === 0) {
        throw new Error('No stock data received from API');
      }
      
      const mappedStocks = apiStocks.map(mapNepseApiToStock);
      console.log(`Successfully mapped ${mappedStocks.length} stocks`);
      
      setStocks(mappedStocks);
      setLastUpdated(new Date());
      
      // Update watchlist with fresh data
      setWatchlist(prevWatchlist => 
        prevWatchlist.map(watchlistStock => {
          const updatedStock = mappedStocks.find(s => s.symbol === watchlistStock.symbol);
          return updatedStock || watchlistStock;
        })
      );
      
    } catch (err) {
      console.error('Failed to fetch stock data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to fetch real-time data: ${errorMessage}. Using demo data instead.`);
      
      // Fallback to mock data when API is unavailable
      setStocks(mockStocks);
      setLastUpdated(new Date());
      
      // Update watchlist with mock data
      setWatchlist(prevWatchlist => 
        prevWatchlist.map(watchlistStock => {
          const updatedStock = mockStocks.find(s => s.symbol === watchlistStock.symbol);
          return updatedStock || watchlistStock;
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchStockData();
  };

  const testApiConnectivity = async () => {
    try {
      const results = await stockApiService.testApiConnectivity();
      console.log('API Connectivity Test Results:', results);
      
      // Show results in a more user-friendly way
      const workingApis = results.filter(r => r.status === 'Success');
      const failedApis = results.filter(r => r.status !== 'Success');
      
      console.log(`Working APIs: ${workingApis.length}/${results.length}`);
      if (workingApis.length > 0) {
        console.log('Working endpoints:', workingApis.map(r => r.endpoint));
      }
      if (failedApis.length > 0) {
        console.log('Failed endpoints:', failedApis.map(r => `${r.endpoint}: ${r.error}`));
      }
    } catch (error) {
      console.error('Error testing API connectivity:', error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchStockData();
  }, []);

  // Auto-refresh every 60 seconds (reduced frequency to avoid rate limiting)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStockData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const addToWatchlist = (stock: Stock) => {
    setWatchlist(prev => {
      if (prev.some(s => s.symbol === stock.symbol)) {
        return prev;
      }
      return [...prev, stock];
    });
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(stock => stock.symbol !== symbol));
  };

  const addAlert = (alert: Alert) => {
    setAlerts(prev => [...prev, alert]);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <StockContext.Provider value={{
      stocks,
      watchlist,
      alerts,
      loading,
      error,
      lastUpdated,
      addToWatchlist,
      removeFromWatchlist,
      addAlert,
      removeAlert,
      refreshData,
      testApiConnectivity
    }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
}
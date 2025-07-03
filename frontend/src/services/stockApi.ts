export interface NepseApiStock {
  symbol: string;
  ltp: number; // Last Traded Price
  pointChange: number;
  percentChange: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  previousClose: number;
  marketCap?: number;
  sector?: string;
}

export interface NepseApiResponse {
  success: boolean;
  data: NepseApiStock[];
  message?: string;
}

class StockApiService {
  // Multiple API endpoints to try for Nepal stock data
  private apiEndpoints = [
    'https://nepse-api.herokuapp.com/api/stocks',
    'https://api.nepalipaisa.com/api/GetTodayPrice',
    'https://cors-anywhere.herokuapp.com/https://nepalstock.com/api/nots/nepse-data/today',
    'http://nepstockapi.herokuapp.com/'
  ];

  async fetchAllStocks(): Promise<NepseApiStock[]> {
    let lastError: Error | null = null;

    // Try each API endpoint
    for (const endpoint of this.apiEndpoints) {
      try {
        console.log(`Attempting to fetch from: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Handle different response formats
        let stocks: any[] = [];
        
        if (Array.isArray(data)) {
          stocks = data;
        } else if (data.data && Array.isArray(data.data)) {
          stocks = data.data;
        } else if (data.success && data.data) {
          stocks = data.data;
        } else if (data.result && Array.isArray(data.result)) {
          stocks = data.result;
        } else if (data.stocks && Array.isArray(data.stocks)) {
          stocks = data.stocks;
        }
        
        if (stocks.length > 0) {
          console.log(`Successfully fetched ${stocks.length} stocks from ${endpoint}`);
          return this.normalizeStockData(stocks);
        }
        
      } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        lastError = error as Error;
        continue;
      }
    }
    
    // If all APIs fail, throw the last error
    throw lastError || new Error('All API endpoints failed');
  }

  private normalizeStockData(rawStocks: any[]): NepseApiStock[] {
    return rawStocks.map(stock => ({
      symbol: stock.symbol || stock.Symbol || stock.stockSymbol || '',
      ltp: parseFloat(stock.ltp || stock.LTP || stock.lastTradedPrice || stock.price || 0),
      pointChange: parseFloat(stock.pointChange || stock.change || stock.priceChange || 0),
      percentChange: parseFloat(stock.percentChange || stock.percentageChange || stock.changePercent || 0),
      open: parseFloat(stock.open || stock.openPrice || stock.ltp || 0),
      high: parseFloat(stock.high || stock.highPrice || stock.ltp || 0),
      low: parseFloat(stock.low || stock.lowPrice || stock.ltp || 0),
      volume: parseInt(stock.volume || stock.totalTradeQuantity || stock.qty || 0),
      previousClose: parseFloat(stock.previousClose || stock.prevClose || stock.ltp || 0),
      marketCap: parseFloat(stock.marketCap || 0),
      sector: stock.sector || stock.sectorName || 'Other'
    })).filter(stock => stock.symbol && stock.ltp > 0);
  }

  async fetchStockBySymbol(symbol: string): Promise<NepseApiStock | null> {
    try {
      const stocks = await this.fetchAllStocks();
      return stocks.find(stock => stock.symbol === symbol) || null;
    } catch (error) {
      console.error(`Error fetching stock ${symbol}:`, error);
      return null;
    }
  }

  // Method to test API connectivity
  async testApiConnectivity(): Promise<{ endpoint: string; status: string; error?: string }[]> {
    const results = [];
    
    for (const endpoint of this.apiEndpoints) {
      try {
        const response = await fetch(endpoint, { 
          method: 'GET',
          mode: 'cors',
          headers: { 'Accept': 'application/json' }
        });
        
        results.push({
          endpoint,
          status: response.ok ? 'Success' : `Error: ${response.status}`,
          error: response.ok ? undefined : `HTTP ${response.status}`
        });
      } catch (error) {
        results.push({
          endpoint,
          status: 'Failed',
          error: (error as Error).message
        });
      }
    }
    
    return results;
  }
}

export const stockApiService = new StockApiService();
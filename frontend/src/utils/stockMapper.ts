import { Stock } from '../types/stock';
import { NepseApiStock } from '../services/stockApi';

// Sector mapping for common Nepali stocks
const sectorMapping: Record<string, string> = {
  'NABIL': 'Banking',
  'NICA': 'Banking',
  'ADBL': 'Banking',
  'CBBL': 'Banking',
  'MEGA': 'Banking',
  'KBL': 'Banking',
  'PRVU': 'Banking',
  'SANIMA': 'Banking',
  'GBIME': 'Banking',
  'CZBIL': 'Banking',
  'HIDCL': 'Hydropower',
  'UPPER': 'Hydropower',
  'NHPC': 'Hydropower',
  'NLIC': 'Insurance',
  'NLICL': 'Insurance',
  'NIFRA': 'Development Banking',
};

export function mapNepseApiToStock(apiStock: NepseApiStock): Stock {
  // Calculate market cap estimate (in billions)
  const estimatedMarketCap = (apiStock.ltp * (apiStock.volume || 1000000)) / 1000000000;
  
  return {
    symbol: apiStock.symbol,
    name: getCompanyName(apiStock.symbol),
    price: apiStock.ltp || 0,
    change: apiStock.pointChange || 0,
    changePercent: apiStock.percentChange || 0,
    volume: apiStock.volume || 0,
    marketCap: Math.max(estimatedMarketCap, 1), // Minimum 1B
    sector: sectorMapping[apiStock.symbol] || 'Other'
  };
}

function getCompanyName(symbol: string): string {
  const companyNames: Record<string, string> = {
    'NABIL': 'Nabil Bank Limited',
    'NICA': 'NIC Asia Bank Limited',
    'ADBL': 'Agricultural Development Bank Limited',
    'HIDCL': 'Hydroelectricity Investment and Development Company Limited',
    'UPPER': 'Upper Tamakoshi Hydropower Limited',
    'NHPC': 'Nepal Hydro Power Company Limited',
    'NLIC': 'Nepal Life Insurance Company Limited',
    'NLICL': 'Nepal Life Insurance Company Limited',
    'NIFRA': 'Nepal Infrastructure Bank Limited',
    'CBBL': 'Civil Bank Limited',
    'MEGA': 'Mega Bank Nepal Limited',
    'KBL': 'Kumari Bank Limited',
    'PRVU': 'Prabhu Bank Limited',
    'SANIMA': 'Sanima Bank Limited',
    'GBIME': 'Global IME Bank Limited',
    'CZBIL': 'Citizen Bank International Limited',
  };
  
  return companyNames[symbol] || `${symbol} Limited`;
}
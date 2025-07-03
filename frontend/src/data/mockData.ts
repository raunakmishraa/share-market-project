import { Stock, NewsArticle, EducationContent } from '../types/stock';

export const mockStocks: Stock[] = [
  {
    symbol: 'NABIL',
    name: 'Nabil Bank Limited',
    price: 1187.00,
    change: 12.50,
    changePercent: 1.06,
    volume: 45670,
    marketCap: 47.5,
    sector: 'Banking'
  },
  {
    symbol: 'NICA',
    name: 'NIC Asia Bank Limited',
    price: 834.20,
    change: -5.80,
    changePercent: -0.69,
    volume: 23450,
    marketCap: 33.2,
    sector: 'Banking'
  },
  {
    symbol: 'ADBL',
    name: 'Agricultural Development Bank Limited',
    price: 456.30,
    change: 8.70,
    changePercent: 1.94,
    volume: 67890,
    marketCap: 21.8,
    sector: 'Banking'
  },
  {
    symbol: 'HIDCL',
    name: 'Hydroelectricity Investment and Development Company Limited',
    price: 312.75,
    change: -2.25,
    changePercent: -0.71,
    volume: 98765,
    marketCap: 15.6,
    sector: 'Hydropower'
  },
  {
    symbol: 'UPPER',
    name: 'Upper Tamakoshi Hydropower Limited',
    price: 589.40,
    change: 15.60,
    changePercent: 2.72,
    volume: 34567,
    marketCap: 29.5,
    sector: 'Hydropower'
  },
  {
    symbol: 'NHPC',
    name: 'Nepal Hydro Power Company Limited',
    price: 278.90,
    change: 3.40,
    changePercent: 1.23,
    volume: 56789,
    marketCap: 13.9,
    sector: 'Hydropower'
  },
  {
    symbol: 'NLIC',
    name: 'Nepal Life Insurance Company Limited',
    price: 1245.60,
    change: -18.40,
    changePercent: -1.46,
    volume: 12345,
    marketCap: 18.7,
    sector: 'Insurance'
  },
  {
    symbol: 'NLICL',
    name: 'Nepal Life Insurance Company Limited',
    price: 987.30,
    change: 9.70,
    changePercent: 0.99,
    volume: 23456,
    marketCap: 14.8,
    sector: 'Insurance'
  },
  {
    symbol: 'NIFRA',
    name: 'Nepal Infrastructure Bank Limited',
    price: 623.80,
    change: 7.20,
    changePercent: 1.17,
    volume: 45678,
    marketCap: 24.9,
    sector: 'Development Banking'
  },
  {
    symbol: 'CBBL',
    name: 'Civil Bank Limited',
    price: 289.50,
    change: -4.50,
    changePercent: -1.53,
    volume: 34567,
    marketCap: 11.6,
    sector: 'Banking'
  },
  {
    symbol: 'MEGA',
    name: 'Mega Bank Nepal Limited',
    price: 345.70,
    change: 6.30,
    changePercent: 1.86,
    volume: 67890,
    marketCap: 13.8,
    sector: 'Banking'
  },
  {
    symbol: 'KBL',
    name: 'Kumari Bank Limited',
    price: 267.40,
    change: -1.60,
    changePercent: -0.59,
    volume: 23456,
    marketCap: 10.7,
    sector: 'Banking'
  },
  {
    symbol: 'PRVU',
    name: 'Prabhu Bank Limited',
    price: 298.80,
    change: 4.80,
    changePercent: 1.63,
    volume: 56789,
    marketCap: 11.9,
    sector: 'Banking'
  },
  {
    symbol: 'SANIMA',
    name: 'Sanima Bank Limited',
    price: 356.90,
    change: 2.90,
    changePercent: 0.82,
    volume: 34567,
    marketCap: 14.3,
    sector: 'Banking'
  },
  {
    symbol: 'GBIME',
    name: 'Global IME Bank Limited',
    price: 312.60,
    change: -3.40,
    changePercent: -1.08,
    volume: 45678,
    marketCap: 12.5,
    sector: 'Banking'
  },
  {
    symbol: 'CZBIL',
    name: 'Citizen Bank International Limited',
    price: 278.30,
    change: 5.70,
    changePercent: 2.09,
    volume: 23456,
    marketCap: 11.1,
    sector: 'Banking'
  }
];

export const mockNews: NewsArticle[] = [
  {
    title: 'NEPSE Index Surges to New Monthly High Amid Banking Sector Rally',
    summary: 'The Nepal Stock Exchange (NEPSE) index climbed 1.2% to reach 2,084 points, driven by strong performance in banking stocks. Major banks like NABIL and NICA led the charge with significant gains.',
    source: 'Nepal Financial Times',
    time: '2 hours ago',
    tags: ['NEPSE', 'Banking', 'Market Rally'],
    url: '#'
  },
  {
    title: 'Hydropower Stocks Show Mixed Performance Despite Increased Demand',
    summary: 'While electricity demand continues to rise, hydropower stocks showed mixed results today. UPPER gained 2.7% while HIDCL declined 0.7%, reflecting investor uncertainty about the sector.',
    source: 'The Kathmandu Post',
    time: '4 hours ago',
    tags: ['Hydropower', 'Energy', 'Market Analysis'],
    url: '#'
  },
  {
    title: 'Nepal Rastra Bank Announces New Monetary Policy Guidelines',
    summary: 'The central bank has announced new guidelines for commercial banks, focusing on credit flow to productive sectors. This move is expected to impact banking sector profitability.',
    source: 'The Himalayan Times',
    time: '6 hours ago',
    tags: ['NRB', 'Monetary Policy', 'Banking'],
    url: '#'
  },
  {
    title: 'Foreign Investment in Nepal Stock Market Increases by 15%',
    summary: 'Foreign portfolio investment in Nepal\'s stock market has increased by 15% in the current fiscal year, indicating growing international confidence in the market.',
    source: 'My Republica',
    time: '8 hours ago',
    tags: ['Foreign Investment', 'Market Growth', 'FPI'],
    url: '#'
  },
  {
    title: 'Insurance Sector Faces Challenges Amid Regulatory Changes',
    summary: 'The insurance sector is navigating new regulatory requirements, with companies like NLIC and NLICL adjusting their business strategies to comply with updated guidelines.',
    source: 'Arthik Abhiyan',
    time: '10 hours ago',
    tags: ['Insurance', 'Regulation', 'Compliance'],
    url: '#'
  },
  {
    title: 'Development Banks Show Strong Q3 Results',
    summary: 'Development banks including NIFRA reported strong third-quarter results, with improved loan portfolios and reduced non-performing assets driving profitability.',
    source: 'Business 360',
    time: '12 hours ago',
    tags: ['Development Banking', 'Q3 Results', 'Financial Performance'],
    url: '#'
  }
];

export const educationContent: EducationContent[] = [
  {
    title: 'Stock Market Basics for Beginners',
    description: 'Learn the fundamentals of stock market investing, including how markets work, types of stocks, and basic investment principles.',
    type: 'video',
    difficulty: 'Beginner',
    duration: '45 minutes',
    category: 'Fundamentals'
  },
  {
    title: 'Understanding Technical Analysis',
    description: 'Master the art of reading charts, understanding indicators, and making informed trading decisions based on technical analysis.',
    type: 'article',
    difficulty: 'Intermediate',
    duration: '1 hour',
    category: 'Technical Analysis'
  },
  {
    title: 'Risk Management Strategies',
    description: 'Comprehensive guide to managing investment risks, including diversification, position sizing, and stop-loss strategies.',
    type: 'guide',
    difficulty: 'Intermediate',
    duration: '30 minutes',
    category: 'Risk Management'
  },
  {
    title: 'Fundamental Analysis Deep Dive',
    description: 'Learn how to analyze company financials, evaluate business models, and make long-term investment decisions.',
    type: 'video',
    difficulty: 'Advanced',
    duration: '1.5 hours',
    category: 'Fundamental Analysis'
  },
  {
    title: 'Nepal Stock Market Overview',
    description: 'Complete guide to the Nepal Stock Exchange, including market structure, trading hours, and regulatory framework.',
    type: 'article',
    difficulty: 'Beginner',
    duration: '25 minutes',
    category: 'Market Knowledge'
  },
  {
    title: 'Portfolio Diversification Strategies',
    description: 'Learn how to build a well-diversified portfolio across different sectors and asset classes to minimize risk.',
    type: 'guide',
    difficulty: 'Intermediate',
    duration: '40 minutes',
    category: 'Portfolio Management'
  },
  {
    title: 'IPO Investment Guide',
    description: 'Everything you need to know about investing in Initial Public Offerings, including evaluation criteria and application process.',
    type: 'video',
    difficulty: 'Beginner',
    duration: '35 minutes',
    category: 'IPO'
  },
  {
    title: 'Advanced Trading Strategies',
    description: 'Explore sophisticated trading techniques including swing trading, day trading, and options strategies.',
    type: 'article',
    difficulty: 'Advanced',
    duration: '2 hours',
    category: 'Advanced Trading'
  },
  {
    title: 'Understanding Financial Statements',
    description: 'Learn to read and analyze balance sheets, income statements, and cash flow statements for better investment decisions.',
    type: 'guide',
    difficulty: 'Intermediate',
    duration: '50 minutes',
    category: 'Financial Analysis'
  }
];
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
}

export interface Alert {
  id: string;
  symbol: string;
  type: 'price_above' | 'price_below' | 'volume_spike';
  value: number;
  message: string;
  isActive: boolean;
  createdAt: string;
}

export interface NewsArticle {
  title: string;
  summary: string;
  source: string;
  time: string;
  tags: string[];
  url: string;
}

export interface EducationContent {
  title: string;
  description: string;
  type: 'video' | 'article' | 'guide';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
}
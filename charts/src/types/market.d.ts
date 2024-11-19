export interface Candlestick {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  quoteVolume?: string;
  trades?: number;
}

export interface IndicatorValue {
  name: string;
  values: number[];
  timestamp: number[];
  parameters?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface MarketSymbol {
  base: string;
  quote: string;
  exchange: string;
}

export type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w'; 
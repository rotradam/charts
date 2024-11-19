export interface AltcoinSeasonPoint {
  name: string;
  altcoinIndex: string;
  altcoinMarketcap: string;
  timestamp: string;
}

export interface AltcoinSeasonHistoricalValues {
  now: AltcoinSeasonPoint;
  yesterday: AltcoinSeasonPoint;
  lastWeek: AltcoinSeasonPoint;
  lastMonth: AltcoinSeasonPoint;
  yearlyHigh: AltcoinSeasonPoint;
  yearlyLow: AltcoinSeasonPoint;
}

export interface AltcoinSeasonDialConfig {
  start: number;
  end: number;
  name: string;
}

export interface AltcoinSeasonResponse {
  data: {
    points: AltcoinSeasonPoint[];
    historicalValues: AltcoinSeasonHistoricalValues;
    dialConfigs: AltcoinSeasonDialConfig[];
  };
  status: {
    timestamp: string;
    error_code: string;
    error_message: string;
    elapsed: string;
    credit_count: number;
  };
} 
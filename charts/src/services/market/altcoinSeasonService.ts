import { z } from 'zod';
import type { AltcoinSeasonResponse } from '@/types/altcoin-season';

const AltcoinSeasonPointSchema = z.object({
  name: z.string(),
  altcoinIndex: z.string(),
  altcoinMarketcap: z.string(),
  timestamp: z.string()
});

const AltcoinSeasonResponseSchema = z.object({
  data: z.object({
    points: z.array(AltcoinSeasonPointSchema),
    historicalValues: z.record(AltcoinSeasonPointSchema),
    dialConfigs: z.array(z.object({
      start: z.number(),
      end: z.number(),
      name: z.string()
    }))
  }),
  status: z.object({
    timestamp: z.string(),
    error_code: z.string(),
    error_message: z.string(),
    elapsed: z.string(),
    credit_count: z.number()
  })
});

export const fetchAltcoinSeasonData = async (
  startTimestamp: number,
  endTimestamp: number
): Promise<AltcoinSeasonResponse> => {
  console.log('Service - Fetching data with timestamps:', { startTimestamp, endTimestamp });
  
  const response = await fetch(
    `/api/market/altcoin-season?start=${startTimestamp}&end=${endTimestamp}`
  );

  if (!response.ok) {
    console.error('Service - Response not OK:', response.status, response.statusText);
    throw new Error('Failed to fetch altcoin season data');
  }

  const data = await response.json();
  console.log('Service - Data received:', {
    pointsCount: data.data.points.length,
    firstPoint: data.data.points[0],
    lastPoint: data.data.points[data.data.points.length - 1]
  });

  return AltcoinSeasonResponseSchema.parse(data);
}; 
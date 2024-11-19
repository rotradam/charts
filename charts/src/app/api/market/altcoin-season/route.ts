import { NextResponse } from 'next/server';
import type { AltcoinSeasonResponse } from '@/types/altcoin-season';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  console.log('API Route - Fetching data with params:', { start, end });

  try {
    const response = await fetch(
      `https://api.coinmarketcap.com/data-api/v3/altcoin-season/chart?start=${start}&end=${end}&convertId=2781`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: {
          revalidate: 300 // Cache for 5 minutes
        }
      }
    );

    if (!response.ok) {
      console.error('API Route - Response not OK:', response.status, response.statusText);
      throw new Error('Failed to fetch data');
    }

    const data: AltcoinSeasonResponse = await response.json();
    console.log('API Route - Data received:', {
      pointsCount: data.data.points.length,
      firstPoint: data.data.points[0],
      lastPoint: data.data.points[data.data.points.length - 1]
    });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route - Error fetching altcoin season data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch altcoin season data' },
      { status: 500 }
    );
  }
} 
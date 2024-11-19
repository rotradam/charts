'use client';

import * as React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { format } from 'date-fns';
import { useAltcoinSeason } from '@/lib/hooks/useAltcoinSeason';

interface AltcoinSeasonChartProps {
  className?: string;
}

export const AltcoinSeasonChart = ({ className = '' }: AltcoinSeasonChartProps) => {
  const now = Math.floor(Date.now() / 1000);
  const ninetyDaysAgo = now - (90 * 24 * 60 * 60);

  const { data, isLoading, error } = useAltcoinSeason(ninetyDaysAgo, now);

  const chartData = React.useMemo(() => {
    if (!data?.data?.points) return [];

    return data.data.points.map(point => ({
      date: new Date(parseInt(point.timestamp) * 1000),
      value: parseFloat(point.altcoinIndex),
      marketcap: parseFloat(point.altcoinMarketcap),
      name: point.name
    }));
  }, [data]);

  const bitcoinSeasonLine = data?.data?.dialConfigs[0]?.end || 25;
  const altcoinSeasonLine = data?.data?.dialConfigs[2]?.start || 75;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-900 rounded-lg border border-gray-700">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="text-sm text-gray-400">Loading chart data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-900 rounded-lg border border-gray-700">
        <div className="flex flex-col items-center gap-2">
          <span className="text-red-500">Failed to load chart data</span>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-[400px] bg-gray-900 rounded-lg border border-gray-700 p-4 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />
          <XAxis 
            dataKey="date"
            tickFormatter={(value) => format(new Date(value), 'MMM dd')}
            stroke="rgba(255,255,255,0.5)"
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
            }}
            labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
            formatter={(value: number) => [`${value.toFixed(2)}`, 'Index']}
          />
          <ReferenceLine
            y={bitcoinSeasonLine}
            stroke="rgba(255,255,255,0.3)"
            strokeDasharray="3 3"
            label={{
              value: 'Bitcoin Season',
              fill: 'rgba(255,255,255,0.5)',
              position: 'right',
            }}
          />
          <ReferenceLine
            y={altcoinSeasonLine}
            stroke="rgba(255,255,255,0.3)"
            strokeDasharray="3 3"
            label={{
              value: 'Altcoin Season',
              fill: 'rgba(255,255,255,0.5)',
              position: 'right',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 
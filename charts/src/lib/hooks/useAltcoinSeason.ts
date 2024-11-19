import { useQuery } from '@tanstack/react-query';
import { fetchAltcoinSeasonData } from '@/services/market/altcoinSeasonService';

export const useAltcoinSeason = (startTimestamp: number, endTimestamp: number) => {
  return useQuery({
    queryKey: ['altcoinSeason', startTimestamp, endTimestamp],
    queryFn: () => fetchAltcoinSeasonData(startTimestamp, endTimestamp),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: 2,
    onError: (error) => {
      console.error('Error fetching altcoin season data:', error);
    }
  });
}; 
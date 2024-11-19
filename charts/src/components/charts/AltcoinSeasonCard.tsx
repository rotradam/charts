"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAltcoinSeason } from "@/lib/hooks/useAltcoinSeason";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface AltcoinSeasonCardProps {
  className?: string;
}

export function AltcoinSeasonCard({ className = "" }: AltcoinSeasonCardProps) {
  const now = Math.floor(Date.now() / 1000);
  const ninetyDaysAgo = now - 90 * 24 * 60 * 60;
  const { data, isLoading } = useAltcoinSeason(ninetyDaysAgo, now);

  const currentValue = data?.data?.historicalValues?.now?.altcoinIndex;
  const yesterdayValue = data?.data?.historicalValues?.yesterday?.altcoinIndex;
  const lastWeekValue = data?.data?.historicalValues?.lastWeek?.altcoinIndex;
  const lastMonthValue = data?.data?.historicalValues?.lastMonth?.altcoinIndex;

  const getSeasonType = (value: string) => {
    const numValue = parseFloat(value);
    if (numValue <= 25) return "Bitcoin Season";
    if (numValue >= 75) return "Altcoin Season";
    return "Neutral";
  };

  const getSeasonColor = (value: string) => {
    const numValue = parseFloat(value);
    if (numValue <= 25) return "orange";
    if (numValue >= 75) return "blue";
    return "gray";
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Altcoin Season Index</span>
          {currentValue && (
            <Badge variant="outline" className={`bg-${getSeasonColor(currentValue)}-500/10`}>
              {getSeasonType(currentValue)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-8">
          {currentValue ? `${parseFloat(currentValue).toFixed(0)}/100` : "N/A"}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Yesterday</p>
            <p className="text-2xl font-semibold">
              {yesterdayValue ? parseFloat(yesterdayValue).toFixed(0) : "N/A"}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Last Week</p>
            <p className="text-2xl font-semibold">
              {lastWeekValue ? parseFloat(lastWeekValue).toFixed(0) : "N/A"}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Last Month</p>
            <p className="text-2xl font-semibold">
              {lastMonthValue ? parseFloat(lastMonthValue).toFixed(0) : "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
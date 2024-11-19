import { Suspense } from 'react';
import { AltcoinSeasonChart } from '@/components/charts/AltcoinSeasonChart';
import { AltcoinSeasonCard } from '@/components/charts/AltcoinSeasonCard';

export default function AltcoinSeasonPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Altcoin Season Analysis</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Suspense
              fallback={
                <div className="h-[400px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              }
            >
              <AltcoinSeasonChart />
            </Suspense>
          </div>
          <div>
            <AltcoinSeasonCard />
          </div>
        </div>
      </div>
    </main>
  );
} 
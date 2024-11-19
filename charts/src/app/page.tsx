import { Suspense } from 'react';
import { AltcoinSeasonChart } from '@/components/charts/AltcoinSeasonChart';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Altcoin Season Index</h1>
        <div className="grid gap-4">
          <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
            <Suspense 
              fallback={
                <div className="h-[400px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              }
            >
              <AltcoinSeasonChart className="bg-gray-900/50" />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}

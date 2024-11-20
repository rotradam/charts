import { Suspense } from "react"
import { DominanceChart } from "@/components/charts/DominanceChart"
import { fetchDominanceData } from "@/services/market/dominanceService"

export const revalidate = 300 // Revalidate every 5 minutes

export default async function DominancePage() {
  const data = await fetchDominanceData()
  
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <DominanceChart data={data} />
      </Suspense>
    </div>
  )
} 
import { z } from "zod"

const DominancePointSchema = z.object({
  dominance: z.array(z.number()).length(3),
  timestamp: z.string()
})

const DominanceResponseSchema = z.object({
  data: z.object({
    points: z.array(DominancePointSchema)
  }),
  status: z.object({
    error_code: z.string(),
    error_message: z.string()
  })
})

export type DominancePoint = z.infer<typeof DominancePointSchema>

export async function fetchDominanceData() {
  try {
    const response = await fetch(
      'https://api.coinmarketcap.com/data-api/v3/global-metrics/dominance/chart?range=all'
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch dominance data')
    }

    const data = await response.json()
    const validated = DominanceResponseSchema.parse(data)
    
    return validated.data.points
  } catch (error) {
    console.error('Error fetching dominance data:', error)
    throw error
  }
} 
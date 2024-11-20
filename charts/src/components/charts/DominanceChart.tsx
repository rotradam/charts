"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { format } from "date-fns"
import { useTheme } from "@/components/providers/ThemeProvider"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  bitcoin: {
    label: "Bitcoin",
    color: "hsl(39, 100%, 50%)",
  },
  ethereum: {
    label: "Ethereum",
    color: "hsl(227, 58%, 65%)",
  },
  others: {
    label: "Others",
    color: "hsl(var(--muted-foreground))",
  },
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  const { theme } = useTheme()
  
  if (active && payload && payload.length) {
    return (
      <div className={`rounded-lg border p-2 shadow-sm ${
        theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}>
        <div className="grid gap-2">
          <div className="text-xs text-muted-foreground">
            {format(new Date(label), "MMM dd, yyyy")}
          </div>
          <div className="grid gap-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm font-medium">{entry.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {`${entry.value.toFixed(2)}%`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function DominanceChart({ data }: { data: any[] }) {
  const { theme } = useTheme()
  const [timeRange, setTimeRange] = React.useState("365d")

  const processedData = React.useMemo(() => {
    return data.map((item) => ({
      date: new Date(parseInt(item.timestamp) * 1000),
      bitcoin: item.dominance[0],
      ethereum: item.dominance[1],
      others: item.dominance[2],
    }))
  }, [data])

  const filteredData = React.useMemo(() => {
    const now = new Date()
    const days = timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
    const startDate = new Date(now.setDate(now.getDate() - days))
    
    return timeRange === "all" 
      ? processedData 
      : processedData.filter(item => item.date >= startDate)
  }, [timeRange, processedData])

  return (
    <Card className="mr-14">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Market Dominance</CardTitle>
          <CardDescription>
            Bitcoin and Ethereum market dominance over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Last year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="365d">Last year</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillBTC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.bitcoin.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartConfig.bitcoin.color} stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillETH" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.ethereum.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartConfig.ethereum.color} stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillOthers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke={theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  if (date.getMonth() % 3 === 0 || date === filteredData[0].date) {
                    return format(date, "MMM yyyy")
                  }
                  return format(date, "MMM dd")
                }}
                stroke={theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}%`}
                stroke={theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="others"
                stackId="1"
                stroke={chartConfig.others.color}
                fill="url(#fillOthers)"
                name="Others"
              />
              <Area
                type="monotone"
                dataKey="ethereum"
                stackId="1"
                stroke={chartConfig.ethereum.color}
                fill="url(#fillETH)"
                name="Ethereum"
              />
              <Area
                type="monotone"
                dataKey="bitcoin"
                stackId="1"
                stroke={chartConfig.bitcoin.color}
                fill="url(#fillBTC)"
                name="Bitcoin"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 
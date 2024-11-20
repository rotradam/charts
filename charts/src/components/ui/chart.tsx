"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { cn } from "@/lib/utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({
  className,
  children,
  config,
  ...props
}: ChartProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

interface ChartLegendProps {
  className?: string
}

export function ChartLegend({ className }: ChartLegendProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {/* Legend content will be rendered by ChartLegendContent */}
    </div>
  )
}

interface ChartLegendContentProps {
  payload?: Array<{
    value: string
    color: string
    dataKey: string
  }>
}

export function ChartLegendContent({ payload }: ChartLegendContentProps) {
  if (!payload) return null

  return (
    <div className="flex flex-wrap gap-4">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
  }>
  label?: string
  labelFormatter?: (label: string) => string
  valueFormatter?: (value: number) => string
}

export function ChartTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
}: ChartTooltipProps) {
  if (!active || !payload) return null

  const formattedLabel = labelFormatter ? labelFormatter(label!) : label

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="text-xs text-muted-foreground">
          {formattedLabel}
        </div>
        <div className="grid gap-1">
          {payload.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />
              <span className="text-sm font-medium">
                {valueFormatter ? valueFormatter(item.value) : item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
}: ChartTooltipProps) {
  if (!active || !payload) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="text-xs text-muted-foreground">
          {labelFormatter ? labelFormatter(label!) : label}
        </div>
        <div className="grid gap-1">
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {valueFormatter ? valueFormatter(item.value) : item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
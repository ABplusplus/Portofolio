"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
  label: string
  icon?: React.ReactNode
}

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  label,
  icon,
}: StatCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const incrementTime = (duration * 1000) / end
    const counter = setInterval(() => {
      start += 1
      const progress = Math.min(start / end, 1)
      setCount(Math.floor(progress * end))
      if (start >= end) clearInterval(counter)
    }, incrementTime)

    return () => {
      clearInterval(counter)
    }
  }, [value, duration, isInView])

  const formattedCount = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <div ref={countRef} className="flex flex-col items-center p-4">
      {icon && <div className="text-primary mb-2 text-2xl">{icon}</div>}
      <div className="text-2xl md:text-3xl font-bold">
        {prefix}
        {formattedCount}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground text-center mt-1">{label}</div>
    </div>
  )
}

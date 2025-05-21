"use client"

import type React from "react"

import { motion } from "framer-motion"
import StatCounter from "@/components/stat-counter"

interface ProjectStat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  icon: React.ReactNode
}

interface ProjectStatsProps {
  stats: ProjectStat[]
}

export default function ProjectStats({ stats }: ProjectStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-6 p-4 rounded-lg bg-muted/20 backdrop-blur-sm"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <StatCounter
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              icon={stat.icon}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

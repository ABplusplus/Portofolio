"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  SiFlutter,
  SiKotlin,
  SiHtml5,
  SiJavascript,
  SiUnity,
  SiFirebase,
  SiMysql,
  SiGit,
  SiVuedotjs,
  SiCplusplus,
  SiPhp,
} from "react-icons/si"
import { DiJava } from "react-icons/di"

interface SkillIconProps {
  name: string
  icon: string
  variants?: any
}

export default function SkillIcon({ name, icon, variants }: SkillIconProps) {
  const getIcon = () => {
    switch (icon) {
      case "SiFlutter":
        return <SiFlutter className="h-8 w-8" />
      case "SiKotlin":
        return <SiKotlin className="h-8 w-8" />
      case "DiJava":
        return <DiJava className="h-8 w-8" />
      case "SiHtml5":
        return <SiHtml5 className="h-8 w-8" />
      case "SiJavascript":
        return <SiJavascript className="h-8 w-8" />
      case "SiUnity":
        return <SiUnity className="h-8 w-8" />
      case "SiFirebase":
        return <SiFirebase className="h-8 w-8" />
      case "SiMysql":
        return <SiMysql className="h-8 w-8" />
      case "SiGit":
        return <SiGit className="h-8 w-8" />
      case "SiVuedotjs":
        return <SiVuedotjs className="h-8 w-8" />
      case "SiCplusplus":
        return <SiCplusplus className="h-8 w-8" />
      case "SiPhp":
        return <SiPhp className="h-8 w-8" />
      default:
        return null
    }
  }

  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden h-full group hover:border-primary/50 transition-colors duration-300">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="text-primary mb-2"
          >
            {getIcon()}
          </motion.div>
          <span className="text-sm font-medium">{name}</span>
        </CardContent>
      </Card>
    </motion.div>
  )
}

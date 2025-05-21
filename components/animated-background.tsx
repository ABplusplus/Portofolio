"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 9000))

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5

        // Adjust color based on theme
        const isDark =
          theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        const hue = isDark ? 260 + Math.random() * 30 : 280 + Math.random() * 30
        const saturation = isDark ? "70%" : "60%"
        const lightness = isDark ? "50%" : "70%"
        const opacity = isDark ? Math.random() * 0.3 + 0.1 : Math.random() * 0.2 + 0.05

        this.color = `hsla(${hue}, ${saturation}, ${lightness}, ${opacity})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particlesArray.length = 0
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    const connectParticles = () => {
      const maxDistance = 150
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            // Adjust line color based on theme
            const isDark =
              theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
            const hue = isDark ? 260 : 280
            const saturation = isDark ? "70%" : "60%"
            const lightness = isDark ? "50%" : "70%"
            const lineOpacity = isDark ? opacity * 0.2 : opacity * 0.1

            ctx.strokeStyle = `hsla(${hue}, ${saturation}, ${lightness}, ${lineOpacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      connectParticles()
      requestAnimationFrame(animate)
    }

    init()
    animate()

    // Reinitialize particles when theme changes
    const handleThemeChange = () => {
      init()
    }

    window.addEventListener("themeChange", handleThemeChange)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("themeChange", handleThemeChange)
    }
  }, [theme])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  )
}

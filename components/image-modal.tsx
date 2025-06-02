"use client"

import type React from "react"

import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
}

export default function ImageModal({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) {
  const [loaded, setLoaded] = useState(false)

  // Reset loaded state when image changes
  useEffect(() => {
    setLoaded(false)
  }, [imageSrc])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleImageLoad = () => {
    setLoaded(true)
  }

  // Helper function to get the correct image path
  const getImagePath = (path: string) => {
    if (!path) return ""
    // If the path already includes the base path, don't add it again
    if (path.includes("/Portofolio") || !path.startsWith("/")) return path

    const basePath = process.env.NODE_ENV === "production" ? "/Portofolio" : ""
    return `${basePath}${path}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full max-h-[90vh] bg-background border border-border rounded-lg overflow-hidden shadow-xl"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <div className="w-full h-full flex items-center justify-center p-4">
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={getImagePath(imageSrc) || "/placeholder.svg"}
                alt={imageAlt}
                onLoad={handleImageLoad}
                className={`max-w-full max-h-[80vh] object-contain rounded-md transition-opacity duration-300 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "80vh",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

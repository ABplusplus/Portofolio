"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageModal from "@/components/image-modal"

interface ProjectCarouselProps {
  images: { src: string; alt: string }[]
  autoplay?: boolean
  interval?: number
}

export default function ProjectCarousel({ images, autoplay = true, interval = 5000 }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  }

  useEffect(() => {
    if (!autoplay || isPaused || images.length <= 1) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoplay, interval, images.length, isPaused])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const handleImageClick = (image: { src: string; alt: string }) => {
    setSelectedImage(image)
    setModalOpen(true)
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-64 bg-muted flex items-center justify-center rounded-t-lg">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <div
      className="relative w-full h-64 md:h-80 overflow-hidden rounded-t-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          custom={direction}
          variants={slideVariants}
          initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
          className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
          onClick={() => handleImageClick(images[currentIndex])}
        />
      </AnimatePresence>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/40 hover:bg-background/60 backdrop-blur-sm rounded-full h-8 w-8 p-1.5"
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-full w-full" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/40 hover:bg-background/60 backdrop-blur-sm rounded-full h-8 w-8 p-1.5"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-full w-full" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? "bg-primary w-4" : "bg-background/60 hover:bg-background/80"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={selectedImage?.src || ""}
        imageAlt={selectedImage?.alt || ""}
      />
    </div>
  )
}

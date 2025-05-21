"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  githubLink: string
  githubText: string
  index: number
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  githubLink,
  githubText,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full group hover:shadow-lg transition-all duration-300 border-primary/10 bg-background/50 backdrop-blur-sm">
        <div className="relative overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-48 object-cover transition-transform"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="sm" variant="secondary" className="rounded-full">
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  {githubText}
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

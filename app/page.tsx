"use client"

import type React from "react"

import {
  Github,
  Linkedin,
  Send,
  ChevronDown,
  ChevronUp,
  Users,
  Star,
  Download,
  Clock,
  Server,
  Leaf,
  MapPin,
  Bell,
  Gamepad,
  Trophy,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import SkillIcon from "@/components/skill-icon"
import ProjectCarousel from "@/components/project-carousel"
import LanguageCVButton from "@/components/language-cv-button"
import { useLanguage } from "@/contexts/language-context"
import ImageModal from "@/components/image-modal"

// Helper function to get the correct image path
const getImagePath = (path: string) => {
  const basePath = process.env.NODE_ENV === "production" ? "/Portofolio" : ""
  return `${basePath}${path}`
}

export default function Home() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: t("contact.success"),
      description: t("contact.successDescription"),
    })
    setFormData({ name: "", email: "", message: "" })
  }

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index)
  }

  const handleOpenModal = (image: { src: string; alt: string }) => {
    setSelectedImage(image)
    setModalOpen(true)
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const skillItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Project data with corrected image paths
  const projects = [
    {
      id: 0,
      title: t("projects.cineList.title"),
      description: t("projects.cineList.description"),
      longDescription: t("projects.cineList.longDescription"),
      images: [
        {
          src: getImagePath("/images/cinelist-home.png"),
          alt: "CineList home screen showing featured shows and new episodes",
        },
        {
          src: getImagePath("/images/cinelist-browse.png"),
          alt: "CineList browse screen showing anime and TV shows",
        },
        {
          src: getImagePath("/images/cinelist-show-details.png"),
          alt: "CineList show details screen with episode information",
        },
        {
          src: getImagePath("/images/cinelist-wwe.png"),
          alt: "CineList detailed view of WWE Raw with show information",
        },
      ],
      stats: [
        {
          value: 15000,
          label: t("projects.cineList.stats.users"),
          icon: <Users className="h-6 w-6" />,
        },
        {
          value: 250000,
          label: t("projects.cineList.stats.movies"),
          icon: <Server className="h-6 w-6" />,
        },
        {
          value: 4.8,
          suffix: "/5",
          label: t("projects.cineList.stats.rating"),
          icon: <Star className="h-6 w-6" />,
        },
        {
          value: 98,
          suffix: "%",
          label: t("projects.cineList.stats.satisfaction"),
          icon: <Trophy className="h-6 w-6" />,
        },
      ],
      tags: ["Kotlin", "Flutter", "Firebase", "Multilingual"],
      features: [
        t("projects.cineList.features.0"),
        t("projects.cineList.features.1"),
        t("projects.cineList.features.2"),
        t("projects.cineList.features.3"),
      ],
      githubLink: "https://github.com",
    },
    {
      id: 1,
      title: t("projects.planty.title"),
      description: t("projects.planty.description"),
      longDescription: t("projects.planty.longDescription"),
      images: [
        {
          src: getImagePath("/images/planty-dashboard.png"),
          alt: "Planty dashboard showing list of plants with their watering modes",
        },
        {
          src: getImagePath("/images/planty-history.png"),
          alt: "Planty watering history screen showing automatic and manual watering events",
        },
        {
          src: getImagePath("/images/planty-account.png"),
          alt: "Planty account settings with notification preferences",
        },
        {
          src: getImagePath("/images/planty-login.png"),
          alt: "Planty login screen with email and password fields",
        },
      ],
      stats: [
        {
          value: 5000,
          label: t("projects.planty.stats.devices"),
          icon: <Server className="h-6 w-6" />,
        },
        {
          value: 30,
          suffix: "%",
          label: t("projects.planty.stats.waterSaved"),
          icon: <Leaf className="h-6 w-6" />,
        },
        {
          value: 12500,
          label: t("projects.planty.stats.plants"),
          icon: <Leaf className="h-6 w-6" />,
        },
        {
          value: 99.7,
          suffix: "%",
          label: t("projects.planty.stats.uptime"),
          icon: <Zap className="h-6 w-6" />,
        },
      ],
      tags: ["IoT", "ESP32", "Firebase", "Arduino", "Multilingual"],
      features: [
        t("projects.planty.features.0"),
        t("projects.planty.features.1"),
        t("projects.planty.features.2"),
        t("projects.planty.features.3"),
      ],
      githubLink: "https://github.com",
    },
    {
      id: 2,
      title: t("projects.barrier.title"),
      description: t("projects.barrier.description"),
      longDescription: t("projects.barrier.longDescription"),
      images: [
        {
          src: getImagePath("/images/barrier-screentime.png"),
          alt: "Barrier screen time monitoring dashboard showing app usage statistics",
        },
        {
          src: getImagePath("/images/barrier-location.png"),
          alt: "Barrier location tracking feature showing child's location on a map",
        },
        {
          src: getImagePath("/images/barrier-request-time.png"),
          alt: "Barrier screen time request feature for children to request additional time",
        },
        {
          src: getImagePath("/images/barrier-login.png"),
          alt: "Barrier app login screen with secure authentication",
        },
      ],
      stats: [
        {
          value: 8500,
          label: t("projects.barrier.stats.families"),
          icon: <Users className="h-6 w-6" />,
        },
        {
          value: 25,
          suffix: "%",
          label: t("projects.barrier.stats.screenReduction"),
          icon: <Clock className="h-6 w-6" />,
        },
        {
          value: 1250,
          label: t("projects.barrier.stats.locationsTracked"),
          icon: <MapPin className="h-6 w-6" />,
        },
        {
          value: 98.2,
          suffix: "%",
          label: t("projects.barrier.stats.alertAccuracy"),
          icon: <Bell className="h-6 w-6" />,
        },
      ],
      tags: ["Flutter", "Dart", "Firebase", "Maps API", "Real-time"],
      features: [
        t("projects.barrier.features.0"),
        t("projects.barrier.features.1"),
        t("projects.barrier.features.2"),
        t("projects.barrier.features.3"),
      ],
      githubLink: "https://github.com",
    },
    {
      id: 3,
      title: t("projects.game.title"),
      description: t("projects.game.description"),
      longDescription: t("projects.game.longDescription"),
      images: [
        {
          src: getImagePath("/images/zombie-sheriff-gameplay.png"),
          alt: "Zombie Sheriff gameplay showing the player fighting zombies",
        },
        {
          src: getImagePath("/images/zombie-sheriff-shield.png"),
          alt: "Zombie Sheriff special ability shield activation",
        },
        {
          src: getImagePath("/images/zombie-sheriff-gameover.png"),
          alt: "Zombie Sheriff game over screen showing survival time",
        },
        {
          src: getImagePath("/images/zombie-sheriff-unity.png"),
          alt: "Zombie Sheriff made with Unity splash screen",
        },
      ],
      stats: [
        {
          value: 50000,
          label: t("projects.game.stats.downloads"),
          icon: <Download className="h-6 w-6" />,
        },
        {
          value: 4.7,
          suffix: "/5",
          label: t("projects.game.stats.rating"),
          icon: <Star className="h-6 w-6" />,
        },
        {
          value: 45,
          label: t("projects.game.stats.avgPlaytime"),
          suffix: "m",
          icon: <Clock className="h-6 w-6" />,
        },
        {
          value: 12,
          label: t("projects.game.stats.levels"),
          icon: <Gamepad className="h-6 w-6" />,
        },
      ],
      tags: ["Unity", "C#", "Game Design", "Mobile"],
      features: [
        t("projects.game.features.0"),
        t("projects.game.features.1"),
        t("projects.game.features.2"),
        t("projects.game.features.3"),
      ],
      githubLink: "https://github.com",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
        >
          Abdellah Boussaha
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground mb-6"
        >
          {t("hero.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-2xl text-lg mb-8"
        >
          {t("hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <LanguageCVButton />

          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="group">
              <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              GitHub
            </Button>
          </Link>

          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="group">
              <Linkedin className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              LinkedIn
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-muted/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("about.description")}</p>
          </motion.div>

          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-bold mb-10 text-center"
          >
            {t("about.skills")}
          </motion.h3>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-4xl mx-auto"
          >
            <SkillIcon name="Flutter" icon="SiFlutter" variants={skillItem} />
            <SkillIcon name="Kotlin" icon="SiKotlin" variants={skillItem} />
            <SkillIcon name="Java" icon="DiJava" variants={skillItem} />
            <SkillIcon name="HTML/CSS" icon="SiHtml5" variants={skillItem} />
            <SkillIcon name="JavaScript" icon="SiJavascript" variants={skillItem} />
            <SkillIcon name="Unity" icon="SiUnity" variants={skillItem} />
            <SkillIcon name="Firebase" icon="SiFirebase" variants={skillItem} />
            <SkillIcon name="SQL" icon="SiMysql" variants={skillItem} />
            <SkillIcon name="Git" icon="SiGit" variants={skillItem} />
            <SkillIcon name="Vue.js" icon="SiVuedotjs" variants={skillItem} />
            <SkillIcon name="C++" icon="SiCplusplus" variants={skillItem} />
            <SkillIcon name="PHP" icon="SiPhp" variants={skillItem} />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("projects.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("projects.subtitle")}</p>
          </motion.div>

          <div className="max-w-6xl mx-auto space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div
                  className={`bg-background/50 backdrop-blur-sm border border-primary/10 rounded-lg overflow-hidden transition-all duration-300 ${expandedProject === index ? "shadow-lg shadow-primary/10" : "hover:shadow-md"}`}
                >
                  <ProjectCarousel images={project.images} />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {expandedProject === index ? project.longDescription : project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleProject(index)}
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                      >
                        {expandedProject === index ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            {t("projects.showLess")}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            {t("projects.showMore")}
                          </>
                        )}
                      </Button>

                      <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="group">
                          <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                          GitHub
                        </Button>
                      </Link>
                    </div>

                    <AnimatePresence>
                      {expandedProject === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 overflow-hidden"
                        >
                          <h4 className="font-semibold mb-2">{t("projects.keyFeatures")}</h4>
                          <ul className="space-y-2 ml-5 list-disc text-muted-foreground">
                            {project.features.map((feature, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                {feature}
                              </motion.li>
                            ))}
                          </ul>

                          <div className="mt-6">
                            <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                              <Button className="w-full group">
                                <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                                {t("projects.viewOnGithub")}
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("contact.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("contact.description")}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {t("contact.name")}
                </label>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t("contact.namePlaceholder")}
                    required
                    className="bg-muted/20 border-primary/20 focus:border-primary"
                  />
                </motion.div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t("contact.email")}
                </label>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("contact.emailPlaceholder")}
                    required
                    className="bg-muted/20 border-primary/20 focus:border-primary"
                  />
                </motion.div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t("contact.message")}
                </label>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("contact.messagePlaceholder")}
                    required
                    className="min-h-[120px] bg-muted/20 border-primary/20 focus:border-primary"
                  />
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button type="submit" className="w-full group">
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  {t("contact.send")}
                </Button>
              </motion.div>
            </form>

            <div className="mt-10 flex justify-center space-x-6">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-muted/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Abdellah Boussaha. {t("footer.rights")}
          </p>
        </div>
      </footer>
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={selectedImage?.src || ""}
        imageAlt={selectedImage?.alt || ""}
      />
    </main>
  )
}

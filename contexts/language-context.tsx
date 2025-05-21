"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "Mobile / Full Stack Developer",
    "hero.description":
      "I'm Abdellah Boussaha, a Computer Science student and aspiring mobile and fullstack developer. I specialize in designing and building efficient, modern applications across both frontend and backend environments. With a strong foundation in frameworks like Flutter, Kotlin, Laravel, and Vue.js, I approach every development challenge with precision, curiosity, and a commitment to quality. I am currently seeking opportunities to contribute to dynamic teams and continue growing as a professional in the tech industry.",
    "hero.cta": "Download CV",

    // About Section
    "about.title": "About Me",
    "about.description":
      "I'm Abdellah Boussaha, a Computer Science and IT student with a passion for creating innovative digital solutions. I enjoy tackling complex problems and turning ideas into reality through clean, efficient code. My journey in tech has equipped me with a diverse skill set and a continuous learning mindset.",
    "about.skills": "My Skills",

    // Projects Section
    "projects.title": "My Projects",
    "projects.subtitle":
      "Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.",
    "projects.showMore": "Show more",
    "projects.showLess": "Show less",
    "projects.keyFeatures": "Key Features",
    "projects.projectStats": "Project Statistics",
    "projects.viewOnGithub": "View Project on GitHub",

    // CineList Project
    "projects.cineList.title": "CineList",
    "projects.cineList.description":
      "A mobile app developed with Kotlin & Flutter that allows users to track movies, series, and anime.",
    "projects.cineList.longDescription":
      "CineList is a comprehensive media tracking application built with Kotlin and Flutter. It allows users to create personalized lists of movies, TV series, and anime they've watched or plan to watch, with ratings, reviews, and recommendations based on user preferences. The app features a beautiful coral-themed UI and supports multiple languages.",
    "projects.cineList.features.0": "Personalized watchlists with custom categories and tags",
    "projects.cineList.features.1": "Integration with movie databases for comprehensive information",
    "projects.cineList.features.2": "Social features to share reviews and recommendations with friends",
    "projects.cineList.features.3": "Multilingual support with English and French interfaces",
    "projects.cineList.stats.users": "Active Users",
    "projects.cineList.stats.movies": "Movies Tracked",
    "projects.cineList.stats.rating": "App Rating",
    "projects.cineList.stats.satisfaction": "User Satisfaction",

    // Planty Project
    "projects.planty.title": "Planty",
    "projects.planty.description": "An IoT project using ESP32 and Firebase to manage smart plant watering systems.",
    "projects.planty.longDescription":
      "Planty is an innovative IoT solution that combines hardware and software to create an intelligent plant care system. Using ESP32 microcontrollers, moisture sensors, and a Firebase backend, it automates watering schedules and provides real-time monitoring through a mobile application. The app features both automatic and manual watering modes with detailed watering history tracking.",
    "projects.planty.features.0": "Real-time soil moisture monitoring with custom calibration",
    "projects.planty.features.1": "Dual watering modes: automatic scheduling and manual control",
    "projects.planty.features.2": "Comprehensive watering history with success/failure tracking",
    "projects.planty.features.3": "Customizable notification system for watering reminders",
    "projects.planty.stats.devices": "Active Devices",
    "projects.planty.stats.waterSaved": "Water Saved",
    "projects.planty.stats.plants": "Plants Monitored",
    "projects.planty.stats.uptime": "System Uptime",

    // Barrier Project
    "projects.barrier.title": "Barrier",
    "projects.barrier.description":
      "A parental control app built with Flutter, featuring live tracking and screen time monitoring.",
    "projects.barrier.longDescription":
      "Barrier is a comprehensive parental control application developed with Flutter that helps parents ensure their children's digital safety. It provides real-time location tracking, screen time monitoring with app-specific limits, and usage statistics, all with a focus on privacy and security.",
    "projects.barrier.features.0": "Real-time location tracking with detailed map view",
    "projects.barrier.features.1": "Screen time management with app-specific usage limits",
    "projects.barrier.features.2": "Time extension request system for children",
    "projects.barrier.features.3": "Secure authentication and multi-device management",
    "projects.barrier.stats.families": "Families Protected",
    "projects.barrier.stats.screenReduction": "Screen Time Reduced",
    "projects.barrier.stats.locationsTracked": "Locations Tracked",
    "projects.barrier.stats.alertAccuracy": "Alert Accuracy",

    // Game Project
    "projects.game.title": "Zombie Sheriff",
    "projects.game.description": "A mobile game made in Unity with a Wild West zombie theme.",
    "projects.game.longDescription":
      "Zombie Sheriff is an innovative mobile game developed in Unity that puts a unique spin on the bullet hell genre. Set in a Wild West environment, players control a sheriff fighting against waves of zombies, creating a fresh and engaging gameplay experience.",
    "projects.game.features.0": "Unique reverse gameplay mechanics where players control bullet patterns",
    "projects.game.features.1": "Immersive Wild West zombie theme with authentic visuals and sound design",
    "projects.game.features.2": "Progressive wave-based difficulty system with survival mechanics",
    "projects.game.features.3": "Special abilities and weapon upgrades to combat increasingly difficult zombie hordes",
    "projects.game.stats.downloads": "Downloads",
    "projects.game.stats.rating": "User Rating",
    "projects.game.stats.avgPlaytime": "Avg. Playtime",
    "projects.game.stats.levels": "Game Levels",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.description": "Have a question or want to work together? Feel free to contact me using the form below.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "Your email",
    "contact.messagePlaceholder": "Your message",
    "contact.success": "Message sent!",
    "contact.successDescription": "Thanks for reaching out. I'll get back to you soon.",

    // Footer
    "footer.rights": "All rights reserved.",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "À Propos",
    "nav.projects": "Projets",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "Développeur Mobile / Full Stack",
    "hero.description":
      "Je suis Abdellah Boussaha, étudiant en informatique et développeur mobile et fullstack en devenir. Je me spécialise dans la conception et la création d'applications modernes et efficaces, tant pour le frontend que le backend. Avec une solide maîtrise des frameworks comme Flutter, Kotlin, Laravel et Vue.js, j'aborde chaque défi de développement avec précision, curiosité et un engagement envers la qualité. Je recherche actuellement des opportunités pour contribuer à des équipes dynamiques et continuer à évoluer en tant que professionnel dans l'industrie technologique.",
    "hero.cta": "Télécharger CV",

    // About Section
    "about.title": "À Propos de Moi",
    "about.description":
      "Je suis Abdellah Boussaha, étudiant en informatique passionné par la création de solutions numériques innovantes. J'aime relever des défis complexes et transformer des idées en réalité grâce à un code propre et efficace. Mon parcours dans la technologie m'a doté d'un ensemble de compétences diverses et d'un état d'esprit d'apprentissage continu.",
    "about.skills": "Mes Compétences",

    // Projects Section
    "projects.title": "Mes Projets",
    "projects.subtitle":
      "Voici quelques projets sur lesquels j'ai travaillé. Chacun représente un défi unique et une expérience d'apprentissage.",
    "projects.showMore": "Voir plus",
    "projects.showLess": "Voir moins",
    "projects.keyFeatures": "Fonctionnalités Clés",
    "projects.projectStats": "Statistiques du Projet",
    "projects.viewOnGithub": "Voir le Projet sur GitHub",

    // CineList Project
    "projects.cineList.title": "CineList",
    "projects.cineList.description":
      "Une application mobile développée avec Kotlin et Flutter qui permet aux utilisateurs de suivre les films, séries et animes.",
    "projects.cineList.longDescription":
      "CineList est une application complète de suivi de médias construite avec Kotlin et Flutter. Elle permet aux utilisateurs de créer des listes personnalisées de films, séries TV et animes qu'ils ont regardés ou prévoient de regarder, avec des évaluations, des critiques et des recommandations basées sur les préférences des utilisateurs. L'application présente une belle interface thématique corail et prend en charge plusieurs langues.",
    "projects.cineList.features.0": "Listes de visionnage personnalisées avec catégories et tags personnalisés",
    "projects.cineList.features.1": "Intégration avec des bases de données de films pour des informations complètes",
    "projects.cineList.features.2":
      "Fonctionnalités sociales pour partager des critiques et des recommandations avec des amis",
    "projects.cineList.features.3": "Support multilingue avec interfaces en anglais et en français",
    "projects.cineList.stats.users": "Utilisateurs Actifs",
    "projects.cineList.stats.movies": "Films Suivis",
    "projects.cineList.stats.rating": "Note de l'App",
    "projects.cineList.stats.satisfaction": "Satisfaction Utilisateur",

    // Planty Project
    "projects.planty.title": "Planty",
    "projects.planty.description":
      "Un projet IoT utilisant ESP32 et Firebase pour gérer des systèmes d'arrosage intelligents.",
    "projects.planty.longDescription":
      "Planty est une solution IoT innovante qui combine matériel et logiciel pour créer un système intelligent de soin des plantes. Utilisant des microcontrôleurs ESP32, des capteurs d'humidité et un backend Firebase, il automatise les programmes d'arrosage et fournit une surveillance en temps réel via une application mobile. L'application propose des modes d'arrosage automatique et manuel avec un suivi détaillé de l'historique d'arrosage.",
    "projects.planty.features.0": "Surveillance de l'humidité du sol en temps réel avec calibration personnalisée",
    "projects.planty.features.1": "Modes d'arrosage doubles : programmation automatique et contrôle manuel",
    "projects.planty.features.2": "Historique d'arrosage complet avec suivi des succès/échecs",
    "projects.planty.features.3": "Système de notification personnalisable pour les rappels d'arrosage",
    "projects.planty.stats.devices": "Appareils Actifs",
    "projects.planty.stats.waterSaved": "Eau Économisée",
    "projects.planty.stats.plants": "Plantes Surveillées",
    "projects.planty.stats.uptime": "Disponibilité Système",

    // Barrier Project
    "projects.barrier.title": "Barrier",
    "projects.barrier.description":
      "Une application de contrôle parental construite avec Flutter, offrant le suivi en temps réel et la surveillance du temps d'écran.",
    "projects.barrier.longDescription":
      "Barrier est une application complète de contrôle parental développée avec Flutter qui aide les parents à assurer la sécurité numérique de leurs enfants. Elle fournit un suivi de localisation en temps réel, une surveillance du temps d'écran avec des limites spécifiques par application, et des statistiques d'utilisation, le tout avec un accent sur la confidentialité et la sécurité.",
    "projects.barrier.features.0": "Suivi de localisation en temps réel avec vue cartographique détaillée",
    "projects.barrier.features.1": "Gestion du temps d'écran avec limites d'utilisation par application",
    "projects.barrier.features.2": "Système de demande d'extension de temps pour les enfants",
    "projects.barrier.features.3": "Authentification sécurisée et gestion multi-appareils",
    "projects.barrier.stats.families": "Familles Protégées",
    "projects.barrier.stats.screenReduction": "Temps d'Écran Réduit",
    "projects.barrier.stats.locationsTracked": "Lieux Suivis",
    "projects.barrier.stats.alertAccuracy": "Précision des Alertes",

    // Game Project
    "projects.game.title": "Zombie Sheriff",
    "projects.game.description": "Un jeu mobile créé avec Unity sur le thème du Far West avec des zombies.",
    "projects.game.longDescription":
      "Zombie Sheriff est un jeu mobile innovant développé avec Unity qui apporte une touche unique au genre bullet hell. Situé dans un environnement Far West, les joueurs contrôlent un shérif combattant des vagues de zombies, créant une expérience de jeu fraîche et engageante.",
    "projects.game.features.0": "Mécaniques de jeu inversées uniques où les joueurs contrôlent les motifs de balles",
    "projects.game.features.1": "Thème immersif du Far West avec zombies, visuels et design sonore authentiques",
    "projects.game.features.2": "Système de difficulté progressive basé sur des vagues avec mécaniques de survie",
    "projects.game.features.3":
      "Capacités spéciales et améliorations d'armes pour combattre des hordes de zombies de plus en plus difficiles",
    "projects.game.stats.downloads": "Téléchargements",
    "projects.game.stats.rating": "Note Utilisateurs",
    "projects.game.stats.avgPlaytime": "Temps de Jeu Moy.",
    "projects.game.stats.levels": "Niveaux de Jeu",

    // Contact Section
    "contact.title": "Contactez-Moi",
    "contact.description":
      "Vous avez une question ou souhaitez collaborer ? N'hésitez pas à me contacter via le formulaire ci-dessous.",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Envoyer le Message",
    "contact.namePlaceholder": "Votre nom",
    "contact.emailPlaceholder": "Votre email",
    "contact.messagePlaceholder": "Votre message",
    "contact.success": "Message envoyé !",
    "contact.successDescription": "Merci de m'avoir contacté. Je vous répondrai bientôt.",

    // Footer
    "footer.rights": "Tous droits réservés.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

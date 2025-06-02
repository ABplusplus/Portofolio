"use client"

import { ArrowDownToLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface LanguageCVButtonProps {
  className?: string
}

export default function LanguageCVButton({ className }: LanguageCVButtonProps) {
  const { language, t } = useLanguage()

  // Helper function to get the correct CV path
  const getCVPath = (lang: string) => {
    const basePath = process.env.NODE_ENV === "production" ? "/Portofolio" : ""
    return `${basePath}/cv/abdellah-boussaha-cv-${lang}.pdf`
  }

  // Define CV URLs based on language
  const cvUrls = {
    en: getCVPath("en"),
    fr: getCVPath("fr"),
  }

  return (
    <Button size="lg" className={`group ${className}`} asChild>
      <a href={cvUrls[language]} download>
        <ArrowDownToLine className="mr-2 h-4 w-4 group-hover:animate-bounce" />
        {t("hero.cta")}
      </a>
    </Button>
  )
}

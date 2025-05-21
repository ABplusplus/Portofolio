"use client"

import { ArrowDownToLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface LanguageCVButtonProps {
  className?: string
}

export default function LanguageCVButton({ className }: LanguageCVButtonProps) {
  const { language, t } = useLanguage()

  // Define CV URLs based on language
  const cvUrls = {
    en: "/cv/abdellah-boussaha-cv-en.pdf",
    fr: "/cv/abdellah-boussaha-cv-fr.pdf",
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

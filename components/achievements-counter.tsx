"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export default function AchievementsCounter({ settings }: { settings?: any }) {
  const t = useTranslations("Achievements")
  const tAbout = useTranslations("About")
  const achievements = [
    { number: settings?.achievements?.projectsCompleted || 110, label: tAbout("completedProjects"), suffix: "+" },
    { number: settings?.achievements?.satisfiedClients || 100, label: tAbout("satisfiedClients"), suffix: "+" },
    { number: settings?.achievements?.yearsExperience || 15, label: tAbout("yearsExperience"), suffix: "+" },
    { number: settings?.achievements?.experts || 45, label: tAbout("experts"), suffix: "+" },
  ]
  const [counts, setCounts] = useState(achievements.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById("achievements-counter")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      achievements.forEach((achievement, index) => {
        let start = 0
        const end = achievement.number
        // Adjust duration for 2023 to appear naturally or we just don't animate years like that
        const duration = 2000
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCounts((prev) => {
              const newCounts = [...prev]
              newCounts[index] = end
              return newCounts
            })
            clearInterval(timer)
          } else {
            setCounts((prev) => {
              const newCounts = [...prev]
              newCounts[index] = Math.floor(start)
              return newCounts
            })
          }
        }, 16)
      })
    }
  }, [isVisible])

  return (
    <section id="achievements-counter" className="py-20 bg-[#0D2240]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="p-8 text-center bg-white/10 border-white/20">
              <div className="text-4xl md:text-5xl font-bold text-[#C4D600] mb-4">
                {counts[index]}
                {achievement.suffix}
              </div>
              <div className="text-lg text-white font-medium">{achievement.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

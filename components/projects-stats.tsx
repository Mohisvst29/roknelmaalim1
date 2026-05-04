"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export default function ProjectsStats() {
  const t = useTranslations("ProjectsStats")

  const stats = [
    {
      number: 250,
      label: t("completedProjects"),
      description: t("completedProjectsDesc"),
      suffix: "+",
    },
    {
      number: 15,
      label: t("yearsExperience"),
      description: t("yearsExperienceDesc"),
      suffix: "+",
    },
    {
      number: 150,
      label: t("satisfiedClients"),
      description: t("satisfiedClientsDesc"),
      suffix: "+",
    },
    {
      number: 50,
      label: t("ongoingProjects"),
      description: t("ongoingProjectsDesc"),
      suffix: "+",
    },
  ]

  const [counts, setCounts] = useState(stats.map(() => 0))
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

    const element = document.getElementById("projects-stats")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let start = 0
        const end = stat.number
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
    <section id="projects-stats" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">{t("title")}</h2>
          <p className="text-lg text-[#2D3640] max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-[#C4D600] mb-4">
                {counts[index]}
                {stat.suffix}
              </div>
              <h3 className="text-xl font-bold text-[#0D2240] mb-2">{stat.label}</h3>
              <p className="text-[#2D3640]">{stat.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

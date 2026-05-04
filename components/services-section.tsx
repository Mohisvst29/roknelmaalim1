"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@/navigation"
import { Palette, Building, Building2, Wrench, Zap, Hammer, Bold as Road, RefreshCw, Plus, Minus, Settings, HardHat, PenTool, Ruler, Eye, Map } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"

// Map icon names to components (reusing logic or centralized map would be better)
const IconMap: { [key: string]: any } = {
  Palette: Palette,
  Building: Building,
  Building2: Building2,
  Wrench: Wrench,
  Settings: Settings,
  Zap: Zap,
  Hammer: Hammer,
  RefreshCw: RefreshCw,
  Road: Road,
  HardHat: HardHat,
  PenTool: PenTool,
  Ruler: Ruler,
  Eye: Eye,
  Map: Map
}

interface Service {
  _id: string
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  details?: string
  detailsEn?: string
  href?: string
  icon: string
  // other props
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const t = useTranslations("ServicesSection")
  const locale = useLocale()
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  // Use top 8 services or all
  const displayServices = services.slice(0, 8)

  return (
    <section
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-800 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-30px]"
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">{t("title")}</h2>
          <p className="text-lg text-[#2D3640] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayServices.map((service, index) => {
            const IconComponent = IconMap[service.icon] || Building

            return (
              <Card
                key={service._id}
                className={`p-6 text-center hover:shadow-xl transition-all duration-500 cursor-pointer group ${expandedCard === index ? "ring-2 ring-[#C4D600] shadow-xl scale-105" : "hover:scale-105"
                  } ${isVisible ? `opacity-100 translate-y-0 delay-[${300 + index * 100}ms]` : "opacity-0 translate-y-10"}`}
                onClick={() => toggleCard(index)}
              >
                {service.image && (
                  <div className="w-full h-40 -mt-6 -mx-6 mb-6 overflow-hidden rounded-t-xl">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                )}
                <div
                  className={`bg-[#C4D600] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${expandedCard === index ? "bg-[#0D2240] scale-110" : "group-hover:scale-110 group-hover:rotate-12"
                    } ${service.image ? "-mt-12 relative z-10 border-4 border-white" : ""}`}
                >
                  <IconComponent
                    className={`w-8 h-8 transition-all duration-300 ${expandedCard === index ? "text-[#C4D600]" : "text-[#0D2240] group-hover:text-white"
                      }`}
                  />
                </div>

                <h3 className="text-xl font-bold text-[#0D2240] mb-3 group-hover:text-[#C4D600] transition-colors duration-300">
                  {locale === 'en' && service.titleEn ? service.titleEn : service.title}
                </h3>

                <p className="text-[#2D3640] mb-4 group-hover:text-[#0D2240] transition-colors duration-300">
                  {locale === 'en' && service.descriptionEn ? service.descriptionEn : service.description}
                </p>

                <div
                  className={`overflow-hidden transition-all duration-500 ${expandedCard === index ? "max-h-32 opacity-100 mb-4" : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="text-sm text-[#2D3640] leading-relaxed border-t pt-3">
                    {locale === 'en' && service.detailsEn ? service.detailsEn : (service.details || service.description)}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Link href={service.href || "#"}>
                    <Button
                      variant="outline"
                      className="w-full border-[#C4D600] text-[#C4D600] hover:bg-[#C4D600] hover:text-[#0D2240] bg-transparent transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t("serviceDetails")}
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#0D2240] hover:text-[#C4D600] transition-all duration-300"
                  >
                    {expandedCard === index ? (
                      <>
                        <Minus className="w-4 h-4 ml-1 transition-transform duration-300" />
                        {t("showLess")}
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 ml-1 transition-transform duration-300" />
                        {t("showMore")}
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        <div
          className={`text-center transition-all duration-800 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <Link href="/services">
            <Button
              size="lg"
              className="bg-[#0D2240] hover:bg-[#1a3a5c] text-white font-bold hover:scale-105 transition-all duration-300"
            >
              {t("viewAllServices")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

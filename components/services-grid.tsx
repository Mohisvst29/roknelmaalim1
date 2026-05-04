"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight, Building, Building2, Wrench, Palette, Settings, Zap, Hammer, RefreshCw, Bold, Sparkles, Shield, Truck, Home, HardHat, PenTool, Ruler, Eye, Map } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

// Map icon names to components
const IconMap: { [key: string]: any } = {
  Palette: Palette,
  Building: Building,
  Building2: Building2,
  Wrench: Wrench,
  Settings: Settings,
  Zap: Zap,
  Hammer: Hammer,
  RefreshCw: RefreshCw,
  Road: Bold,
  Sparkles: Sparkles,
  Shield: Shield,
  Truck: Truck,
  Home: Home,
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
  icon: string
  href?: string
  features?: string[]
  benefits?: string[]
}

interface ServicesGridProps {
  services: Service[]
}

const categories = [
  { id: "all", name: "جميع الخدمات" },
]

export default function ServicesGrid({ services = [] }: { services?: Service[] }) {
  const locale = useLocale()
  const t = useTranslations("Common")
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const filteredServices = services

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#C4D600]/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-[#C4D600]" />
            <span className="text-[#0D2240] font-semibold">{t("ourPremiumServices")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0D2240] mb-6">
            {t("integratedSolutions")}
          </h2>
          <p className="text-lg text-[#2D3640] max-w-3xl mx-auto leading-relaxed">
            {t("integratedSolutionsDesc")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const IconComponent = IconMap[service.icon] || Building

            return (
              <Card 
                key={service._id} 
                className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                onMouseEnter={() => setHoveredService(service._id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-br from-[#0D2240] to-[#1a3a5c] h-56 w-full flex items-center justify-center relative bg-cover bg-center"
                    style={service.image ? { backgroundImage: `url(${service.image})` } : {}}
                  >
                    {/* Add an overlay if there is an image */}
                    {service.image && <div className="absolute inset-0 bg-[#0D2240]/60 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-80"></div>}

                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform rotate-45 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                    </div>
                    
                    {/* Icon */}
                    <div className={`relative z-10 transition-all duration-300 ${hoveredService === service._id ? 'scale-110' : ''}`}>
                      <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-lg">
                        <IconComponent className="w-16 h-16 text-white" />
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-[#C4D600] p-3 rounded-full shadow-lg">
                        <IconComponent className="w-6 h-6 text-[#0D2240]" />
                      </div>
                    </div>

                    {/* Decorative dots */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#0D2240] mb-3 group-hover:text-[#C4D600] transition-colors">
                      {locale === 'en' && service.titleEn ? service.titleEn : service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {locale === 'en' && service.descriptionEn ? service.descriptionEn : service.description}
                  </p>

                  <Link href={service.href || "#"}>
                    <span className="inline-flex items-center text-[#0D2240] font-medium group-hover:text-[#C4D600] transition-colors mt-auto mb-6">
                      {t("readMore")}
                      <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:-translate-y-1 ${locale === 'ar' ? 'mr-2 -scale-x-100 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'}`} />
                    </span>
                  </Link>

                  {/* Quick features preview */}
                  {service.features && service.features.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 2).map((feature, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {service.features.length > 2 && (
                          <span className="text-xs bg-[#C4D600]/10 text-[#0D2240] px-3 py-1 rounded-full">
                            +{service.features.length - 2} {t("more")}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <Link href={service.href || "#"}>
                    <Button className="w-full bg-[#0D2240] hover:bg-[#1a3a5c] text-white group-hover:bg-[#C4D600] group-hover:text-[#0D2240] transition-all duration-300 shadow-lg hover:shadow-xl">
                      {t("serviceDetails")}
                      {locale === 'en' ? (
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      ) : (
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                      )}
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-lg border border-gray-100 flex-wrap justify-center">
            <div className="bg-[#C4D600] p-2 rounded-full">
              <Truck className="w-5 h-5 text-[#0D2240]" />
            </div>
            <div className={locale === 'en' ? "text-left" : "text-right"}>
              <p className="font-semibold text-[#0D2240]">{t("needConsultation")}</p>
              <p className="text-sm text-gray-600">{t("contactUsToday")}</p>
            </div>
            <Link href="/contact">
              <Button className="bg-[#0D2240] hover:bg-[#1a3a5c] text-white mx-4">
                {t("contactNow")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

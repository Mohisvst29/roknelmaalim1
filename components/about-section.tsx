"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "@/navigation"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

export default function AboutSection({ settings }: { settings?: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const locale = useLocale()
  const t = useTranslations("Common")
  const tAbout = useTranslations("About")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gray-50 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-800 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-6">{tAbout("title")}</h2>
            <p className="text-lg text-[#2D3640] leading-relaxed mb-6 whitespace-pre-line">
              {locale === 'en' 
                ? (settings?.home?.aboutSummaryEn || "Rukn Al-Ma'alim Contracting Company specializes in the field of general contracting, construction, building maintenance, and building. We provide integrated general contracting services and works, including the supervision and execution of general contracting projects in the Kingdom of Saudi Arabia. The company manager, Engineer Mohammed Aqlan (formerly Al-Namtia Establishment), has executed many governmental and private projects, delivered perfectly to ensure customer satisfaction and meet all their requirements.")
                : (settings?.home?.aboutSummary || "شركة ركن المعالم للمقاولات ، متخصصون في مجال المقاولات العامة والإنشاءات و أعمال صيانة المباني و التشييد ، حيث نقدم خدمات و أعمال مقاولات عامة متكاملة تشمل إشراف وتنفيذ مشاريع المقاولات العامة في المملكة العربية السعودية ، و قد نفذ مدير الشركة المهندس محمد عقلان (مؤسسة النمطية سابقا) العديد من المشاريع و الأعمال الحكومية والخاصة و تم تسليمها على أكمل وجه و ضمان نيل رضى العملاء و تلبية كافة متطلباتهم.")}
            </p>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-lg text-[#2D3640] leading-relaxed mb-4 whitespace-pre-line">
                {locale === 'en' 
                  ? (settings?.about?.contentEn || "Rukn Al-Ma'alim Contracting Company specializes in the field of general contracting, construction, building maintenance, and building. We provide integrated general contracting services and works, including the supervision and execution of general contracting projects in the Kingdom of Saudi Arabia. The company manager, Engineer Mohammed Aqlan (formerly Al-Namtia Establishment), has executed many governmental and private projects, delivered perfectly to ensure customer satisfaction and meet all their requirements.")
                  : (settings?.about?.content || "شركة ركن المعالم للمقاولات ، متخصصون في مجال المقاولات العامة والإنشاءات و أعمال صيانة المباني و التشييد ، حيث نقدم خدمات و أعمال مقاولات عامة متكاملة تشمل إشراف وتنفيذ مشاريع المقاولات العامة في المملكة العربية السعودية ، و قد نفذ مدير الشركة المهندس محمد عقلان (مؤسسة النمطية سابقا) العديد من المشاريع و الأعمال الحكومية والخاصة و تم تسليمها على أكمل وجه و ضمان نيل رضى العملاء و تلبية كافة متطلباتهم.")}
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <Link href="/about">
                <Button size="lg" className="bg-[#C4D600] hover:bg-[#e6a61a] text-[#0D2240] font-bold">
                  {t("readMore")}
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="border-[#0D2240] text-[#0D2240] hover:bg-[#0D2240] hover:text-white transition-all duration-300"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 ml-2 transition-transform duration-300" />
                    {t("showLess")}
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-300" />
                    {t("showMore")}
                  </>
                )}
              </Button>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-800 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[50px]"
            }`}
          >
            {[
              { number: `+${settings?.achievements?.projectsCompleted || 110}`, label: tAbout("completedProjects"), delay: "delay-100" },
              { number: `+${settings?.achievements?.satisfiedClients || 100}`, label: tAbout("satisfiedClients"), delay: "delay-200" },
              { number: `${settings?.achievements?.yearsExperience || 15}`, label: tAbout("yearsExperience"), delay: "delay-300" },
              { number: `+${settings?.achievements?.experts || 45}`, label: tAbout("experts"), delay: "delay-400" },
            ].map((item, index) => (
              <Card
                key={index}
                className={`p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer group ${item.delay} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="text-3xl font-bold text-[#C4D600] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {item.number}
                </div>
                <div className="text-[#2D3640] group-hover:text-[#0D2240] transition-colors duration-300">
                  {item.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

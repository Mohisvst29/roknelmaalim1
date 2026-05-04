"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

interface Slide {
  id: number | string
  image: string
  title: string
  titleEn?: string
  subtitle: string
  subtitleEn?: string
}

interface HeroSliderProps {
  slides: Slide[]
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const locale = useLocale()
  const t = useTranslations("Common")

  // Use effective slides or fallback if empty
  const effectiveSlides = slides && slides.length > 0 ? slides : []

  useEffect(() => {
    if (effectiveSlides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % effectiveSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [effectiveSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % effectiveSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + effectiveSlides.length) % effectiveSlides.length)
  }

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {effectiveSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url("${slide.image}")` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            {locale === 'en' && effectiveSlides[currentSlide]?.titleEn 
              ? effectiveSlides[currentSlide]?.titleEn 
              : effectiveSlides[currentSlide]?.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance opacity-90">
            {locale === 'en' && effectiveSlides[currentSlide]?.subtitleEn 
              ? effectiveSlides[currentSlide]?.subtitleEn 
              : effectiveSlides[currentSlide]?.subtitle}
          </p>
          <Button size="lg" className="bg-[#C4D600] hover:bg-[#e6a61a] text-[#0D2240] font-bold text-lg px-8 py-3">
            {t("contactUs")}
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {effectiveSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {effectiveSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 space-x-reverse">
          {effectiveSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-[#C4D600]" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

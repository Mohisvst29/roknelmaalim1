"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@/navigation"
import { ArrowLeft, ArrowRight, MapPin, Ruler, Eye, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

interface Project {
  _id: string
  title: string
  titleEn?: string
  location: string
  locationEn?: string
  category: string
  categoryEn?: string
  description: string
  descriptionEn?: string
  area: string
  areaEn?: string
  year: string
  image: string
  images?: string[]
  href?: string
}

interface ProjectsGalleryProps {
  projects: Project[]
}

const categories = [
  { id: "all", name: "جميع المشاريع" },
  { id: "مجمع سكني", name: "مجمع سكني" },
  { id: "جسر", name: "جسر" },
  { id: "مبنى سكني", name: "مبنى سكني" },
  { id: "سكن اجتماعي", name: "سكن اجتماعي" },
  { id: "مسجد", name: "مسجد" },
  { id: "مكتب إداري", name: "مكتب إداري" },
  { id: "مركز ترفيهي", name: "مركز ترفيهي" },
  { id: "فندق", name: "فندق" },
  { id: "مشاريع متعددة", name: "مشاريع متعددة" },
]

export default function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const locale = useLocale()
  const t = useTranslations("Common")
  const tProjects = useTranslations("Projects")

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

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <>
      <section
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">{tProjects("featuredProjects")}</h2>
          <p className="text-lg text-[#2D3640] max-w-2xl mx-auto">
            {tProjects("featuredProjectsDesc")}
          </p>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          <div className="flex items-center gap-2 mb-4 w-full justify-center">
            <Filter className="w-5 h-5 text-[#0D2240]" />
            <span className="text-[#0D2240] font-medium">{t("filterProjects")}:</span>
          </div>
          {categories.map((category, index) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 transition-all duration-300 hover:scale-105 ${activeCategory === category.id
                  ? "bg-[#C4D600] text-[#0D2240] hover:bg-[#C4D600]/90 shadow-lg"
                  : "border-[#0D2240] text-[#0D2240] hover:bg-[#0D2240] hover:text-white"
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project._id}
              className={`overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${hoveredProject === project._id ? "scale-105 shadow-2xl" : "hover:scale-105"}`}
              style={{ transitionDelay: `${index * 100 + 700}ms` }}
              onMouseEnter={() => setHoveredProject(project._id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    project.image ||
                    ""
                  }
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 z-20 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    const allImages = project.images && project.images.length > 0
                      ? [project.image, ...project.images].filter(Boolean)
                      : [project.image].filter(Boolean)
                    if (allImages.length > 0) {
                      setLightboxImages(allImages as string[])
                      setLightboxIndex(0)
                    }
                  }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/40 transition-colors">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#D87C31] text-white px-3 py-1 rounded-full text-sm font-medium transform group-hover:scale-110 transition-all duration-300 shadow-lg z-10">
                  {project.year}
                </div>
              </div>

              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold text-[#0D2240] mb-3 group-hover:text-[#D87C31] transition-colors duration-300">
                  {locale === 'en' && project.titleEn ? project.titleEn : project.title}
                </h3>
                <p className="text-[#2D3640] mb-4 leading-relaxed group-hover:text-[#0D2240] transition-colors duration-300">
                  {locale === 'en' && project.descriptionEn ? project.descriptionEn : project.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-[#2D3640] mb-4">
                  <div 
                    className="flex items-center gap-1 group-hover:text-[#D87C31] transition-colors duration-300 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://maps.google.com/?q=${encodeURIComponent(locale === 'en' && project.locationEn ? project.locationEn : project.location)}`, '_blank');
                    }}
                    title={t("openInMaps") || "افتح في الخرائط"}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{locale === 'en' && project.locationEn ? project.locationEn : project.location}</span>
                  </div>
                  <div className="flex items-center gap-1 group-hover:text-[#D87C31] transition-colors duration-300">
                    <Ruler className="w-4 h-4" />
                    <span>{locale === 'en' && project.areaEn ? project.areaEn : project.area}</span>
                  </div>
                </div>

                <a href={project.href || `/${locale}/projects/${project._id}`} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button className="w-full bg-[#0D2240] hover:bg-[#D87C31] hover:text-white text-white transition-all duration-300 group-hover:shadow-lg transform group-hover:-translate-y-1">
                    {t("projectDetails")}
                    {locale === 'en' ? (
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    ) : (
                      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                    )}
                  </Button>
                </a>
              </div>
            </Card>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              {t("noProjectsFound")}
            </div>
          )}
        </div>
      </div>
    </section>

      {/* Lightbox Modal */}
      {lightboxImages.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => setLightboxImages([])}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center max-w-7xl mx-auto">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-50 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxImages([])
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            {/* Navigation Buttons */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors z-50 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1))
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors z-50 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1))
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="relative w-full flex-1 max-h-[85vh] flex items-center justify-center px-16" onClick={(e) => e.stopPropagation()}>
              <img 
                src={lightboxImages[lightboxIndex]} 
                alt={`Project Image ${lightboxIndex + 1}`} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
              />
            </div>
            
            {/* Image Counter */}
            {lightboxImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm font-medium">
                {lightboxIndex + 1} / {lightboxImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}


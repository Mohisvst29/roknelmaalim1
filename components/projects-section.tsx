"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@/navigation"
import { ArrowLeft, Eye, MapPin } from "lucide-react"

interface Project {
  _id: string
  title: string
  location: string
  category: string
  description: string
  area: string
  year: string
  image: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleCardExpansion = (projectId: string) => {
    setExpandedCard(expandedCard === projectId ? null : projectId)
  }

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gray-50 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="container mx-auto px-4">
        {/* عنوان القسم */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">
            مشاريعنا بالسعوديةالمدينة المنورة
          </h2>
          <p className="text-lg text-[#2D3640] max-w-2xl mx-auto">
            تصفح مجموعة من أبرز مشاريعنا المنجزة في السعوديةالمدينة المنورة
          </p>
        </div>

        {/* شبكة المشاريع */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.slice(0, 6).map((project, index) => (
            <Card
              key={project._id}
              className={`overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${expandedCard === project._id ? "scale-105 shadow-2xl" : "hover:scale-105"}`}
              style={{ transitionDelay: `${index * 100 + 500}ms` }}
              onClick={() => toggleCardExpansion(project._id)}
            >
              <div className="relative overflow-hidden">
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 z-20 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxImage(project.image || "")
                  }}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/40 transition-colors">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <img
                  src={project.image || ""}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-[#D87C31] text-white px-3 py-1 rounded-full text-sm font-medium transform group-hover:scale-110 transition-transform duration-300 z-10">
                  {project.category}
                </div>
              </div>

              {/* تفاصيل المشروع */}
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold text-[#0D2240] mb-2 group-hover:text-[#D87C31] transition-colors duration-300">
                  {project.title}
                </h3>
                <div 
                  className="flex items-center gap-2 text-[#2D3640] mb-4 group-hover:text-[#D87C31] transition-colors duration-300 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://maps.google.com/?q=${encodeURIComponent(project.location)}`, '_blank');
                  }}
                  title="افتح في الخرائط"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ${expandedCard === project._id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <p className="text-sm text-[#2D3640] mb-3">{project.description}</p>
                    <div className="flex justify-between text-xs text-[#2D3640]">
                      <span>المساحة: {project.area}</span>
                      <span>السنة: {project.year}</span>
                    </div>
                  </div>
                </div>

                <Link href={`/projects/${project._id}`} onClick={(e) => e.stopPropagation()} target="_blank">
                  <Button
                    variant="outline"
                    className="w-full border-[#0D2240] text-[#0D2240] hover:bg-[#0D2240] hover:text-white bg-transparent mt-4 group-hover:border-[#D87C31] group-hover:text-[#D87C31] transition-all duration-300"
                  >
                    عرض التفاصيل
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* زر عرض جميع المشاريع */}
        <div
          className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          <Link href="/projects">
            <Button
              size="lg"
              className="bg-[#D87C31] hover:bg-[#b86624] text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              عرض جميع مشاريعنا
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <img 
              src={lightboxImage} 
              alt="Project Image Expanded" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxImage(null)
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}


"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, MessageCircle, MapPin, Calendar, Ruler, Clock, Image as ImageIcon } from "lucide-react"
import { Link } from "@/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface ProjectDetailProps {
  project: {
    title: string
    location?: string
    category?: string
    description: string
    area?: string
    duration?: string
    year?: string
    image?: string
    images?: string[]
    services?: string[]
    features?: string[]
  }
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeImage, setActiveImage] = useState(0)

  const categoryNames = {
    residential: "سكني",
    commercial: "تجاري",
    industrial: "صناعي",
    renovation: "ترميم",
  }

  // Combine main image with additional images, with fallbacks
  const allImages = project.images && project.images.length > 0 
    ? [project.image, ...project.images].filter(Boolean)
    : project.image 
    ? [project.image]
    : []

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={allImages[0] || ""}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0D2240]/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-white hover:text-[#C4D600]">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/projects" className="text-white hover:text-[#C4D600]">المشاريع</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#C4D600]">{project.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="bg-[#C4D600] text-[#0D2240] px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
              {categoryNames[project.category as keyof typeof categoryNames] || project.category || "مشروع"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">{project.title}</h1>
            <p className="text-xl md:text-2xl leading-relaxed text-balance opacity-90">{project.description}</p>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Project Images */}
            <div className="lg:col-span-2">
              <div className="relative mb-6">
                <img
                  src={allImages[activeImage] || ""}
                  alt={project.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {activeImage + 1} / {allImages.length}
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative rounded-lg overflow-hidden transition-all ${activeImage === index ? "ring-2 ring-[#C4D600] scale-105" : "hover:scale-105"}`}
                    >
                      <img
                        src={image || ""}
                        alt={`${project.title} - صورة ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div>
              <Card className="p-6 mb-6">
                <h3 className="text-xl font-bold text-[#0D2240] mb-4">تفاصيل المشروع</h3>
                <div className="space-y-4">
                  {project.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#C4D600]" />
                      <div className="flex-1">
                        <span className="text-sm text-[#2D3640]">الموقع</span>
                        <p className="font-medium text-[#0D2240]">{project.location}</p>
                      </div>
                      {project.mapLink && (
                        <a href={project.mapLink} target="_blank" rel="noopener noreferrer" className="bg-[#C4D600] text-[#0D2240] hover:bg-[#C4D600]/90 px-3 py-1 text-xs rounded-full font-medium transition-colors">
                          فتح الخريطة
                        </a>
                      )}
                    </div>
                  )}
                  {project.area && (
                    <div className="flex items-center gap-3">
                      <Ruler className="w-5 h-5 text-[#C4D600]" />
                      <div>
                        <span className="text-sm text-[#2D3640]">المساحة</span>
                        <p className="font-medium text-[#0D2240]">{project.area}</p>
                      </div>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#C4D600]" />
                      <div>
                        <span className="text-sm text-[#2D3640]">مدة التنفيذ</span>
                        <p className="font-medium text-[#0D2240]">{project.duration}</p>
                      </div>
                    </div>
                  )}
                  {project.year && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#C4D600]" />
                      <div>
                        <span className="text-sm text-[#2D3640]">سنة الإنجاز</span>
                        <p className="font-medium text-[#0D2240]">{project.year}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {project.services && project.services.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-[#0D2240] mb-4">الخدمات المقدمة</h3>
                  <div className="space-y-2">
                    {project.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#C4D600]" />
                        <span className="text-[#2D3640]">{service}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Features */}
      {project.features && project.features.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">مميزات المشروع</h2>
              <p className="text-lg text-[#2D3640] max-w-2xl mx-auto">
                العناصر المميزة التي جعلت هذا المشروع نموذجاً للجودة والإتقان
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {project.features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#C4D600] p-2 rounded-full flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#0D2240]" />
                    </div>
                    <p className="text-[#2D3640] leading-relaxed">{feature}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 bg-gradient-to-r from-[#0D2240] to-[#1a3a5c] text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">مشروع مماثل؟</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              تواصل معنا لمناقشة مشروعك والحصول على استشارة مجانية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#C4D600] text-[#0D2240] hover:bg-[#C4D600]/90 px-8">
                  <MessageCircle className="w-5 h-5 ml-2" />
                  احصل على عرض سعر
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#0D2240] px-8 bg-transparent"
                >
                  <ArrowLeft className="w-5 h-5 ml-2" />
                  عودة للمشاريع
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"

export default function SuccessPartners({ settings }: { settings?: any }) {
  const t = useTranslations("Partners")
  const partners = settings?.partners || []

  if (partners.length === 0) return null

  return (
    <section className="py-16 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">{t("title")}</h2>
        <div className="w-24 h-1 bg-[#C4D600] mx-auto rounded-full mb-4"></div>
        <p className="text-lg text-gray-600">{t("subtitle")}</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...partners, ...partners, ...partners].map((logoUrl: string, i: number) => (
            <div key={i} className="mx-8 w-40 h-20 relative grayscale hover:grayscale-0 transition-all duration-300">
              <Image 
                src={logoUrl} 
                alt="شريك نجاح" 
                fill 
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

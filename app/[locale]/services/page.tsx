import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageBanner from "@/components/page-banner"
import ServicesGrid from "@/components/services-grid"
import ServicesCTA from "@/components/services-cta"
import { getServices } from "@/actions/service-actions"
import connectDB from "@/lib/db"
import SiteSettings from "@/models/SiteSettings"

export const metadata = {
  title: "خدماتنا - ركن المعالم للمقاولات",
  description:
    "شركة ركن المعالم للمقاولات تقدم خدمات المقاولات، الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية بأعلى جودة في السعودية، المدينة المنورة والمملكة.",
  keywords: [
    "مقاولات عامة",
    "الأعمال المدنية",
    "شبكات الاتصالات",
    "أنظمة التيار الخفيف",
    "الخدمات الكهروميكانيكية",
    "شركة ركن المعالم للمقاولات",
    "مقاولات السعودية، المدينة المنورة",
  ],
  openGraph: {
    title: "خدماتنا - ركن المعالم للمقاولات",
    description:
      "شركة ركن المعالم للمقاولات تقدم خدمات المقاولات، الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية بأعلى جودة في السعودية، المدينة المنورة والمملكة.",
    url: "https://www.rukanalmaalim.com/services",
    siteName: "ركن المعالم للمقاولات",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "خدماتنا - ركن المعالم للمقاولات",
    description:
      "شركة ركن المعالم للمقاولات تقدم خدمات المقاولات، الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية بأعلى جودة في السعودية، المدينة المنورة والمملكة.",
  },
}

export default async function ServicesPage() {
  await connectDB()

  const [services, settings] = await Promise.all([
    getServices(),
    SiteSettings.findOne({}).lean()
  ])
  
  const bannerImage = settings?.covers?.services || ''
  const bannerTitle = 'خدماتنا'
  const bannerSubtitle = 'نقدم مجموعة شاملة من الخدمات الهندسية والمقاولات لتلبية جميع احتياجاتكم'

  const plainServices = JSON.parse(JSON.stringify(services))

  return (
    <main className="min-h-screen">
      <Header />
      <PageBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        fallbackImage=""
      />
      <ServicesGrid services={plainServices} />
      <ServicesCTA />
      <Footer />
      <FloatingContact />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "ركن المعالم للمقاولات",
            "description": "شركة متخصصة في الأعمال المدنية والاتصالات وأنظمة التيار الخفيف والكهروميكانيكا.",
            "url": "https://www.rukanalmaalim.com/",
            "telephone": "+966538833968",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "السعودية، المدينة المنورة",
              "addressLocality": "السعودية، المدينة المنورة",
              "addressCountry": "SA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 24.7136,
              "longitude": 46.6753
            },
            "openingHours": "Su,Mo,Tu,We,Th 08:00-17:00",
            "sameAs": [
              "https://www.rukanalmaalim.com/"
            ]
          }),
        }}
      />
    </main>
  )
}

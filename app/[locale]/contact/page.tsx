import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PageBanner from "@/components/page-banner"
import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"
import ContactMap from "@/components/contact-map"
import connectDB from "@/lib/db"
import SiteSettings from "@/models/SiteSettings"

export const metadata = {
  title: "تواصل معنا - ركن المعالم للمقاولات",
  description:
    "تواصل مع شركة ركن المعالم للمقاولات للحصول على استشارة وعرض سعر مخصص لمشاريع المقاولات والأنظمة الكهروميكانيكية والاتصالات في السعوديةالمدينة المنورة.",
  keywords: [
    "تواصل معنا",
    "شركة ركن المعالم للمقاولات",
    "شركة مقاولات بالسعوديةالمدينة المنورة",
    "اتصل بنا مقاولات",
    "طلب عرض سعر",
    "استشارة مقاولات",
    "الأعمال المدنية",
    "أنظمة التيار الخفيف",
    "البنية التحتية",
  ],
  openGraph: {
    title: "تواصل معنا - ركن المعالم للمقاولات",
    description:
      "تواصل مع شركة ركن المعالم للمقاولات للحصول على استشارة وعرض سعر مخصص لمشاريع المقاولات والأنظمة الكهروميكانيكية والاتصالات في السعوديةالمدينة المنورة.",
    url: "https://www.rukanalmaalim.com/contact",
    siteName: "ركن المعالم للمقاولات",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "https://www.rukanalmaalim.com/contact-hero.png",
        alt: "تواصل معنا - ركن المعالم للمقاولات",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تواصل معنا - ركن المعالم للمقاولات",
    description:
      "تواصل مع شركة ركن المعالم للمقاولات للحصول على استشارة وعرض سعر مخصص لمشاريع المقاولات والأنظمة الكهروميكانيكية والاتصالات في السعوديةالمدينة المنورة.",
  },
}

export default async function ContactPage() {
  let phone = "+966536788004"
  let bannerImage = ''
  let bannerTitle = 'تواصل معنا'
  let bannerSubtitle = 'نحن هنا لمساعدتك في تحقيق مشروع أحلامك. تواصل معنا الآن للحصول على استشارة'

  try {
    const db = await connectDB()
    if (db) {
      const settings = await SiteSettings.findOne({}).lean()
      if (settings?.contact?.whatsapps?.length > 0) phone = settings.contact.whatsapps[0]
      if (settings?.covers?.contact) bannerImage = settings.covers.contact
    }
  } catch (e) {}

  return (
    <main className="min-h-screen">
      <Header />
      <PageBanner
        image={bannerImage}
        title={bannerTitle}
        subtitle={bannerSubtitle}
        fallbackImage=""
      />
      <div className="grid lg:grid-cols-2 gap-0">
        <ContactForm whatsappPhone={phone} />
        <ContactInfo />
      </div>
      <ContactMap />
      <Footer />
      <FloatingContact />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "تواصل معنا - ركن المعالم للمقاولات",
            description:
              "تواصل مع شركة ركن المعالم للمقاولات للحصول على استشارة وعرض سعر مخصص لمشاريع المقاولات والأنظمة الكهروميكانيكية والاتصالات في السعوديةالمدينة المنورة.",
            url: "https://www.rukanalmaalim.com/contact",
            mainEntity: {
              "@type": "Organization",
              name: "ركن المعالم للمقاولات",
              url: "https://www.rukanalmaalim.com/",
              telephone: phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: "السعوديةالمدينة المنورة",
                addressCountry: "SA",
              },
            },
          }),
        }}
      />
    </main>
  )
}

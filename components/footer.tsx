import { Link } from "@/navigation";
import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// أيقونات سناب شات و تيك توك مخصصة
const SnapchatIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 448 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M424.2 284c-11.8-6.1-26.6-8.6-43.6-7.3-8.8 33-28.9 59.9-57 80.2 4.4 13.9 16.7 26.5 35 36.3 32.5 17.5 54.3 22.8 61.3 24.3 7.8 1.7 10 7.8 8.1 11.5-1.4 2.8-5.7 4.1-12.7 4.1h-.4c-53-1-105-38.4-133.3-70.9-10.7 7.7-25 12.3-43 12.3s-32.3-4.6-43-12.3c-28.3 32.5-80.3 69.9-133.3 70.9-.1 0-.3 0-.4 0-7 0-11.3-1.3-12.7-4.1-1.9-3.7.3-9.8 8.1-11.5 7-1.5 28.8-6.8 61.3-24.3 18.2-9.8 30.6-22.4 35-36.3-28.1-20.4-48.2-47.3-57-80.2-17-1.3-31.8 1.2-43.6 7.3-3.6 1.8-6.9 2.5-9.4 2.5-7.5 0-11.5-5.9-10.3-10.7 1.8-7 13.2-15.6 30.5-22.1 27.2-10.2 60.1-12 87-4.2 13-33 11-103.5-3.3-149.7C92.2 47.9 146.4 15.3 224 15.3s131.8 32.6 150.3 84c-14.3 46.2-16.3 116.7-3.3 149.7 26.9-7.8 59.8-6 87 4.2 17.3 6.6 28.7 15.2 30.5 22.1 1.2 4.8-2.8 10.7-10.3 10.7-2.6-.1-5.9-.8-9.5-2.6z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M128 0c70.7 0 128 57.3 128 128s-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0z"
      fill="#010101"
    />
    <path
      d="M165.2 56.2c-3.4 0-6.7-.3-9.9-1v66.8c-5.7 0-11.4-1.9-15.9-5.4-4.5-3.5-7.7-8.5-8.9-14.1-1.2-5.7-.5-11.5 2-16.8V128c-5.7 0-11.4-1.9-15.9-5.4-4.5-3.5-7.7-8.5-8.9-14.1-1.2-5.7-.5-11.5 2-16.8v91.2c-5.7 0-11.4-1.9-15.9-5.4-4.5-3.5-7.7-8.5-8.9-14.1-1.2-5.7-.5-11.5 2-16.8v98.8c-8.1-2.5-15.4-7.7-20.8-14.6-5.5-6.9-8.6-15.4-8.6-24.2 0-18.7 15.2-33.9 33.9-33.9 3.4 0 6.7.3 9.9 1v-66.8c5.7 0 11.4 1.9 15.9 5.4 4.5 3.5 7.7 8.5 8.9 14.1 1.2 5.7.5 11.5-2 16.8v-91.2c5.7 0 11.4 1.9 15.9 5.4 4.5 3.5 7.7 8.5 8.9 14.1 1.2 5.7.5 11.5-2 16.8V56.2z"
      fill="#25F4EE"
    />
    <path
      d="M165.2 56.2c-3.4 0-6.7-.3-9.9-1v66.8c5.7 0 11.4 1.9 15.9 5.4 4.5 3.5 7.7 8.5 8.9 14.1 1.2 5.7.5 11.5-2 16.8v-66.8c-3.3 0-6.6-.3-9.9-1z"
      fill="#FE2C55"
    />
  </svg>
);

import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { getTranslations, getLocale } from "next-intl/server";

import Service from "@/models/Service";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Navigation");
  const tContact = await getTranslations("Contact");
  const locale = await getLocale();
  let logoUrl = "/logo.png"
  let logoHeight = "48" // default px
  
  let contactEmail = "info@diamondgrowth.com"
  let contactLocation = "طريق الملك عبدالعزيز، السعودية، المدينة المنورة"
  let contactPhone = "+966538833968"
  let servicesList: any[] = []
  
  let socialFacebook = ""
  let socialTwitter = ""
  let socialInstagram = ""
  let socialLinkedin = ""
  let socialSnapchat = ""
  let socialTiktok = ""

  try {
    const db = await connectDB()
    if (db) {
      const settings = await SiteSettings.findOne({}).lean() || {}
      
      if (settings?.logo?.url) logoUrl = settings.logo.url
      if (settings?.logo?.height) logoHeight = settings.logo.height.toString()
      
      if (settings?.contact?.emails?.length > 0) contactEmail = settings.contact.emails[0]
      if (settings?.contact?.whatsapps?.length > 0) contactPhone = settings.contact.whatsapps[0]
      if (settings?.contact?.addresses?.length > 0) contactLocation = settings.contact.addresses.join("، ")
      
      socialFacebook = settings?.social?.facebook || ""
      socialTwitter = settings?.social?.twitter || ""
      socialInstagram = settings?.social?.instagram || ""
      socialLinkedin = settings?.social?.linkedin || ""
      socialSnapchat = settings?.social?.snapchat || ""
      socialTiktok = settings?.social?.tiktok || ""

      const dbServices = await Service.find({}).sort({ order: 1, createdAt: -1 }).limit(4).lean()
      servicesList = JSON.parse(JSON.stringify(dbServices))
    }
  } catch (error) {
    console.error("Failed to fetch footer settings:", error)
  }

  return (
    <footer className="bg-[#0D2240] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6 bg-white p-3 rounded-lg inline-block">
              {logoUrl !== '/logo.png' ? (
                <img
                  src={logoUrl}
                  alt="ركن المعالم للمقاولات"
                  style={{ height: `${logoHeight}px`, width: 'auto' }}
                />
              ) : (
                <div className="flex items-center">
                  <div className="bg-[#C4D600] text-[#0D2240] font-black text-2xl p-2 rounded mr-2 ml-2">RM</div>
                  <div className="flex flex-col">
                    <span className="font-black text-xl leading-none text-[#0D2240]">ركن المعالم</span>
                    <span className="text-xs font-bold text-[#2D3640] tracking-wider">للمقاولات</span>
                  </div>
                </div>
              )}
            </div>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {t("aboutCompany")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("quickLinks")}</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-[#C4D600] transition-colors">{tNav("home")}</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-[#C4D600] transition-colors">{tNav("about")}</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-[#C4D600] transition-colors">{tNav("services")}</Link></li>
              <li><Link href="/projects" className="text-gray-300 hover:text-[#C4D600] transition-colors">{tNav("portfolio")}</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-[#C4D600] transition-colors">{tNav("blog")}</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-[#C4D600] transition-colors">{tNav("contact")}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("ourServices")}</h4>
            <ul className="space-y-3 text-gray-300">
              {servicesList.length > 0 ? servicesList.map((service, idx) => (
                <li key={idx}>
                  <Link href={service.href || `/services/${service._id}`} className="hover:text-[#C4D600] transition-colors">
                    {locale === 'en' && service.titleEn ? service.titleEn : service.title}
                  </Link>
                </li>
              )) : (
                <>
                  <li><Link href="/services/general-contracting" className="hover:text-[#C4D600] transition-colors">المقاولات العامة</Link></li>
                  <li><Link href="/services/architectural-design" className="hover:text-[#C4D600] transition-colors">التصميم المعماري</Link></li>
                  <li><Link href="/services/building-maintenance" className="hover:text-[#C4D600] transition-colors">صيانة المباني</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t("contactInfo")}</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className={`w-5 h-5 text-[#C4D600] ${locale === 'en' ? 'mr-3' : 'ml-3'}`} />
                <span className="text-gray-300" dir="ltr">{contactPhone}</span>
              </div>
              <div className="flex items-center">
                <Mail className={`w-5 h-5 text-[#C4D600] ${locale === 'en' ? 'mr-3' : 'ml-3'}`} />
                <span className="text-gray-300">{contactEmail}</span>
              </div>
              <div className="flex items-start">
                <MapPin className={`w-5 h-5 text-[#C4D600] mt-1 ${locale === 'en' ? 'mr-3' : 'ml-3'}`} />
                <span className="text-gray-300">
                  {contactLocation.split('،').map((part, index) => (
                    <span key={index}>{part}{index < contactLocation.split('،').length - 1 && '،'}<br /></span>
                  ))}
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h5 className="text-lg font-bold mb-4">{t("followUs")}</h5>
              <div className="flex gap-3 flex-wrap">
                {socialFacebook && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialFacebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك"><Facebook className="w-5 h-5" /></a>
                  </Button>
                )}
                {socialTwitter && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialTwitter} target="_blank" rel="noopener noreferrer" aria-label="تويتر"><Twitter className="w-5 h-5" /></a>
                  </Button>
                )}
                {socialInstagram && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialInstagram} target="_blank" rel="noopener noreferrer" aria-label="انستغرام"><Instagram className="w-5 h-5" /></a>
                  </Button>
                )}
                {socialLinkedin && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialLinkedin} target="_blank" rel="noopener noreferrer" aria-label="لينكد ان"><Linkedin className="w-5 h-5" /></a>
                  </Button>
                )}
                {socialSnapchat && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialSnapchat} target="_blank" rel="noopener noreferrer" aria-label="سناب شات"><SnapchatIcon /></a>
                  </Button>
                )}
                {socialTiktok && (
                  <Button asChild size="sm" variant="outline" className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent p-3">
                    <a href={socialTiktok} target="_blank" rel="noopener noreferrer" aria-label="تيك توك"><TikTokIcon /></a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">
            {t("copyright")}
          </p>
          <p className="text-gray-300 mt-2">
            {t("designedBy")}{" "}
            <a
              href="https://wa.me/966541430116"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition"
            >
              {t("rawadDigital")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

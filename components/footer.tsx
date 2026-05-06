import { Link } from "@/navigation";
import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// أيقونات سناب شات و تيك توك مخصصة
const SnapchatIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
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

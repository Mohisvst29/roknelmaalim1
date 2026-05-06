import { Link } from "@/navigation";
import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// أيقونات سناب شات و تيك توك مخصصة
const SnapchatIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.988 1.48C9.53 1.48 7.37 2.378 5.753 3.996c-1.616 1.616-2.513 3.776-2.513 6.234 0 1.25.132 2.457.37 3.593.203.963.09 1.826-.356 2.65a4.298 4.298 0 0 1-1.424 1.53c-.352.222-.647.535-.85.91-.252.464-.325 1.016-.188 1.53.136.516.442.966.865 1.257.423.29.932.41 1.442.336 1.353-.195 2.628-.68 3.763-1.41a3.1 3.1 0 0 1 1.838-.492c.675.05 1.344.257 1.956.594 1.436.793 3.13 1.25 4.954 1.25s3.518-.457 4.954-1.25c.613-.338 1.282-.545 1.956-.595a3.1 3.1 0 0 1 1.838.49c1.135.73 2.41 1.216 3.763 1.41.51.074 1.02-.046 1.442-.335.423-.29.73-.74.865-1.257.137-.514.064-1.066-.188-1.53a2.384 2.384 0 0 0-.85-.91 4.298 4.298 0 0 1-1.424-1.53c-.446-.823-.56-1.686-.356-2.65.238-1.136.37-2.343.37-3.593 0-2.458-.897-4.618-2.513-6.234C16.607 2.377 14.446 1.48 11.988 1.48z" />
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

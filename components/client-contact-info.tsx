"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useTranslations } from "next-intl"

// تعريف أيقونات جديدة خارج المصفوفة
const SnapchatIcon = () => (
  <svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.988 1.48C9.53 1.48 7.37 2.378 5.753 3.996c-1.616 1.616-2.513 3.776-2.513 6.234 0 1.25.132 2.457.37 3.593.203.963.09 1.826-.356 2.65a4.298 4.298 0 0 1-1.424 1.53c-.352.222-.647.535-.85.91-.252.464-.325 1.016-.188 1.53.136.516.442.966.865 1.257.423.29.932.41 1.442.336 1.353-.195 2.628-.68 3.763-1.41a3.1 3.1 0 0 1 1.838-.492c.675.05 1.344.257 1.956.594 1.436.793 3.13 1.25 4.954 1.25s3.518-.457 4.954-1.25c.613-.338 1.282-.545 1.956-.595a3.1 3.1 0 0 1 1.838.49c1.135.73 2.41 1.216 3.763 1.41.51.074 1.02-.046 1.442-.335.423-.29.73-.74.865-1.257.137-.514.064-1.066-.188-1.53a2.384 2.384 0 0 0-.85-.91 4.298 4.298 0 0 1-1.424-1.53c-.446-.823-.56-1.686-.356-2.65.238-1.136.37-2.343.37-3.593 0-2.458-.897-4.618-2.513-6.234C16.607 2.377 14.446 1.48 11.988 1.48z" />
  </svg>
)

const TikTokIcon = () => (
  <svg
    className="w-6 h-6"
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
)

export default function ClientContactInfo({
  email = "info@rukanalmaalim.com",
  phone = "+966538833968",
  location = "طريق الملك عبدالعزيز، السعوديةالمدينة المنورة",
  facebook = "",
  twitter = "",
  instagram = "",
  linkedin = "",
  snapchat = "",
  tiktok = ""
}: {
  email?: string, phone?: string, location?: string,
  facebook?: string, twitter?: string, instagram?: string, linkedin?: string, snapchat?: string, tiktok?: string
}) {
  const t = useTranslations("Contact")
  const waPhone = (phone || "+966538833968").replace(/[^\d+]/g, '')

  const contactMethods = [
    {
      icon: Phone,
      title: t("callUs"),
      details: [phone],
      action: `tel:${waPhone}`,
      actionText: t("callNow"),
    },
    {
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      ),
      title: t("whatsapp"),
      details: [phone],
      action: `https://wa.me/${waPhone}`,
      actionText: t("messageUs"),
    },
    {
      icon: Mail,
      title: t("email"),
      details: [email],
      action: `mailto:${email}`,
      actionText: t("sendEmail"),
    },
  ]

  const officeHours = [
    { day: t("weekdays"), hours: "8:00 AM - 5:00 PM" },
    { day: t("weekend"), hours: t("closed") },
  ]

  const socialLinks = []
  if (facebook) socialLinks.push({ icon: Facebook, href: facebook, label: "فيسبوك" })
  if (twitter) socialLinks.push({ icon: Twitter, href: twitter, label: "تويتر" })
  if (instagram) socialLinks.push({ icon: Instagram, href: instagram, label: "إنستغرام" })
  if (linkedin) socialLinks.push({ icon: Linkedin, href: linkedin, label: "لينكد إن" })
  if (snapchat) socialLinks.push({ icon: SnapchatIcon, href: snapchat, label: "سناب شات" })
  if (tiktok) socialLinks.push({ icon: TikTokIcon, href: tiktok, label: "تيك توك" })

  return (
    <section className="py-20 bg-[#0D2240]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contactInfo")}</h2>
            <p className="text-lg opacity-90">{t("contactSubtitle")}</p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <Card key={index} className="p-6 bg-white/10 border-white/20 text-white">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#C4D600] p-3 rounded-full">
                      {typeof IconComponent === "function" ? (
                        <IconComponent />
                      ) : (
                        <IconComponent className="w-6 h-6 text-[#0D2240]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                      <div className="space-y-1 mb-4">
                        {method.details.map((detail, idx) => (
                          <p key={idx} className="opacity-90">{detail}</p>
                        ))}
                      </div>
                      <Button asChild size="sm" className="bg-[#C4D600] text-[#0D2240] hover:bg-[#C4D600]/90">
                        <a href={method.action} target="_blank" rel="noopener noreferrer">{method.actionText}</a>
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Office Address */}
          <Card className="p-6 bg-white/10 border-white/20 text-white mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#C4D600] p-3 rounded-full">
                <MapPin className="w-6 h-6 text-[#0D2240]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t("mainOffice")}</h3>
                <p className="opacity-90 leading-relaxed">
                  {location.split('،').map((part, index) => (
                    <span key={index}>{part}{index < location.split('،').length - 1 && '،'}<br /></span>
                  ))}
                </p>
              </div>
            </div>
          </Card>

          {/* Office Hours */}
          <Card className="p-6 bg-white/10 border-white/20 text-white mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#C4D600] p-3 rounded-full">
                <Clock className="w-6 h-6 text-[#0D2240]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4">{t("officeHours")}</h3>
                <div className="space-y-2">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="opacity-90">{schedule.day}</span>
                      <span className="font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Social Media */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-6">{t("followUs")}</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <Button
                    key={index}
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-[#C4D600] hover:text-[#0D2240] hover:border-[#C4D600] bg-transparent"
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <IconComponent className="w-5 h-5" />
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

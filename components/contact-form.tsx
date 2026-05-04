"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ContactForm({ whatsappPhone = "+966536788004" }: { whatsappPhone?: string }) {
  const t = useTranslations("Contact")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format phone for WhatsApp by removing non-digits
    const whatsappNumber = (whatsappPhone || "+966536788004").replace(/[^\d+]/g, '')

    const text = `
${t("whatsappMessageHeader")}
${t("whatsappName")}: ${formData.name}
${t("whatsappPhone")}: ${formData.phone}
${t("whatsappEmail")}: ${formData.email}
${t("whatsappService")}: ${formData.service}
${t("whatsappDetails")}: ${formData.message}
    `

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`

    window.open(whatsappUrl, "_blank")

    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center max-w-md mx-auto">
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0D2240] mb-4">{t("messageSent")}</h3>
            <p className="text-[#2D3640] mb-6">{t("messageSentSubtitle")}</p>
            <p className="text-sm text-[#2D3640]">{t("reloadingForm")}</p>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">{t("sendMessage")}</h2>
            <p className="text-lg text-[#2D3640]">{t("sendMessageSubtitle")}</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#0D2240] mb-2">{t("fullName")} *</label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t("fullNamePlaceholder")}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0D2240] mb-2">{t("emailAddress")} *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@email.com"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#0D2240] mb-2">{t("phoneNumber")} *</label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+966 50 123 4567"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0D2240] mb-2">{t("serviceType")}</label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("serviceTypePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الأعمال المدنية والكهروميكانيكية">{t("service1")}</SelectItem>
                      <SelectItem value="أنظمة التيار الخفيف">{t("service2")}</SelectItem>
                      <SelectItem value="البنية التحتية والاتصالات">{t("service3")}</SelectItem>
                      <SelectItem value="خدمات أخرى">{t("service4")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0D2240] mb-2">{t("projectDetails")} *</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder={t("projectDetailsPlaceholder")}
                  rows={5}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#C4D600] text-[#0D2240] hover:bg-[#C4D600]/90 font-medium"
              >
                <Send className="w-5 h-5 ml-2" />
                {t("submitButton")}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}

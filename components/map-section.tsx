import { useTranslations } from "next-intl"

export default function MapSection({ settings }: { settings?: any }) {
  const t = useTranslations("Locations")
  const mapLinks = settings?.contact?.mapLinks && settings.contact.mapLinks.length > 0 
    ? settings.contact.mapLinks 
    : ["https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3693.255618853708!2d39.598656!3d24.458410999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDI3JzMwLjMiTiAzOcKwMzUnNTUuMiJF!5e1!3m2!1sar!2ssa!4v1777907342295!5m2!1sar!2ssa"];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2240] mb-4">{t("title")}</h2>
          <p className="text-lg text-[#2D3640]">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mapLinks.map((link: string, i: number) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-lg h-96">
              <iframe
                src={link}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import ClientHeader from "./client-header"
import connectDB from "@/lib/db"
import SiteSettings from "@/models/SiteSettings"
import Service from "@/models/Service"

export default async function Header() {
  let logoUrl = "/logo.png"
  let logoHeight = "48" // default px
  let services: any[] = []

  try {
    const db = await connectDB()
    if (db) {
      const settings = await SiteSettings.findOne({}).lean()
      if (settings?.logo?.url) logoUrl = settings.logo.url
      if (settings?.logo?.height) logoHeight = settings.logo.height.toString()

      const dbServices = await Service.find({}).sort({ order: 1, createdAt: -1 }).lean()
      services = JSON.parse(JSON.stringify(dbServices)).map((s: any) => ({
        ...s,
        href: s.href || `/services/${s.title ? s.title.replace(/\s+/g, '-').toLowerCase() : 'unknown'}`
      }))
    }
  } catch (error) {
    console.error("Failed to fetch logo settings:", error)
  }

  return <ClientHeader logoUrl={logoUrl} logoHeight={logoHeight} services={services} />
}

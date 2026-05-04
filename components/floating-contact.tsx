import connectDB from "@/lib/db"
import SiteSettings from "@/models/SiteSettings"
import ClientFloatingContact from "./client-floating-contact"

export default async function FloatingContact() {
  let phone = "+966536788004"

  try {
    const db = await connectDB()
    if (db) {
      const settings = await SiteSettings.findOne({}).lean()
      if (settings?.contact?.whatsapps?.length > 0) phone = settings.contact.whatsapps[0]
    }
  } catch (error) {
    console.error("Failed to fetch contact phone:", error)
  }

  return <ClientFloatingContact phone={phone} />
}

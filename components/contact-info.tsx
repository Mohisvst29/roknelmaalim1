import connectDB from "@/lib/db"
import SiteSettings from "@/models/SiteSettings"
import ClientContactInfo from "./client-contact-info"

export default async function ContactInfo() {
  let email = "info@diamondgrowth.com"
  let phone = "+966538833968"
  let location = "طريق الملك عبدالعزيز، السعوديةالمدينة المنورة"
  
  let facebook = ""
  let twitter = ""
  let instagram = ""
  let linkedin = ""
  let snapchat = ""
  let tiktok = ""

  try {
    const db = await connectDB()
    if (db) {
      const settings = await SiteSettings.findOne({}).lean() || {}
      
      if (settings?.contact?.emails?.length > 0) email = settings.contact.emails[0]
      if (settings?.contact?.phones?.length > 0) phone = settings.contact.phones[0]
      if (settings?.contact?.addresses?.length > 0) location = settings.contact.addresses.join("، ")
      
      facebook = settings?.social?.facebook || ""
      twitter = settings?.social?.twitter || ""
      instagram = settings?.social?.instagram || ""
      linkedin = settings?.social?.linkedin || ""
      snapchat = settings?.social?.snapchat || ""
      tiktok = settings?.social?.tiktok || ""
    }
  } catch (error) {
    console.error("Failed to fetch contact info settings:", error)
  }

  return (
    <ClientContactInfo 
      email={email}
      phone={phone}
      location={location}
      facebook={facebook}
      twitter={twitter}
      instagram={instagram}
      linkedin={linkedin}
      snapchat={snapchat}
      tiktok={tiktok}
    />
  )
}

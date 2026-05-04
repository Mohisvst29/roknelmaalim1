import type React from "react"
import type { Metadata } from "next"
import { Tajawal, Cairo, Almarai, Readex_Pro } from "next/font/google"
import { Suspense } from "react"
import Script from "next/script"
import connectDB from "@/lib/db"
import SiteSettings from "@/models/SiteSettings"
import "../globals.css"

const tajawal = Tajawal({ subsets: ["arabic", "latin"], weight: ["200", "300", "400", "500", "700", "800", "900"], display: "swap", variable: "--font-tajawal" })
const cairo = Cairo({ subsets: ["arabic", "latin"], display: "swap", variable: "--font-cairo" })
const almarai = Almarai({ subsets: ["arabic"], weight: ["300", "400", "700", "800"], display: "swap", variable: "--font-almarai" })
const readexPro = Readex_Pro({ subsets: ["arabic", "latin"], display: "swap", variable: "--font-readex-pro" })

function getFontVariable(fontName: string) {
  switch (fontName) {
    case "Cairo": return cairo.variable
    case "Almarai": return almarai.variable
    case "Readex Pro": return readexPro.variable
    default: return tajawal.variable
  }
}

export const revalidate = 60; // Revalidate every 60 seconds to ensure DB changes are reflected

export async function generateMetadata(): Promise<Metadata> {
  let phone = "+966538833968"
  try {
    const db = await connectDB()
    if (db) {
      const settings = await SiteSettings.findOne({}).lean()
      if (settings?.contact?.whatsapps?.length > 0) phone = settings.contact.whatsapps[0]
    }
  } catch (e) {}

  return {
    title: `شركة ركن المعالم للمقاولات`,
    description: `شركة ركن المعالم للمقاولات متخصصة في المقاولات العامة، الإنشاءات، صيانة المباني، والتشييد في المملكة العربية السعودية.`,
    keywords: [`ركن المعالم للمقاولات`, `مقاولات بالسعودية`, `الإنشاءات`, `صيانة المباني`, `التشييد`, `مقاولات عامة`],
    generator: "Next.js",
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: {
      title: `شركة ركن المعالم للمقاولات`,
      description: `شركة ركن المعالم للمقاولات متخصصة في المقاولات العامة، الإنشاءات، صيانة المباني، والتشييد. 📞 للتواصل: ${phone}`,
      url: "https://www.rukanalmaalim.com/",
      siteName: "ركن المعالم للمقاولات",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `شركة ركن المعالم للمقاولات` }],
      locale: "ar_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `شركة ركن المعالم للمقاولات`,
      description: `شركة ركن المعالم للمقاولات متخصصة في المقاولات العامة، الإنشاءات، صيانة المباني. 📞 للتواصل: ${phone}`,
      images: ["/og-image.jpg"],
    },
  };
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {
  let phone = "+966538833968"
  let primaryColor = "#0D2240"
  let secondaryColor = "#C4D600"
  let fontName = "Tajawal"

  try {
    const db = await connectDB()
    if (db) {
      const settings = await SiteSettings.findOne({}).lean()
      if (settings) {
        if (settings?.contact?.whatsapps?.length > 0) phone = settings.contact.whatsapps[0]
        if (settings?.colors?.primary) primaryColor = settings.colors.primary
        if (settings?.colors?.secondary) secondaryColor = settings.colors.secondary
      }
    }
  } catch (e) {}

  const fontVariable = getFontVariable(fontName)
  const messages = await getMessages();

  // Inject CSS to override hardcoded Tailwind colors
  const customCss = `
    .bg-\\[\\#0D2240\\], .dark .dark\\:bg-\\[\\#0D2240\\] { background-color: ${primaryColor} !important; }
    .text-\\[\\#0D2240\\], .dark .dark\\:text-\\[\\#0D2240\\] { color: ${primaryColor} !important; }
    .border-\\[\\#0D2240\\] { border-color: ${primaryColor} !important; }
    .fill-\\[\\#0D2240\\] { fill: ${primaryColor} !important; }
    .from-\\[\\#0D2240\\] { --tw-gradient-from: ${primaryColor} var(--tw-gradient-from-position) !important; }
    .to-\\[\\#0D2240\\] { --tw-gradient-to: ${primaryColor} var(--tw-gradient-to-position) !important; }
    
    .bg-\\[\\#C4D600\\] { background-color: ${secondaryColor} !important; }
    .text-\\[\\#C4D600\\] { color: ${secondaryColor} !important; }
    .border-\\[\\#C4D600\\] { border-color: ${secondaryColor} !important; }
    .hover\\:text-\\[\\#C4D600\\]:hover { color: ${secondaryColor} !important; }
    .hover\\:bg-\\[\\#C4D600\\]:hover { background-color: ${secondaryColor} !important; }
    
    :root {
      --font-tajawal: var(${fontVariable});
    }
  `

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="author" content={`ركن المعالم للمقاولات`} />
        <meta name="telephone" content={phone} />
        
        <style dangerouslySetInnerHTML={{ __html: customCss }} />

        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-WSP986F000" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WSP986F000');
            `,
          }}
        />

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": `ركن المعالم للمقاولات`,
              "url": "https://www.rukanalmaalim.com/",
              "telephone": phone,
              "description": `شركة ركن المعالم للمقاولات متخصصة في الأعمال المدنية، الاتصالات، أنظمة التيار الخفيف، والخدمات الكهروميكانيكية بالسعوديةالمدينة المنورة.`,
            }),
          }}
        />
      </head>
      <body className={`font-sans ${fontVariable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>{children}</Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

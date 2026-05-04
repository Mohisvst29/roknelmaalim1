"use client"

interface PageBannerProps {
    image: string
    title: string
    subtitle: string
    fallbackImage?: string
}

export default function PageBanner({ image, title, subtitle, fallbackImage = "/aaa.png" }: PageBannerProps) {
    const bgImage = image || fallbackImage

    return (
        <section
            className="relative py-32 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('${bgImage}')`,
            }}
        >
            <div className="absolute inset-0 bg-[#0D2240]/70" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center text-white max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">{title}</h1>
                    <p className="text-xl md:text-2xl leading-relaxed text-balance opacity-90">
                        {subtitle}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default function ServicesHero() {
  return (
    <section
      className="relative py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/aaa.png)",
      }}
    >
      <div className="absolute inset-0 bg-[#0D2240]/70" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            خدماتنا بالسعوديةالمدينة المنورة
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-balance opacity-90">
            نقدم مجموعة شاملة من الخدمات في مجال المقاولات والتشطيبات لتلبية جميع احتياجاتكم
          </p>
        </div>
      </div>
    </section>
  )
}

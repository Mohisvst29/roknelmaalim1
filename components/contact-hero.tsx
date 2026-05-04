export default function ContactHero() {
  return (
    <section
      className="relative py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/mm.png')", // ✅ تم تصحيح القوس
      }}
    >
      <div className="absolute inset-0 bg-[#0D2240]/70" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">تواصل معنا بالسعوديةالمدينة المنورة</h1>
          <p className="text-xl md:text-2xl leading-relaxed text-balance opacity-90">
            نحن هنا بالسعوديةالمدينة المنورة لمساعدتك في تحقيق مشروع أحلامك. تواصل معنا الآن للحصول على استشارة مجانية
          </p>
        </div>
      </div>
    </section>
  )
}

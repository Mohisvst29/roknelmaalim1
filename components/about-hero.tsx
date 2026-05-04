export default function AboutHero() {
  return (
    <section
      className="relative py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/1%20(11).png')", // ✅ استخدم %20 بدل المسافة
      }}
    >
      <div className="absolute inset-0 bg-[#0D2240]/70" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">من نحن</h1>
          <p className="text-xl md:text-2xl leading-relaxed text-balance opacity-90">
            شركه رائده في مجال المقاولات العامه والتشطيبات في السعوديةالمدينة المنورة، نجمع بين الخبره العريقه والتقنيات الحديثه
            لتحقيق احلام عملائنا في البناء والتطوير
          </p>
        </div>
      </div>
    </section>
  )
}

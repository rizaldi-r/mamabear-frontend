export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-pink-100 to-pink-50 py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-amber-900 mb-2">
          SEGALA KEBAIKAN UNTUK MAMA
        </h1>
        <p className="text-gray-700 md:text-lg mb-8 font-medium">
          Makanan Minuman Bumil-Busui dengan{" "}
          <span className="text-pink-600 font-bold">SUPERFOOD</span>
          <br />
          Efektif Meningkatkan Produksi & Nutrisi ASI
        </p>

        {/* Mock Illustration Area */}
        <div className="w-full max-w-4xl h-64 md:h-96 bg-white/50 rounded-3xl border-4 border-white shadow-xl flex items-center justify-center backdrop-blur-sm relative">
          <div className="absolute -top-10 -right-4 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <p className="text-pink-300 font-bold text-2xl">
            [Hero Illustration Placeholder]
          </p>
        </div>
      </div>
    </section>
  );
}

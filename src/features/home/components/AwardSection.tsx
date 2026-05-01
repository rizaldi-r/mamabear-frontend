export function AwardsSection() {
  return (
    <section className="py-12 bg-white border-b border-pink-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-stone-800 mb-2">
          Penghargaan Kami
        </h2>
        <p className="text-sm text-stone-500 mb-8">
          Produk kami telah memperoleh banyak penghargaan & terpercaya
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="h-16 w-32 bg-stone-100 rounded flex items-center justify-center text-xs font-bold text-stone-400">
            BPOM
          </div>
          <div className="h-16 w-32 bg-stone-100 rounded flex items-center justify-center text-xs font-bold text-stone-400">
            HALAL
          </div>
          <div className="h-16 w-32 bg-stone-100 rounded flex items-center justify-center text-xs font-bold text-stone-400">
            BRAND CHOICE 1
          </div>
          <div className="h-16 w-32 bg-stone-100 rounded flex items-center justify-center text-xs font-bold text-stone-400">
            BRAND CHOICE 2
          </div>
        </div>
      </div>
    </section>
  );
}

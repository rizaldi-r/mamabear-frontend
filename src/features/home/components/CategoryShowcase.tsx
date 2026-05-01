export function CategoryShowcase({ categories }) {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-stone-800 mb-8">
          Kategori Produk
        </h2>
        <div className="grid grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div
                className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl ${cat.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-105 shadow-sm`}
              >
                <span className="text-xs text-stone-300">Img</span>
              </div>
              <span
                className={`text-xs md:text-sm text-center font-medium ${cat.text || "text-stone-700"}`}
              >
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

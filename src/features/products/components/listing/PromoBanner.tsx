export function PromoBanner(): JSX.Element {
  return (
    <div className="my-6 rounded-3xl overflow-hidden bg-gradient-to-r from-rose-100 to-pink-50 relative aspect-[21/9] md:aspect-[5/1]">
      <div className="absolute inset-0 flex items-center justify-between px-12">
        <div className="max-w-md">
          <h2 className="text-2xl md:text-4xl font-black text-rose-900 leading-tight uppercase font-sans">Suplemen ASI <br/> Terbaik</h2>
          <p className="text-rose-700/70 text-sm mt-2 hidden md:block">Dukungan nutrisi lengkap untuk perjalanan menyusui Mama.</p>
        </div>
        <div className="flex gap-4 opacity-50 md:opacity-100">
          <div className="w-24 h-32 bg-white rounded-lg shadow-xl translate-y-4" />
          <div className="w-24 h-32 bg-white rounded-lg shadow-xl -translate-y-4" />
          <div className="w-24 h-32 bg-white rounded-lg shadow-xl translate-y-2" />
        </div>
      </div>
    </div>
  );
}
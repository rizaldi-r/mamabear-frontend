import { ShoppingCart, Star } from "lucide-react";
import { Product, ViewMode } from "../../types/products.types";

interface ProductCardProps {
  product: Product;
  viewMode: ViewMode;
}

export function ProductCard({ product, viewMode }: ProductCardProps): JSX.Element {
  const isList = viewMode === 'list';

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 ${isList ? 'flex h-48 md:h-56 w-full' : 'flex flex-col'}`}>
      <div className={`relative bg-pink-50 overflow-hidden ${isList ? 'w-40 md:w-56 shrink-0' : 'aspect-[4/5]'}`}>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.discountPercent && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">-{product.discountPercent}%</span>
          )}
          {product.isNew && (
            <span className="bg-white text-rose-500 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-rose-100">NEW</span>
          )}
        </div>
        
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {!isList && (
          <button 
            className="absolute bottom-3 right-3 w-10 h-10 bg-rose-400 hover:bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            title="Tambah ke keranjang"
          >
            <ShoppingCart size={18} />
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h4 className={`${isList ? 'text-lg' : 'text-sm'} font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-rose-500 transition-colors`}>
            {product.name}
          </h4>
          <div className="flex items-center gap-1 mt-1.5">
            <Star size={isList ? 14 : 12} className="fill-yellow-400 text-yellow-400" />
            <span className={`${isList ? 'text-sm' : 'text-[11px]'} font-bold text-gray-800`}>{product.rating.toFixed(1)}</span>
            <span className={`${isList ? 'text-sm' : 'text-[11px]'} text-gray-400 ml-1`}>| {product.soldCount} Terjual</span>
          </div>
          {isList && product.description && (
            <p className="text-gray-500 text-xs mt-3 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        <div className={`flex items-end justify-between ${isList ? 'mt-4' : 'mt-2'}`}>
          <div className="flex flex-col">
            {product.discountPercent && (
              <span className="text-[10px] text-gray-400 line-through">Rp {(product.price * 2).toLocaleString('id-ID')}</span>
            )}
            <p className="text-rose-500 font-bold text-xl tracking-tight">Rp {product.price.toLocaleString('id-ID')}</p>
          </div>
          
          {isList && (
            <button className="flex items-center gap-2 px-6 py-2 bg-rose-400 hover:bg-rose-500 text-white rounded-full text-sm font-bold shadow-md transition-all active:scale-95">
              <ShoppingCart size={18} /> Tambah
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
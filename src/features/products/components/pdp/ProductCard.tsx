import { getReview } from "@/app/api/product/product-api";
import { Product, Review } from "../../types/product.types";


interface ProductCardProps {
    Product : Product
}

export default async function ProductCard({Product}: ProductCardProps) {
  const rev = await getReview(Product.slug)
      const review : Review[] = rev.data.data || []
  
      const avgReview = review.length > 0 ? review.reduce((sum, n)=> sum + n.rating, 0)/review.length : 0
  
  return (
    <div className="lg:w-[23%] w-[50%] h-auto rounded-xl bg-white shadow-md border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300">
      
      {/* Image Section */}
      <div className="relative">
        {/* Discount */}
        <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 z-10">
          50%
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-20 bg-[var(--mama-hot-pink)] text-[var(--mama-brown)] text-sm font-bold px-3 py-1 z-10">
          NEW
        </div>

        {/* Product Image */}
        <div className="relative">
          <img src={Product.images[0].imageUrl} alt={Product.slug} className="object-contain"/>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-font-2 font-semibold truncate">{Product.name}</h3>

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
        
          <div>
          <p className="text-font-4 font-bold text-red-500">Rp {parseInt(Product.variants[0].priceIdr).toLocaleString("id-ID")}</p>
            {/* Rating */}
            <div className="flex items-center gap-2">
            <div className="flex items-center text-pink-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6557E" className="size-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>

                <span className="ml-1 text-[var(--color-light-gray)]">{avgReview.toFixed(1)}</span>
            </div>

            <span className="text-[var(--color-light-gray)] text-sm">10Rb+ terjual</span>
            </div>
          </div>

          <button className="w-14 h-14 rounded-full bg-[var(--mama-hot-pink)] flex items-center justify-center text-white hover:bg-[var(--mama-pink)] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>

          </button>
        </div>
      </div>
    </div>
  );
}
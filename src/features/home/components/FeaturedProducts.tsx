import { HomeProductCard } from "@/features/home/components/HomeProductCard";
import { Product } from "@/features/home/types/home.types";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "MamaBear AlmonMix Isi 6 Sachet - Minuman Serbuk dengan Almond - Kaya Nutrisi Untuk Ibu Menyusui BPOM HALAL",
    slug: "mamabear-almonmix-isi-6-sachet",
    description: "Minuman Almond Kaya Nutrisi dengan Daun Katuk & Daun Kelor.",
    price_idr: "80000",
    weight_g: 180,
    sku: "AL.MMBR",
    stock: 100,
    isActive: true,
    images: [
      {
        id: 1,
        productId: 1,
        imageUrl:
          "https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AlmonMix/AlmonMix-01.jpg",
        sortOrder: 1,
        altText: "MamaBear AlmonMix 01",
      },
    ],
    variants: [],
    discount: "-20%",
    badge: "BEST SELLER",
    rating: 5.0,
    sold: "1.5RB",
  },
  {
    id: 2,
    name: "MamaBear ASI Booster Kapsul",
    slug: "asi-booster-kapsul",
    description: "Herbal alami untuk membantu meningkatkan produksi ASI Mama.",
    price_idr: "65073",
    weight_g: 500,
    sku: "MB-ASI-CAPS",
    stock: 100,
    isActive: true,
    images: [
      {
        id: 10,
        productId: 2,
        imageUrl: "/images/home/catalog-asibooster.webp",
        sortOrder: 1,
        altText: "ASI Booster Kapsul",
      },
    ],
    variants: [],
    discount: "-50%",
    badge: "NEW",
    rating: 5.0,
    sold: "10RB+",
  },
  {
    id: 3,
    name: "MamaBear AlmondMix Cokelat",
    slug: "almondmix-cokelat",
    description: "Minuman pelancar ASI lezat dengan rasa cokelat.",
    price_idr: "42000",
    weight_g: 200,
    sku: "MB-ALMOND-CHOC",
    stock: 80,
    isActive: true,
    images: [
      {
        id: 20,
        productId: 3,
        imageUrl: "/images/home/catalog-almondmix.webp",
        sortOrder: 1,
        altText: "AlmondMix Cokelat",
      },
    ],
    variants: [],
    badge: "HOT",
    rating: 4.9,
    sold: "8RB+",
  },
  {
    id: 4,
    name: "MamaBear Kookie Bites",
    slug: "kookie-bites",
    description: "Camilan sehat pelancar ASI.",
    price_idr: "55000",
    weight_g: 150,
    sku: "MB-KOOKIE",
    stock: 200,
    isActive: true,
    images: [
      {
        id: 30,
        productId: 4,
        imageUrl: "/images/home/catalog-cookies.webp",
        sortOrder: 1,
        altText: "Kookie Bites",
      },
    ],
    variants: [],
    discount: "-15%",
    rating: 5.0,
    sold: "5RB+",
  },
];

export function FeaturedProducts({ products }: { products?: Product[] }) {
  // Use API products if available, fallback to mock, and limit to 4 items
  const displayProducts = (
    products && products.length > 0 ? products : mockProducts
  ).slice(0, 4);

  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <h2 className="text-2xl font-bold text-[var(--mama-brown)] text-center mb-8">
          MamaBear Highlight
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {displayProducts.map(function renderProduct(product) {
            return <HomeProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </section>
  );
}

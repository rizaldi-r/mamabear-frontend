import {
  getProduct,
} from "@/features/products/services/productService";
import Description from "@/features/products/components/pdp/Description";
import ImageGallery from "@/features/products/components/pdp/ImageGallery";
import ProductInfo from "@/features/products/components/pdp/ProductInfo";
import RelatedProduct from "@/features/products/components/pdp/RelatedProduct";
import Stars from "@/features/products/components/pdp/Stars";
import { Product } from "@/features/products/types/product.types";
import Link from "next/link";
import React from "react";
import { User } from "lucide-react";

export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

export default async function ProductDetailPage(props: { params: Params }) {
  const { slug } = await props.params;

  const res = await getProduct(slug);
  const product: Product = res.data;

  const image = product.images || [];

  return (
    <>
      <main className="py-8 flex flex-col gap-5 page-max-width px-4">
        <p className="text-font-2 text-[var(--color-light-gray)]">
          Home / Products / {product.slug}
        </p>

        <div className="flex lg:flex-row flex-col w-full gap-5">
          <div className="lg:w-[50%]">
            <ImageGallery images={image} />
          </div>

          <div className="lg:w-[50%]">
            <ProductInfo
              product={product}
              avgReview={product.rating}
              totalReview={product.reviewsCount}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <Description
          description={product.description ?? "deskripsi"}
          ingredients={
            product.ingredients ??
            "untuk mengetahui kandungan produk hubungi admin"
          }
          usageInstructions={
            product.usageInstructions ??
            "untuk mengetahui cara pakai produk hubungi admin"
          }
        />

        <br />

        {/* RATINGS */}
        <div>
          <p className="text-font-4 text-[var(--mama-brown)] font-bold">
            Reviews
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
            <div className="flex items-center gap-3">
              <p className="text-font-4 text-[var(--mama-hot-pink)] font-bold">
                {product.rating.toFixed(1)}
              </p>
              <Stars rating={product.rating} />
              <p className="text-[var(--color-light-gray)] text-font-1">
                {product.reviewsCount} Penilaian
              </p>
            </div>

            <Link href={`/products/${slug}/review`} className="text-sm">
              Lihat seluruh penilaian
            </Link>
          </div>
        </div>

        {/* BEST REVIEW */}
        {product.topReview && (
          <div className="flex flex-row items-start gap-4 p-4 bg-[var(--mama-pink-light)] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 bg-[var(--mama-pink)] rounded-full text-[var(--mama-hot-pink)] shrink-0">
                <User size={24} />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="font-bold text-[var(--mama-brown)]">
                  {product.topReview.username || "User"}
                </p>
                <Stars rating={product.topReview.rating} />
              </div>
              <p className="font-bold text-[var(--mama-brown)] mt-4">
                {product.topReview.title}
              </p>
              <p className="text-[var(--color-gray)] text-font-2">
                {product.topReview.description}
              </p>
            </div>
          </div>
        )}

        <hr className="border-gray-300" />

        <div className="flex flex-col items-center gap-5">
          <p className="text-font-4 text-[var(--mama-brown)] font-bold">
            Produk Lainnya
          </p>
          <RelatedProduct slug={slug} />
        </div>
      </main>
    </>
  );
}

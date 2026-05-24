import React from "react";
import { Product } from "../../types/product.types";
import { getRelatedProduct } from "@/features/products/services/productService";
import ProductCard from "@/features/products/components/shared/ProductCard";

interface Props {
  slug: string;
}

async function RelatedProduct({ slug }: Props) {
  const res = await getRelatedProduct(slug);
  const products: Product[] = res.data;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-1.5 md:gap-2">
      {products && products.length > 0 && (
        <>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </>
      )}
    </div>
  );
}

export default RelatedProduct;

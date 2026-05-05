export type Category = "Semua Produk" | "Asi Booster" | "AlmonMix" | "Teh Pelancar Asi" | "Kukis Series" | "ZoyaMix" | "Gift & Hampers" | "Mama Support" | "SALE";

export type ViewMode = "grid" | "list";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  discountPrice?: number;
  discountPercent?: number;
  category: Category;
  image: string;
  rating: number;
  soldCount: string;
  isNew: boolean;
  description?: string;
}

import { Review } from "@/features/products/types/product.types";

const BASE_URL = `https://mamabear-backend-dev.up.railway.app`

export async function getProduct(slug:string){
    try{
        const response = await fetch(`${BASE_URL}/products/${slug}`)
    
        if (!response.ok) throw new Error("Gagal fetch produk");

      return response.json();
    }
    catch(Error:any) {
        return [];
    }

}

export async function getReview(slug:string){
    try{
        const response = await fetch(`${BASE_URL}/products/${slug}/reviews`)
    
        if (!response.ok) throw new Error("Gagal fetch produk");

      return response.json();
    }
    catch(Error:any) {
        return [];
    }

}

export const addUpvotes = async (reviewId: number, slug: string): Promise<Review> => {
  try {
    const response = await fetch(`${BASE_URL}}/products/${slug}/reviews/${reviewId}/upvote`, {
      method: "PATCH",
    });

    if (!response.ok) {
      throw new Error("Failed to add upvotes");
    }

    return response.json();
  } catch (error) {
    console.error("Error adding upvotes:", error);
    throw new Error("Failed to add upvotes");
  }
};

export async function getAllProduct(){
    try{
        const response = await fetch(`${BASE_URL}/products`)
    
        if (!response.ok) throw new Error("Gagal fetch produk");

      return response.json();
    }
    catch(Error:any) {
        return [];
    }

}
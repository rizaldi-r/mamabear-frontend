
export async function getProduct(slug:string){
    try{
        const response = await fetch(`https://mamabear-backend-dev.up.railway.app/products/${slug}`)
    
        if (!response.ok) throw new Error("Gagal fetch produk");

      return response.json();
    }
    catch(Error:any) {
        return [];
    }

}

export async function getReview(slug:string){
    try{
        const response = await fetch(`https://mamabear-backend-dev.up.railway.app/products/${slug}/reviews`)
    
        if (!response.ok) throw new Error("Gagal fetch produk");

      return response.json();
    }
    catch(Error:any) {
        return [];
    }

}
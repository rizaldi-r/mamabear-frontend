
export async function getProduct(id:string){
    try{
        const response = await fetch(`https://mamabear-backend-production.up.railway.app/products/${id}`)
    
        if (!response.ok) throw new Error("Gagal fetch produk");

      return response.json();
    }
    catch(Error:any) {
        return [];
    }

}
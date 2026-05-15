"use client"
import React, { useEffect, useState } from 'react'
import Stars from './Stars'

type Product ={
    name: string,
    stock: number,
    variants: Variant[]
    reviews : Review[]
}

type Variant ={
    id: number,
    productId: number,
    name: string,
    priceIdr: string,
    stock: number
}

type Review = {
  id: number,
  title: string,
  reviewerId: string,
  productId: number,
  rating: number,
  numUpvotes: number,
  description: string,
  imageUrls: [],
  createdAt: Date
}

function ProductInfo({name, stock, reviews, variants}:Product) {
  const initialVariant = variants.find((v) => v.stock > 0) || variants[0] || null;
  const [selectedVariant, setSelectedVariant] = useState<Variant>(initialVariant)
  const [qty, setQty] = useState<number>(1)
  const [alert, setAlert] = useState<string>('')
  const [productUrl, setProductUrl] = useState('');

  useEffect(() => {
    setProductUrl(window.location.href);
  }, []);

  console.log('VAR', selectedVariant)

  function handleAddStock(){
    setAlert('')
    if(qty>= stock){
      setQty(stock)
    }else if(qty>=10){
      setAlert('Dapatkan harga khusus untuk pembelian >10. Hubungi Admin MamaBear.')
      setQty(10)
    }else {
      setQty(qty+1)
    }
  }

  function handleReduceStock(){
    setAlert('')
    if(qty<=1){
      setAlert('Minimum pembelian 1')
      setQty(1)
    }else if(qty>=stock){
      setQty(stock)
    }else {
      setQty(qty-1)
    }
  }

  function handleShareWA(){
    const text = `Cek produk dari MamaBear ${productUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url);
  }

  async function handleShare() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Sepatu Keren",
        text: "Cek produk ini!",
        url: window.location.href
      });
    } catch (err) {
      console.log("User cancel share");
    }
  } else {
    console.log("Browser tidak support");
  }
};


  console.log(variants)
  return (
    <div className='w-full'>
      <h1 className='text-[var(--mama-hot-pink)] text-4xl/8 font-bold'>{name}</h1>
      <br/>

      <p className='text-red-500 text-font-5 font-bold'>Rp {parseInt(selectedVariant.priceIdr).toLocaleString("id-ID")}</p>
    
      <br/>
    {/* REVIEW STARS */}
      <div className='flex gap-5'>
        <div className='flex'>
          <Stars rating={4.9}/>
          <p className='text-[var(--color-light-gray)] text-font-2'>{4.9}</p>
        </div>
          <p className='text-[var(--color-light-gray)] text-font-2'>10RB+ Penilaian</p>
          <p className='text-[var(--color-light-gray)] text-font-2'>10RB+  Terjual</p>
      </div>

      <br/>
    {/* VARIANTS */}
    {variants.length > 0 &&
      <div className='flex flex-col gap-2'>
        <p className='text-[var(--color-light-gray)] font-bold'>Variant</p>  

        <div className='flex flex-wrap gap-3 w-[70%]'>
          {variants.map((v)=>(
          <p key={v.id} className={`py-1 px-5 rounded-2xl font-bold cursor-pointer
                          ${v.stock === 0
                              ? 'border border-gray-400 cursor-not-allowed text-black'
                              : selectedVariant.id === v.id
                              ? 'bg-[var(--mama-hot-pink)] text-white'
                              : 'bg-[var(--mama-pink)] text-white'}
                      `}
                          onClick={()=>setSelectedVariant(v)}
          >{v.name}</p>
          ))}
        </div>
      </div>
    }

      <br/>
      {stock == 0 && <p>Maaf, Stock Habis.</p>}

      {/* QUANTITY */}
      {stock > 0 &&
      <div className='flex flex-col gap-2'>
        <p className='text-[var(--color-light-gray)] font-bold'>Jumlah</p>  
        <div className="flex border border-gray-400 rounded-xl w-[25%] justify-between">
          <button
            className={` px-3 w-[30%]
              ${qty >= stock || qty <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
            onClick={()=>handleReduceStock()}>-</button>
          <input 
              className="w-[40%] text-center border-l border-r pointer-events-none"
              value={qty}/>
          
          <button 
            className={`px-3 w-[30%]
              ${qty >= stock || qty >= 10 ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
            onClick={()=>handleAddStock()}>+</button>
        </div>
        <p className='text-gray-400 text-font-1'>{alert}</p>
      </div>}

      <br/>

      <div className='flex gap-2'>
        <button className='w-[90%] bg-[var(--mama-hot-pink)] text-font-4 rounded-4xl font-bold text-white flex items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <p>Masukan Keranjang</p>
        </button>
        
        <button className='bg-[var(--mama-pink)] rounded-4xl p-3'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#6C4735" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>

      <br/>
      <div className='flex justify-end items-center'>
        <p className='text-font-1'>Bagikan</p>
        <svg onClick={()=>handleShare()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" stroke="#6C4735" className="size-7 cursor-pointer">
          <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-7 cursor-pointer">
          <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z"/>
        </svg>

        <svg onClick={()=>handleShareWA()}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-7 cursor-pointer">
          <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/>
        </svg>
      </div>
      
    </div>
  )
}

export default ProductInfo

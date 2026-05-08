'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

const items = [
  {
    src: "/images/home/icon-chat.webp",
    alt: "Chat Icon",
    title: "24/7 FREE \nKONSULTING",
  },
  {
    src: "/images/home/icon-brandchoice.webp",
    alt: "Brand Choice Icon",
    title: "BRAND CHOICE \n2022-2024",
  },
  {
    src: "/images/home/icon-natural.webp",
    alt: "Natural Icon",
    title: "NATURAL 100% \nBahan Alami",
  },
  {
    src: "/images/home/icon-mama.webp",
    alt: "Trusted Icon",
    title: "DIPERCAYA \nJutaan Ibu",
  }
];

const slides = [items.slice(0, 2), items.slice(2, 4)];

export function USPBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white border-b border-pink-100 py-3">

      {/* DESKTOP - all item flex */}
      <div className="hidden md:flex max-w-5xl mx-auto px-4 items-center justify-center divide-x divide-gray-200">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 px-6 first:pl-0 last:pr-0">
            <Image src={item.src} alt={item.alt} width={40} height={40} className="w-30 h-30 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs md:text-font-1 font-bold text-stone-700 leading-tight">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE - carousel 2 item per slide */}
      <div className="md:hidden w-full overflow-hidden flex flex-col">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div 
              key={slideIndex} 
              className="min-w-full flex items-center justify-center"
            >
              <div className="flex items-center justify-center gap-0">
                {slide.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className={`flex items-center gap-0 px-4 ${
                      itemIndex !== 0 ? "border-l border-[var(--color-light-gray)]" : ""  
                    }`}
                  >
                    <Image 
                      src={item.src} 
                      alt={item.alt} 
                      width={40} 
                      height={40} 
                      className="flex-shrink-0" 
                    />
                    <span className="text-[10px] md:text-font-1 font-semibold text-stone-700 leading-tight">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* dot indicators */}
        <div className="flex justify-center gap-1.5 mt-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i === current ? "bg-pink-400" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import React from "react";
import Image from "next/image";

export default function ProductListingBanner() {
  return (
    <div className="w-full bg-[#FFF5F7] rounded-b-[40px] overflow-hidden mb-12 relative border-b border-pink-100">
      <div className="container mx-auto px-4 h-[200px] md:h-[280px] relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-between px-12 opacity-90">
          <div className="flex -space-x-4">
            <div className="w-32 h-40 bg-white shadow-xl rounded-xl border border-pink-50 flex items-center justify-center p-2 transform -rotate-6 z-10">
              <Image
                src="https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AlmonMix/AlmonMix-01.jpg"
                alt="Almond Mix"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="w-32 h-40 bg-white shadow-xl rounded-xl border border-pink-50 flex items-center justify-center p-2 transform rotate-3 z-20">
              <Image
                src="https://raw.githubusercontent.com/regencode/mamabear-backend/main/assets/images/AsiBooster/AsiBooster-01.jpg"
                alt="ASI Booster"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 hidden md:flex">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-[10px] font-bold text-blue-500 text-center p-2">
                BADAN POM
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-[10px] font-bold text-yellow-500 text-center p-2">
                BRAND
                <br />
                CHOICE
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-[10px] font-bold text-purple-600 text-center p-2">
                HALAL
                <br />
                INDONESIA
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

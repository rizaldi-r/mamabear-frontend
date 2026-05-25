"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

// Renamed to ImageType to avoid collision with next/image
type ImageType = {
  id: number;
  productId: number;
  imageUrl: string;
  sortOrder: number;
  altText: string | null;
};

type Props = {
  images: ImageType[];
};

function ImageGallery({ images }: Props) {
  const [img] = useState<ImageType[]>(images);
  const [liveImage, setLiveImage] = useState<boolean>(false);
  const [imgIndex, setImgIndex] = useState<number>(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      // swipe kiri
      setImgIndex((prev) => (prev === images.length - 1 ? prev : prev + 1));
    }

    if (diff < -50) {
      // swipe kanan
      setImgIndex((prev) => (prev === 0 ? prev : prev - 1));
    }
  };

  return (
    <div className="relative w-full">
      {/* Navigation Buttons (Desktop) */}
      <div className="absolute top-1/2 left-0 w-full flex justify-between items-center -translate-y-1/2 z-10 px-2 lg:px-0 pointer-events-none">
        {/* BUTTON LEFT */}
        <button
          className="size-10 bg-white shadow-md flex items-center justify-center rounded-full cursor-pointer pointer-events-auto hover:bg-gray-50"
          onClick={() =>
            setImgIndex(imgIndex <= 0 ? images.length - 1 : imgIndex - 1)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* BUTTON RIGHT */}
        <button
          className="size-10 bg-white shadow-md flex items-center justify-center rounded-full cursor-pointer pointer-events-auto hover:bg-gray-50"
          onClick={() =>
            setImgIndex(imgIndex >= images.length - 1 ? 0 : imgIndex + 1)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Image Section */}
      <section className="hidden flex-col gap-4 lg:flex">
        {/* Main Image Wrapper: Needs 'relative' and a defined height (e.g., aspect-square) */}
        <div
          className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setLiveImage(true)}
        >
          <Image
            unoptimized
            fill
            alt={img[imgIndex].altText || "Product image"}
            src={img[imgIndex].imageUrl}
            className="object-cover"
          />
        </div>

        {/* Selection Thumbnails */}
        <div className="flex gap-4 max-w-full overflow-x-auto py-2">
          {img &&
            img.map((i, idx) => (
              <button
                key={i.id}
                onClick={() => setImgIndex(idx)}
                // Thumbnail Wrapper: defined width/height and relative
                className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                  imgIndex === idx
                    ? "border-blue-600"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image
                  unoptimized
                  fill
                  alt={i.altText || `Thumbnail ${idx + 1}`}
                  src={i.imageUrl}
                  className="object-cover"
                />
              </button>
            ))}
        </div>
      </section>

      {/* Mobile Image Section */}
      <section
        className="flex flex-col gap-5 lg:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Wrapper: Needs 'relative' and defined height */}
        <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            unoptimized
            fill
            alt={img[imgIndex].altText || "Product image"}
            src={img[imgIndex].imageUrl}
            className="object-cover"
          />
        </div>
      </section>

      {/* Modal / Live Image Zoom */}
      {liveImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLiveImage(false)}
        >
          {/* Modal Wrapper: Needs 'relative' and dimensions to constrain 'fill' */}
          <div className="relative w-full max-w-4xl aspect-square md:aspect-video">
            <Image
              unoptimized
              fill
              alt={img[imgIndex].altText || "Zoomed product image"}
              className="object-contain cursor-zoom-out transition-transform duration-300 hover:scale-110"
              src={img[imgIndex].imageUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;

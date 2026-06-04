import React from "react";
import Image from "next/image";
import { X, ChevronDown, Minus, Plus } from "lucide-react";
import { formatIDR } from "@/utils/formatters";
import { CartItem } from "@/features/cart/types/cart.types";

export interface CartItemCardProps {
  item: CartItem;
  isSelected: boolean;
  onToggle?: () => void;
  onUpdateQty: (id: string, qty: number, isLog: boolean) => void;
  onRemove: (id: string, isLog: boolean) => void;
  isLoggedIn: boolean;
}

export const CartItemCard = ({
  item,
  isSelected,
  onUpdateQty,
  onRemove,
  isLoggedIn,
}: CartItemCardProps) => {
  // Mocking an original price for UI fidelity
  const currentPrice = Number(item.price);
  const originalPrice = Math.round(currentPrice * 1.35);

  return (
    <div className="flex gap-4 py-6 border-b border-gray-200 relative group">
      <div className="flex items-start pt-8">
        <input
          type="checkbox"
          checked={isSelected}
          disabled
          className="w-5 h-5 accent-[var(--mama-hot-pink)] cursor-not-allowed opacity-60 rounded border-gray-300"
        />
      </div>

      <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-xl border border-[var(--mama-pink)] bg-[var(--mama-cream)] overflow-hidden flex-shrink-0">
        <Image
          src="/images/placeholder-product.png"
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 96px, 112px"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs text-[var(--mama-hot-pink)] bg-pink-50 font-semibold p-2 text-center">
          MamaBear
        </div>
      </div>

      {}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-font-2 sm:text-font-3 font-semibold text-[var(--mama-brown)] line-clamp-2 pr-8">
            {item.product.name}
          </h3>
          <button
            onClick={() => onRemove(item.id, isLoggedIn)}
            className="absolute top-6 right-0 p-1 text-gray-300 hover:text-[var(--mama-hot-pink)] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mt-2 inline-flex items-center justify-between border border-gray-200 rounded-full px-3 py-1 text-font-1 text-[var(--color-gray)] w-fit bg-white">
          <span>Varian {item.variantId}</span>
          <ChevronDown size={14} className="ml-2" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-auto pt-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-font-4 font-bold text-[var(--mama-hot-pink)]">
                {formatIDR(currentPrice)}
              </span>
              <span className="text-font-2 font-medium text-gray-400 line-through">
                {formatIDR(originalPrice)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() =>
                  onUpdateQty(item.id, item.quantity - 1, isLoggedIn)
                }
                disabled={item.quantity <= 1}
                className="p-1.5 hover:bg-gray-100 text-[var(--color-gray)] disabled:opacity-50 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 text-font-2 font-medium text-[var(--mama-brown)] min-w-[3rem] text-center border-x border-gray-200">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  onUpdateQty(item.id, item.quantity + 1, isLoggedIn)
                }
                disabled={item.quantity >= item.variant.stock}
                className="p-1.5 hover:bg-gray-100 text-[var(--color-gray)] disabled:opacity-50 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-font-1 text-[var(--color-gray)] mt-1">
              Sisa {item.variant.stock}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
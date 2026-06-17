"use client";

import React from "react";
import Link from "next/link";
import { Address } from "@/features/address/types/address.types";
import {useCheckout} from "@/features/checkout/hooks/useCheckout";
import {CheckoutSuccessView} from "@/features/checkout/components/CheckoutPaymentView";
import {CheckoutStepper} from "@/features/checkout/components/shared/CheckoutStepper";
import {CheckoutAddressSection} from "@/features/checkout/components/informations/CheckoutAddressSection";
import {CheckoutShippingSection} from "@/features/checkout/components/informations/CheckoutShippingSection";
import {CheckoutNotesSection} from "@/features/checkout/components/informations/CheckoutNotesSection";
import {CheckoutSummaryCard} from "@/features/checkout/components/informations/CheckoutSummaryCard";


interface CheckoutViewProps {
  initialAddresses: Address[];
  userEmail: string;
}

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export function CheckoutView({
  initialAddresses,
  userEmail,
}: CheckoutViewProps) {
  const {
    addresses,
    cart,
    isLoadingCart,
    selectedAddressId,
    shippingOptions,
    selectedShipping,
    isCalculatingShipping,
    isSubmitting,
    errorMessage,
    isOrderCreated,
    paymentRedirectUrl,
    totals,
    notes,
    actions,
  } = useCheckout(initialAddresses, userEmail);

  // STEP 3: Order Selesai & Pembayaran Tertunda
  if (isOrderCreated) {
    return (
      <CheckoutSuccessView paymentRedirectUrl={paymentRedirectUrl} />
    );
  }

  // Menangani tampilan keranjang belanja kosong
  if (!isLoadingCart && (!cart || cart?.items?.length === 0)) {
    return (
      <div className="text-center py-20 text-gray-500 max-w-md mx-auto animate-fade-in">
        <p className="mb-4">
          Keranjang Anda kosong. Silakan belanja terlebih dahulu.
        </p>
        <Link
          href="/"
          className="inline-block bg-[var(--mama-hot-pink)] hover:bg-[#c24467] text-white font-bold py-3 px-6 rounded-full transition-colors text-font-2"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-font-5 font-bold text-black mb-8">Check Out</h1>

      <CheckoutStepper activeStep={1} />

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-font-2">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Data Pengiriman */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          {/* Alamat Pengiriman */}
          <CheckoutAddressSection
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelectAddress={actions.handleSelectAddress}
          />

          {/* Opsi Metode Ekspedisi */}
          <CheckoutShippingSection
            isLoadingCart={isLoadingCart}
            isCalculatingShipping={isCalculatingShipping}
            selectedAddressId={selectedAddressId}
            shippingOptions={shippingOptions}
            selectedShipping={selectedShipping}
            onSelectShipping={actions.handleSelectShipping}
            formatRupiah={formatRupiah}
          />

          {/* Catatan Tambahan */}
          <CheckoutNotesSection
            notes={notes}
            onNotesChange={actions.handleNotesChange}
            disabled={isLoadingCart || isSubmitting}
          />

          {/* Action Button (Hanya tampil di Mobile) */}
          <div className="block lg:hidden mt-8">
            <button
              onClick={actions.handleCheckout}
              disabled={isLoadingCart || isSubmitting || !selectedShipping}
              className="w-full bg-[var(--mama-hot-pink)] hover:bg-[#c24467] text-white font-bold py-4 px-4 rounded-full transition-colors text-font-3 disabled:opacity-50 disabled:cursor-not-allowed uppercase animate-fade-in"
            >
              {isSubmitting ? "Memproses..." : "Lanjut ke Pembayaran"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Ringkasan Tagihan */}
        <CheckoutSummaryCard
          cart={cart}
          isLoadingCart={isLoadingCart}
          isCalculatingShipping={isCalculatingShipping}
          isSubmitting={isSubmitting}
          selectedShipping={selectedShipping}
          totals={totals}
          onCheckout={actions.handleCheckout}
          formatRupiah={formatRupiah}
        />
      </div>
    </div>
  );
}

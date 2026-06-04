import {AddressList} from "@/features/address/components/listing/AddressList";
import React from "react";

/**
 * Server Component for the Address List Page.
 */
export default function AddressesPage() {
  return (
    <main className="page-max-width py-12 px-4 md:px-8">
      <div className="mb-8 max-w-3xl mx-auto">
        <h1 className="text-font-5 font-bold text-[var(--mama-brown)]">
          Daftar Alamat
        </h1>
        <p className="text-font-2 text-gray-500 mt-2">
          Kelola alamat pengiriman Anda.
        </p>
      </div>

      <AddressList />
    </main>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import {AddressFormData} from "@/features/address/types/address.types";

// Extending the form data to include the resolved names saved in local storage
interface SavedAddress extends AddressFormData {
  fullPhone: string;
  provinceName: string;
  cityName: string;
  districtName: string;
  subdistrictName: string;
  savedAt: string;
}

export function AddressList() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Default to the first address as selected for demonstration, matching the UI
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem("mamabear_addresses");
    if (saved) {
      try {
        setAddresses(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse addresses from local storage", error);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-4 animate-pulse">
        <div className="h-40 bg-gray-200 rounded-xl w-full"></div>
        <div className="h-40 bg-gray-200 rounded-xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="space-y-4">
        {addresses.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl border border-gray-200 text-gray-500 text-font-2">
            Belum ada alamat tersimpan.
          </div>
        ) : (
          addresses.map((address, index) => {
            const isSelected = selectedAddressIndex === index;
            
            return (
              <div
                key={address.savedAt + index}
                onClick={() => setSelectedAddressIndex(index)}
                className={`p-6 rounded-xl border cursor-pointer transition-colors relative ${
                  isSelected 
                    ? "border-[var(--mama-hot-pink)] bg-white" 
                    : "border-gray-300 bg-white hover:border-gray-400"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-[var(--mama-brown)]" size={20} />
                    <h3 className="font-bold text-[var(--mama-brown)] text-font-2">
                      {address.label} {address.name}
                    </h3>
                  </div>
                  <button className="text-gray-400 hover:text-[var(--mama-brown)] text-sm font-medium transition-colors">
                    Ubah
                  </button>
                </div>
                
                <div className="pl-7 space-y-2">
                  <p className="text-[var(--mama-brown)] font-bold text-font-1">
                    {address.fullPhone}
                  </p>
                  <div className="text-gray-600 text-font-1 leading-relaxed">
                    <p>{address.street}</p>
                    <p>
                      {address.districtName && `Kec. ${address.districtName}, `}
                      {address.subdistrictName && `Kel. ${address.subdistrictName}`}
                    </p>
                    <p>
                      {address.cityName && `Kota ${address.cityName}, `}
                      {address.provinceName}
                    </p>
                    <p>{address.zipCode}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Link
        href="address/new"
        className="block w-full text-center bg-[var(--mama-pink)] hover:bg-[#f5b8c9] text-[var(--mama-brown)] font-bold py-4 px-4 rounded-full transition-colors text-font-3"
      >
        + Alamat baru
      </Link>
    </div>
  );
}
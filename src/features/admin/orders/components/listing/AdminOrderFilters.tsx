"use client";

import React from "react";
import { Search, Filter, Download, ChevronDown } from "lucide-react";
import { ORDER_STATUS_OPTIONS } from "../utils/orderStatus";

interface AdminOrderFiltersProps {
  searchInput: string;
  setSearchInput: (val: string) => void;
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

export function AdminOrderFilters({
  searchInput,
  setSearchInput,
  currentStatus,
  onStatusChange,
}: AdminOrderFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex-1 w-full md:w-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-light-gray)]" />
        <input
          type="text"
          placeholder="Cari ID pesanan, pelanggan, atau email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-font-2 md:text-font-2 focus:outline-none focus:ring-2 focus:ring-[var(--mama-hot-pink)]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-auto">
          <select
            value={currentStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-font-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mama-hot-pink)] cursor-pointer appearance-none"
          >
            <option value="ALL">Semua Status</option>
            {ORDER_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-light-gray)] pointer-events-none" />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-font-2 font-medium hover:bg-gray-50 transition-colors cursor-pointer">
          <Filter className="w-4 h-4" />
          Filter Lainnya
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-font-2 font-medium hover:bg-gray-50 transition-colors ml-auto md:ml-0 cursor-pointer">
          <Download className="w-4 h-4" />
          Ekspor
        </button>
      </div>
    </div>
  );
}

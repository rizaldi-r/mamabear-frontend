"use client";

import React, { useState } from "react";
import { Search, Filter, Download, ChevronDown, Eraser, Trash, SortDesc, SortAsc } from "lucide-react";
import { ORDER_STATUS_OPTIONS } from "../utils/orderStatus";
import { Order } from "../types/adminOrder.types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AdminOrderFiltersProps {
  orders: Order[];
  searchInput: string;
  setSearchInput: (val: string) => void;
  currentStatus: string;
  onStatusChange: (status: string) => void;
  setDateInput: (startDate: string, endDate: string) => void;
  handleErase:()=>void,
  onExport: () => void;
  isExporting: boolean;
}

export function AdminOrderFilters({
  searchInput,
  setSearchInput,
  currentStatus,
  onStatusChange,
  setDateInput,
  handleErase,
  onExport,
  isExporting,
}: AdminOrderFiltersProps) {
  const [filter, setFilter] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('ASC');

  // Date UI state (IMPORTANT: Date | null)
  const [inputstartDate, setStartDate] = useState<Date | null>(null);
  const [inputendDate, setEndDate] = useState<Date | null>(null);
  

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">

      {/* SEARCH */}
      <div className="flex-1 w-full md:w-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-light-gray)]" />
        <input
          type="text"
          placeholder="Cari ID pesanan, pelanggan, atau email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--mama-hot-pink)]"
        />
      </div>

      {/* FILTER AREA */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">

        {/* STATUS */}
        <div className="relative w-full md:w-auto">
          <select
            value={currentStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mama-hot-pink)] appearance-none cursor-pointer"
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

        {/* DATE FILTER */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilter(!filter)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            Pilih Tanggal
          </button>

          {filter && (
            <div className="absolute mt-2 w-30 bg-white border border-gray-300 rounded-lg p-3 shadow-lg z-50">
              <DatePicker
                selectsRange
                inline
                startDate={inputstartDate}
                endDate={inputendDate}
                minDate={inputstartDate || undefined}
                onChange={(update: [Date | null, Date | null]) => {
                  let start = update[0];
                  let end = update[1];

                  if (start && !end) {
                    const startString = formatDate(start);

                    setStartDate(start);
                    setEndDate(null);

                    setDateInput(startString, startString);
                    return;
                  }

                  if (start && end) {
                    const startString = formatDate(start);
                    const endString = formatDate(end);

                    setStartDate(start);
                    setEndDate(end);

                    setDateInput(startString, endString);
                  }
                }}
              />
            </div>
          )}
        </div>

      
        <button
          onClick={handleErase}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Trash className="w-4 h-4" />
          Hapus Filter
        </button>

        <button
          onClick={()=>setSort((prev)=> prev=='DESC' ? 'ASC' : 'DESC')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
        >
          {sort=='DESC' && <SortDesc className="w-4 h-4" />}
          {sort=='ASC' && <SortAsc className="w-4 h-4" />}
        </button>

        {/* EXPORT */}
        <button 
          onClick={onExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-font-2 font-medium hover:bg-gray-50 transition-colors w-full md:w-auto justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <span className="w-4 h-4 border-2 border-[var(--color-gray)] border-t-transparent rounded-full animate-spin" />
              Mengekspor...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Ekspor CSV
            </>
          )}
        </button>

      </div>
    </div>
  );
}
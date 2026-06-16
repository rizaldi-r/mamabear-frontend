"use client";

import React from "react";
import { useAdminOrders } from "../hooks/useAdminOrders";
import { AdminOrderFilters } from "./AdminOrderFilters";
import { AdminOrderTable } from "./AdminOrderTable";

export function AdminOrderListing() {
  const {
    orders,
    isLoading,
    error,
    searchInput,
    setSearchInput,
    currentStatus,
    handleStatusFilterChange,
    currentPage,
    handlePageChange,
    updateStatus,
    handleFilterDate,
    handleErase,
    handleExportCSV,
    isExporting
  } = useAdminOrders();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-font-5 md:text-font-6 font-bold text-[var(--mama-brown)]">
          Pesanan 
        </h1>
        <p className="text-font-2 md:text-font-3 text-[var(--color-gray)]">
          Kelola dan lacak pesanan pelanggan
        </p>
      </div>

      <AdminOrderFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        currentStatus={currentStatus}
        onStatusChange={handleStatusFilterChange}
        orders={orders}
        setDateInput={handleFilterDate}
        handleErase={handleErase}
        onExport={handleExportCSV}
        isExporting={isExporting}

      />

      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <AdminOrderTable
            orders={orders}
            isLoading={isLoading}
            onUpdateStatus={updateStatus}
          />

          {/* Footer & Pagination */}
          {!isLoading && orders.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
              <span className="text-sm text-[var(--color-light-gray)]">
                Menampilkan pesanan terbaru
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  Sebelumnya
                </button>
                <button className="px-4 py-2 bg-[var(--mama-pink)] text-[var(--mama-brown)] border border-gray-300 rounded-lg text-sm font-bold">
                  {currentPage}
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { OrderDetail, OrderStatus } from "../types/adminOrder.types";
import { ORDER_STATUS_OPTIONS } from "../utils/orderStatus";

interface SidebarCardsProps {
  order: OrderDetail;
  isUpdating: boolean;
  onUpdateStatus: (status: OrderStatus) => void;
}

export function AdminOrderCustomerCard({ order }: { order: OrderDetail }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col gap-2">
      <h3 className="text-font-3 font-bold text-[var(--mama-brown)] mb-2">
        Pelanggan
      </h3>
      <p className="text-font-2 text-[var(--color-gray)] font-medium">
        {order.user.name}
      </p>
      <p className="text-sm text-[var(--color-light-gray)]">
        {order.user.email}
      </p>
      <p className="text-sm text-[var(--color-light-gray)]">
        {order.user.phone}
      </p>
    </div>
  );
}

export function AdminOrderAddressCard({ order }: { order: OrderDetail }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col gap-2">
      <h3 className="text-font-3 font-bold text-[var(--mama-brown)] mb-2">
        Alamat Pengiriman
      </h3>
      <p className="text-font-2 text-[var(--color-gray)] leading-relaxed">
        {order.shippingAddress.completeAddress}
      </p>
      {order.shippingAddress.detail && (
        <p className="text-sm text-[var(--color-light-gray)] mt-1">
          Catatan: {order.shippingAddress.detail}
        </p>
      )}
    </div>
  );
}

export function AdminOrderDeliveryCard({ order }: { order: OrderDetail }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
      <h3 className="text-font-3 font-bold text-[var(--mama-brown)]">
        Pengiriman
      </h3>

      <div className="flex justify-between items-center text-sm">
        <span className="text-[var(--color-light-gray)]">Metode</span>
        <span className="text-[var(--color-gray)] font-medium">
          {order.courierName || "N/A"}{" "}
          {order.shippingMethod ? `- ${order.shippingMethod}` : ""}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-[var(--color-light-gray)]">No. Resi</span>
        <span className="text-[var(--color-gray)] font-medium">
          {order.trackingNumber || "Belum tersedia"}
        </span>
      </div>

      <button className="w-full mt-2 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[var(--color-gray)] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
        Lacak Pengiriman
      </button>
    </div>
  );
}

export function AdminOrderActionsCard({
  order,
  isUpdating,
  onUpdateStatus,
}: SidebarCardsProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order.status,
  );

  // Sync internal state if order.status changes from outside
  useEffect(() => {
    setSelectedStatus(order.status);
  }, [order.status]);

  const handleUpdate = () => {
    if (selectedStatus !== order.status) {
      onUpdateStatus(selectedStatus);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
      <h3 className="text-font-3 font-bold text-[var(--mama-brown)]">
        Aksi Pesanan
      </h3>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-font-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mama-hot-pink)]"
        disabled={isUpdating}
      >
        {ORDER_STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleUpdate}
        disabled={isUpdating || selectedStatus === order.status}
        className="w-full bg-[var(--mama-hot-pink)] text-white py-2.5 rounded-lg text-font-2 font-bold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {isUpdating ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Menyimpan...
          </>
        ) : (
          "Perbarui Status"
        )}
      </button>
    </div>
  );
}

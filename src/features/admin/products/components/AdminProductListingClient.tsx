"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image"; // Tambahkan import Image dari Next.js
import { Search, Filter, Loader2, Edit, MoreVertical, ImageIcon, ChevronDown, ChevronUp, Trash2, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { fetchFilteredProducts, updateProduct, deleteProduct } from "@/features/admin/products/services/adminProductService";
import { searchService } from "@/features/products/services/searchService";
import type { Product, ProductFilterParams } from "@/features/products/types/products.types";
import type { Category } from "@/features/categories/types/category.types";

// ==========================================
// 1. UTILS & HOOKS
// ==========================================

const formatIDR = (price?: string) => {
  if (!price) return "Rp 0";
  const numericPrice = parseInt(price, 10);
  if (isNaN(numericPrice)) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericPrice);
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useAdminProducts() {
  // Local State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  // Advanced Filter State
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [inStock, setInStock] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Pagination State
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  // Debounced Values
  const debouncedSearch = useDebounce(searchQuery, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const resetFilters = useCallback(() => {
    setSelectedCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setInStock("all");
    setSortBy("newest");
  }, []);

  // Fetch logic wrapped in useCallback
  const loadProducts = useCallback(
    async (isLoadMore = false) => {
      // 1. Always set loading to true for any fetch
      setIsLoading(true);

      if (!isLoadMore) {
        // 2. Clear existing products to trigger the Skeleton Loader
        setProducts([]);
        // 3. Clear selections to prevent ghost-actions on hidden products
        setSelectedProductIds([]);
      }

      try {
        // If there is an active search, use the searchService endpoint
        if (debouncedSearch) {
          const response = await searchService.getProducts(debouncedSearch);

          if (response.success) {
            // The search endpoint does not return pagination metadata in our types,
            // so we replace the data completely and disable load more
            setProducts(response.data);
            setCursor(null);
            setHasNextPage(false);
          }
        } else {
          // Otherwise, use the standard product filtering & pagination endpoint
          const params: ProductFilterParams = {
            limit: 10,
          };

          if (selectedCategory !== "all") {
            params.categories = [selectedCategory];
          }

          // Apply advanced filters using debounced values
          if (debouncedMinPrice) params.minPrice = debouncedMinPrice;
          if (debouncedMaxPrice) params.maxPrice = debouncedMaxPrice;
          if (inStock !== "all") params.inStock = inStock === "true";

          // Apply sorting
          switch (sortBy) {
            case "price_asc":
              params.priceAscending = 1;
              break;
            case "price_desc":
              params.priceAscending = 0;
              break;
            case "newest":
              params.creationDateAscending = 0;
              break;
            case "popular":
              params.popularAscending = 0;
              break;
          }

          if (isLoadMore && cursor) {
            params.cursor = cursor;
          }

          const response = await fetchFilteredProducts(params);

          if (response) {
            setProducts((prev) => (isLoadMore ? [...prev, ...response.data] : response.data));
            setCursor(response.pagination.nextCursor);
            setHasNextPage(response.pagination.hasNextPage);
          }
        }
      } catch (err) {
        // FIX: Mengubah 'error' menjadi 'err' untuk membedakan log atau hapus jika tidak digunakan, di sini kita gunakan log dengan benar
        console.error("Failed to load products", err);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCategory, debouncedSearch, debouncedMinPrice, debouncedMaxPrice, inStock, sortBy, cursor],
  );

  // Trigger fetch when filters change (resetting cursor)
  useEffect(() => {
    setCursor(null);
    loadProducts(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, debouncedSearch, debouncedMinPrice, debouncedMaxPrice, inStock, sortBy]);

  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) {
      loadProducts(true);
    }
  };

  const refreshProducts = useCallback(() => {
    setCursor(null);
    loadProducts(false);
  }, [loadProducts]);

  return {
    products,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    inStock,
    setInStock,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    hasNextPage,
    handleLoadMore,
    refreshProducts,
    resetFilters,
    selectedProductIds,
    setSelectedProductIds,
  };
}

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  resetFilters: () => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  initialCategories: Category[];
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  inStock: string;
  setInStock: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
}

function ProductFilters({
  searchQuery,
  setSearchQuery,
  resetFilters,
  selectedCategory,
  setSelectedCategory,
  initialCategories,
  showFilters,
  setShowFilters,
  inStock,
  setInStock,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={resetFilters}
            onFocus={resetFilters}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--mama-pink)] focus:border-[var(--mama-hot-pink)] transition-all text-font-2"
          />
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 md:w-[200px] px-4 py-2.5 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mama-pink)] focus:border-[var(--mama-hot-pink)] text-font-2 text-[var(--color-gray)]"
          >
            <option value="all">Semua Kategori</option>
            {initialCategories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 border rounded-md flex items-center gap-2 font-medium transition-colors ${showFilters ? "bg-[var(--mama-cream)] border-[var(--mama-hot-pink)] text-[var(--mama-hot-pink)]" : "bg-white border-gray-200 hover:bg-gray-50 text-[var(--color-gray)]"}`}
          >
            <Filter className="w-4 h-4" />
            Filter
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Advanced Filters */}
      {showFilters && (
        <div className="p-4 border-t border-gray-100 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--color-gray)]">Status Stok</label>
            <select
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--mama-pink)] focus:border-[var(--mama-hot-pink)] text-font-1 text-[var(--color-gray)]"
            >
              <option value="all">Semua Status</option>
              <option value="true">Tersedia</option>
              <option value="false">Habis</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--color-gray)]">Urutkan Berdasarkan</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--mama-pink)] focus:border-[var(--mama-hot-pink)] text-font-1 text-[var(--color-gray)]"
            >
              <option value="newest">Terbaru</option>
              <option value="popular">Terpopuler</option>
              <option value="price_asc">Harga Terendah</option>
              <option value="price_desc">Harga Tertinggi</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--color-gray)]">Harga Minimum (Rp)</label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--mama-pink)] focus:border-[var(--mama-hot-pink)] text-font-1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--color-gray)]">Harga Maksimum (Rp)</label>
            <input
              type="number"
              placeholder="Tak Terhingga"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--mama-pink)] focus:border-[var(--mama-hot-pink)] text-font-1"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ProductTableSkeleton() {
  return (
    <tr className="border-b border-[var(--color-light-gray)]/20">
      <td className="p-4">
        <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
      </td>
      <td className="p-4 flex items-center gap-4 min-w-[250px]">
        <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
      </td>
      <td className="p-4">
        <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gray-200 animate-pulse" />
          <div className="w-8 h-8 rounded-md bg-gray-200 animate-pulse" />
        </div>
      </td>
    </tr>
  );
}

interface ProductTableRowProps {
  product: Product;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

function ProductTableRow({ product, isSelected, onToggle }: ProductTableRowProps) {
  const stock = product.variants?.[0]?.stock ?? 0;

  return (
    <tr className={`border-b border-[var(--color-light-gray)]/20 hover:bg-[var(--mama-cream)]/30 transition-colors ${isSelected ? "bg-[var(--mama-cream)]/20" : ""}`}>
      <td className="p-4">
        <input type="checkbox" checked={isSelected} onChange={() => onToggle(product.id)} className="w-4 h-4 rounded border-gray-300 text-[var(--mama-hot-pink)] focus:ring-[var(--mama-hot-pink)] cursor-pointer" />
      </td>
      <td className="p-4 flex items-center gap-4 min-w-[250px]">
        <div className="relative w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
          {/* FIX: Menggunakan komponen Image dari Next.js untuk optimasi LCP */}
          {product.images?.[0] ? <Image src={product.images[0].imageUrl} alt={product.images[0].altText || product.name} fill sizes="48px" className="object-cover" /> : <ImageIcon className="text-gray-400 w-6 h-6" />}
        </div>
        <span className="font-semibold text-[var(--mama-brown)] text-font-2">{product.name}</span>
      </td>
      <td className="p-4 text-[var(--color-gray)] text-font-2">{product.category?.name || "-"}</td>
      <td className="p-4 text-[var(--color-gray)] text-font-2">{formatIDR(product.currentPrice)}</td>
      <td className="p-4 text-[var(--color-gray)] text-font-2">{stock}</td>
      <td className="p-4">
        {product.isActive ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#e6f4ea] text-[#1e8e3e] border border-[#ceead6]">Diterbitkan</span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">Draf</span>
        )}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button className="p-2 text-[var(--color-gray)] hover:bg-[var(--mama-cream)] rounded-md transition-colors" title="Edit Produk">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-[var(--color-gray)] hover:bg-[var(--mama-cream)] rounded-md transition-colors" title="Opsi Lainnya">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

interface BulkActionsBarProps {
  selectedCount: number;
  isBulkProcessing: boolean;
  bulkError: string | null;
  onPublish: () => void;
  onUnpublish: () => void;
  onDeletePrompt: () => void;
}

function BulkActionsBar({ selectedCount, isBulkProcessing, bulkError, onPublish, onUnpublish, onDeletePrompt }: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-[var(--mama-pink)]/20 border border-[var(--mama-pink)] rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-[var(--mama-brown)] text-font-2">{selectedCount} produk terpilih</span>
        {isBulkProcessing && <Loader2 className="w-4 h-4 animate-spin text-[var(--mama-hot-pink)]" />}
        {bulkError && <span className="text-red-500 text-sm font-medium">{bulkError}</span>}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onPublish}
          disabled={isBulkProcessing}
          className="px-4 py-2 bg-white border border-gray-200 rounded-md text-[var(--color-gray)] hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
        >
          <Eye className="w-4 h-4" /> Terbitkan
        </button>
        <button
          onClick={onUnpublish}
          disabled={isBulkProcessing}
          className="px-4 py-2 bg-white border border-gray-200 rounded-md text-[var(--color-gray)] hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
        >
          <EyeOff className="w-4 h-4" /> Jadikan Draf
        </button>
        <button onClick={onDeletePrompt} disabled={isBulkProcessing} className="px-4 py-2 bg-white border border-red-200 rounded-md text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-medium disabled:opacity-50">
          <Trash2 className="w-4 h-4" /> Hapus
        </button>
      </div>
    </div>
  );
}

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  isAllSelected: boolean;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedProductIds: number[];
  onToggleProduct: (id: number) => void;
}

function ProductTable({ products, isLoading, isAllSelected, onSelectAll, selectedProductIds, onToggleProduct }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-[var(--mama-pink)] text-[var(--mama-brown)]">
          <tr>
            <th className="p-4 rounded-tl-lg w-12">
              <input type="checkbox" checked={isAllSelected} onChange={onSelectAll} className="w-4 h-4 rounded border-gray-300 text-[var(--mama-hot-pink)] focus:ring-[var(--mama-hot-pink)] cursor-pointer" />
            </th>
            <th className="p-4 text-font-1 font-bold tracking-wide uppercase">Produk</th>
            <th className="p-4 text-font-1 font-bold tracking-wide uppercase">Kategori</th>
            <th className="p-4 text-font-1 font-bold tracking-wide uppercase">Harga</th>
            <th className="p-4 text-font-1 font-bold tracking-wide uppercase">Stok</th>
            <th className="p-4 text-font-1 font-bold tracking-wide uppercase">Status</th>
            <th className="p-4 text-font-1 font-bold tracking-wide uppercase rounded-tr-lg">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && products.length === 0 ? (
            // Display 5 skeleton rows during initial load
            Array.from({ length: 5 }).map((_, idx) => <ProductTableSkeleton key={idx} />)
          ) : products.length > 0 ? (
            products.map((product) => <ProductTableRow key={product.id} product={product} isSelected={selectedProductIds.includes(product.id)} onToggle={onToggleProduct} />)
          ) : (
            <tr>
              <td colSpan={7} className="p-8 text-center text-[var(--color-gray)]">
                Tidak ada produk yang ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

interface PaginationFooterProps {
  productsCount: number;
  selectedCount: number;
  hasNextPage: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

function PaginationFooter({ productsCount, selectedCount, hasNextPage, isLoading, onLoadMore }: PaginationFooterProps) {
  return (
    <div className="p-4 border-t border-[var(--color-light-gray)]/20 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
      <span className="text-[var(--color-gray)] text-font-1">
        Menampilkan {productsCount} produk
        {selectedCount > 0 && ` (${selectedCount} dipilih)`}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={onLoadMore}
          disabled={!hasNextPage || isLoading}
          className="px-4 py-2 border border-gray-200 rounded-md text-font-1 text-[var(--color-gray)] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading && productsCount > 0 && <Loader2 className="w-4 h-4 animate-spin" />}
          {hasNextPage ? "Muat Lebih Banyak" : "Semua Data Dimuat"}
        </button>
      </div>
    </div>
  );
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
  selectedCount: number;
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, isProcessing, selectedCount }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-lg font-bold">Konfirmasi Hapus</h3>
        </div>
        <p className="text-[var(--color-gray)] mb-6 text-font-2">
          Apakah Anda yakin ingin menghapus <strong>{selectedCount}</strong> produk yang terpilih? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} disabled={isProcessing} className="px-4 py-2 text-[var(--color-gray)] bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors disabled:opacity-50">
            Batal
          </button>
          <button onClick={onConfirm} disabled={isProcessing} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors flex items-center gap-2 disabled:opacity-50">
            {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN CLIENT COMPONENT
// ==========================================

interface AdminProductsClientProps {
  initialCategories: Category[];
}

export default function AdminProductsClient({ initialCategories }: AdminProductsClientProps) {
  const {
    products,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    inStock,
    setInStock,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    hasNextPage,
    handleLoadMore,
    refreshProducts,
    resetFilters,
    selectedProductIds,
    setSelectedProductIds,
  } = useAdminProducts();

  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bulkError, setBulkError] = useState<string | null>(null);

  // Handle select all logic
  const isAllSelected = products.length > 0 && selectedProductIds.length === products.length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProductIds(products.map((p) => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleToggleProduct = (id: number) => {
    setSelectedProductIds((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]));
  };

  const handleBulkStatusUpdate = async (isActive: boolean) => {
    setIsBulkProcessing(true);
    setBulkError(null);
    try {
      await Promise.all(selectedProductIds.map((id) => updateProduct(id, { isActive })));
      setSelectedProductIds([]);
      refreshProducts();
    } catch {
      setBulkError("Gagal memperbarui status beberapa produk.");
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleBulkDelete = async () => {
    setIsBulkProcessing(true);
    setBulkError(null);
    try {
      await Promise.all(selectedProductIds.map((id) => deleteProduct(id)));
      setSelectedProductIds([]);
      setShowDeleteModal(false);
      refreshProducts();
    } catch {
      setBulkError("Gagal menghapus beberapa produk.");
    } finally {
      setIsBulkProcessing(false);
    }
  };

  return (
    <>
      <ProductFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resetFilters={resetFilters}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        initialCategories={initialCategories}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        inStock={inStock}
        setInStock={setInStock}
        sortBy={sortBy}
        setSortBy={setSortBy}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      <BulkActionsBar
        selectedCount={selectedProductIds.length}
        isBulkProcessing={isBulkProcessing}
        bulkError={bulkError}
        onPublish={() => handleBulkStatusUpdate(true)}
        onUnpublish={() => handleBulkStatusUpdate(false)}
        onDeletePrompt={() => setShowDeleteModal(true)}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <ProductTable products={products} isLoading={isLoading} isAllSelected={isAllSelected} onSelectAll={handleSelectAll} selectedProductIds={selectedProductIds} onToggleProduct={handleToggleProduct} />
        <PaginationFooter productsCount={products.length} selectedCount={selectedProductIds.length} hasNextPage={hasNextPage} isLoading={isLoading} onLoadMore={handleLoadMore} />
      </div>

      <DeleteConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleBulkDelete} isProcessing={isBulkProcessing} selectedCount={selectedProductIds.length} />
    </>
  );
}

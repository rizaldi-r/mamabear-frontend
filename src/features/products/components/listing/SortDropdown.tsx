import { ChevronDown } from "lucide-react";

export function SortDropdown() {
  return (
    <div className="flex justify-end mb-6">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Urutkan</span>
        <button className="flex items-center gap-2 px-4 py-1.5 border rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Harga rendah ke tinggi <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
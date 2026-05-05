import { ChevronDown, LayoutGrid, List } from "lucide-react";
import { ViewMode } from "../../types/products.types";

interface ToolbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export function Toolbar({ viewMode, setViewMode }: ToolbarProps): JSX.Element {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
        <button 
          onClick={() => setViewMode('grid')}
          aria-label="Grid view"
          className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-rose-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <LayoutGrid size={18} />
        </button>
        <button 
          onClick={() => setViewMode('list')}
          aria-label="List view"
          className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-rose-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <List size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Urutkan</span>
        <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
          Harga rendah ke tinggi 
          <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
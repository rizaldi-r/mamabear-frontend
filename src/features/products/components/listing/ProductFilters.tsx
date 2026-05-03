type Props = {
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
};

export default function ProductFilters({ setSearch, setCategory }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* Category */}
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded-lg w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="">All Categories</option>
        <option value="Dental">Dental</option>
        <option value="Medical">Medical</option>
      </select>
    </div>
  );
}
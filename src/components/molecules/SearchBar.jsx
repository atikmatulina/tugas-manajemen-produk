function SearchBar({ value, onChange }) {
  return (
    <div className="flex w-full items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-500 sm:w-80">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16" y2="16" />
      </svg>
      <input
        type="text"
        placeholder="Cari nama produk..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm text-gray-900 outline-none"
      />
    </div>
  );
}

export default SearchBar;

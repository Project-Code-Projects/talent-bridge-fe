import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SearchBarProps } from "../../types/searchbar.types";
import { fadeUp, stagger } from "../../utils/animation";

export default function SearchBar({
  onSearch,
  placeholder = "Search...",
  filterOptions,
  initialSearch = "",
  initialFilter = "",
  className = "",
  debounceMs = 300,
}: SearchBarProps) {
  const [search, setSearch] = useState(initialSearch);
  const [filterBy, setFilterBy] = useState(initialFilter);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSearch = useCallback(
    (searchValue: string, filterValue: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        onSearch(searchValue, filterValue);
      }, debounceMs);
    },
    [onSearch, debounceMs]
  );

  useEffect(() => {
    debouncedSearch(search, filterBy);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search, filterBy, debouncedSearch]);

  const handleClear = () => {
    setSearch("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    debouncedSearch("", filterBy);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    setFilterBy(newFilter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="animate"
      className={`flex flex-col sm:flex-row gap-3 ${className}`}
    >
      <motion.div variants={stagger} className="flex-1 flex gap-2">
        <motion.div variants={stagger} className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 pr-10"
          />
          {search && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              ✕
            </button>
          )}
        </motion.div>
      </motion.div>

      {filterOptions && filterOptions.length > 0 && (
        <select
          value={filterBy}
          onChange={handleFilterChange}
          className="rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 min-w-[160px]"
        >
          {/* for sort we probably always want an explicit value */}
          {filterBy === "" && <option value="">Sort by...</option>}
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </motion.div>
  );
}

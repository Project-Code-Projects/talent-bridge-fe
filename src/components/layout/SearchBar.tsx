import { useState } from "react";
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
}: SearchBarProps) {
  const [search, setSearch] = useState(initialSearch);
  const [filterBy, setFilterBy] = useState(initialFilter);

  const handleSearch = () => {
    onSearch(search, filterBy);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearch("");
    setFilterBy("");
    onSearch("", "");
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
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          {search && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              ✕
            </button>
          )}
        </motion.div>

        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
      </motion.div>

      {filterOptions && filterOptions.length > 0 && (
        <select
          value={filterBy}
          onChange={(e) => {
            setFilterBy(e.target.value);
            onSearch(search, e.target.value);
          }}
          className="rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 min-w-[140px]"
        >
          <option value="">All</option>
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

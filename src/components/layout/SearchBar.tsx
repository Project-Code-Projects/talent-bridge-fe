import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SearchBarProps } from "../../types/searchbar.types";
import { fadeUp, stagger } from "../../utils/animation";

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
  filterOptions,
  initialSearch = "",
  initialFilter = "",
  className = "",
  debounceMs = 300,
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [filterBy, setFilterBy] = useState(initialFilter);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitial = useRef(true);

  // Keep local state in sync if parent changes initialSearch / initialFilter
  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setFilterBy(initialFilter);
  }, [initialFilter]);

  const runSearch = useCallback(
    (searchValue: string, filterValue: string) => {
      onSearch(searchValue, filterValue);
    },
    [onSearch]
  );

  const debouncedSearch = useCallback(
    (searchValue: string, filterValue: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        runSearch(searchValue, filterValue);
      }, debounceMs);
    },
    [runSearch, debounceMs]
  );

  // Trigger live search when search text or filter changes
  useEffect(() => {
    // Skip very first render so the admin pages can do their own initial fetch
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    debouncedSearch(search, filterBy);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search, filterBy, debouncedSearch]);

  // Input change handler – just updates local state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Filter change handler – updates local state and triggers search
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterBy(value);

    // If you want filter changes also debounced, leave this.
    // If you want them instant, you can swap to runSearch(search, value).
    debouncedSearch(search, value);
  };

  // Clear button – clears only via the same debounced pipeline
  const handleClear = () => {
    setSearch("");
    debouncedSearch("", filterBy);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
              type="button"
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
          className="rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 min-w-40"
        >
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
};

export default SearchBar;

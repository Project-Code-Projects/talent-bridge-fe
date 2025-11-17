export interface SearchBarProps {
  onSearch: (search: string, filterBy?: string) => void;
  placeholder?: string;
  filterOptions?: { value: string; label: string }[];
  initialSearch?: string;
  initialFilter?: string;
  className?: string;
  debounceMs?: number;
}

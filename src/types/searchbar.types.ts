export interface SearchBarOption {
  value: string;
  label: string;
}

export interface SearchBarProps {
  onSearch: (search: string, filterBy?: string) => void;
  placeholder?: string;
  filterOptions?: SearchBarOption[];
  initialSearch?: string;
  initialFilter?: string;
  className?: string;
  debounceMs?: number;
}

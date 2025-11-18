import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onSearch, placeholder = 'Search...' }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleClear = () => {
    onChange('');
    onSearch();
  };

  return (
    <div
      className={`relative flex items-center bg-white rounded-xl border-2 transition-all duration-200 ${
        isFocused ? 'border-blue-500 shadow-md' : 'border-slate-200 shadow-sm'
      }`}
    >
      <Search
        className={`absolute left-4 w-5 h-5 transition-colors ${
          isFocused ? 'text-blue-500' : 'text-slate-400'
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3.5 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
        </button>
      )}
    </div>
  );
}

import { X } from 'lucide-react';

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      {label}
      {active && <X className="w-3.5 h-3.5" />}
    </button>
  );
}

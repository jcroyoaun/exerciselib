import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from '../types/api';

interface PaginationProps {
  metadata: Metadata;
  onPageChange: (page: number) => void;
}

export function Pagination({ metadata, onPageChange }: PaginationProps) {
  if (metadata.total_records === 0) return null;

  const { current_page, last_page, total_records } = metadata;
  const hasNext = current_page < last_page;
  const hasPrev = current_page > 1;

  const startRecord = (current_page - 1) * metadata.page_size + 1;
  const endRecord = Math.min(current_page * metadata.page_size, total_records);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
      <div className="text-sm text-slate-600">
        Showing <span className="font-medium text-slate-900">{startRecord}</span> to{' '}
        <span className="font-medium text-slate-900">{endRecord}</span> of{' '}
        <span className="font-medium text-slate-900">{total_records}</span> results
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={!hasPrev}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            hasPrev
              ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex items-center gap-1 px-3">
          <span className="text-sm font-medium text-slate-900">{current_page}</span>
          <span className="text-sm text-slate-500">/</span>
          <span className="text-sm text-slate-600">{last_page}</span>
        </div>

        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={!hasNext}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            hasNext
              ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

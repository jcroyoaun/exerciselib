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
    <div className="flex items-center justify-between px-6 py-4 bg-neutral-800 border-t-2 border-cyan-400">
      <div className="text-sm font-mono text-neutral-400">
        // showing <span className="text-cyan-400 font-bold">{startRecord}</span> to{' '}
        <span className="text-cyan-400 font-bold">{endRecord}</span> of{' '}
        <span className="text-cyan-400 font-bold">{total_records}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={!hasPrev}
          className={`px-4 py-2 border-2 font-mono text-sm font-bold uppercase transition-all ${
            hasPrev
              ? 'bg-neutral-700 text-cyan-400 border-cyan-400 hover:bg-neutral-600'
              : 'bg-neutral-800 text-neutral-600 border-neutral-700 cursor-not-allowed'
          }`}
        >
          &lt; PREV
        </button>

        <div className="flex items-center gap-1 px-3">
          <span className="text-sm font-mono font-bold text-cyan-400">[{current_page}/{last_page}]</span>
        </div>

        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={!hasNext}
          className={`px-4 py-2 border-2 font-mono text-sm font-bold uppercase transition-all ${
            hasNext
              ? 'bg-neutral-700 text-cyan-400 border-cyan-400 hover:bg-neutral-600'
              : 'bg-neutral-800 text-neutral-600 border-neutral-700 cursor-not-allowed'
          }`}
        >
          NEXT &gt;
        </button>
      </div>
    </div>
  );
}

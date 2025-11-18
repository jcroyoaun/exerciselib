import { ArrowRight } from 'lucide-react';
import type { MovementPattern } from '../types/api';

interface MovementPatternCardProps {
  pattern: MovementPattern;
}

export function MovementPatternCard({ pattern }: MovementPatternCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          {pattern.name}
        </h3>
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">{pattern.description}</p>
    </div>
  );
}

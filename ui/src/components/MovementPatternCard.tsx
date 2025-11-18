import { Edit, Trash2 } from 'lucide-react';
import type { MovementPattern } from '../types/api';

interface MovementPatternCardProps {
  pattern: MovementPattern;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function MovementPatternCard({ pattern, onEdit, onDelete }: MovementPatternCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex-1">
          {pattern.name}
        </h3>
        <div className="flex items-center gap-1 shrink-0">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-blue-600" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">{pattern.description}</p>
    </div>
  );
}

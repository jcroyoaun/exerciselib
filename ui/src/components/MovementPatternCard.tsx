import { Edit, Trash2 } from 'lucide-react';
import type { MovementPattern } from '../types/api';

interface MovementPatternCardProps {
  pattern: MovementPattern;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function MovementPatternCard({ pattern, onEdit, onDelete }: MovementPatternCardProps) {
  return (
    <div className="bg-neutral-800 border-l-4 border-cyan-500 p-5 hover:bg-neutral-750 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-mono font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors flex-1">
          {pattern.name}
        </h3>
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 hover:bg-cyan-500/20 transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-cyan-400" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 hover:bg-red-500/20 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-neutral-300 font-mono leading-relaxed">{pattern.description}</p>
    </div>
  );
}

import { Zap, Edit, Trash2 } from 'lucide-react';
import type { Muscle } from '../types/api';
import { getBodyPartColors } from '../lib/colors';

interface MuscleCardProps {
  muscle: Muscle;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function MuscleCard({ muscle, onEdit, onDelete }: MuscleCardProps) {
  const colors = getBodyPartColors(muscle.body_part);

  return (
    <div className={`bg-neutral-800 border-l-4 ${colors.border} p-4 hover:bg-neutral-750 transition-all group`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-mono font-bold text-white flex-1">{muscle.name}</h3>
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 hover:bg-cyan-500/20 transition-colors"
              title="Edit"
            >
              <Edit className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 hover:bg-red-500/20 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Zap className={`w-3.5 h-3.5 ${colors.text}`} />
        <span className={`text-xs font-mono uppercase tracking-wider ${colors.text}`}>
          {muscle.body_part}
        </span>
      </div>
    </div>
  );
}

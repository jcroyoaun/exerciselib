import { Zap, Edit, Trash2 } from 'lucide-react';
import type { Muscle } from '../types/api';

interface MuscleCardProps {
  muscle: Muscle;
  onEdit?: () => void;
  onDelete?: () => void;
}

const bodyPartColors: Record<string, { border: string; text: string }> = {
  chest: { border: 'border-red-500', text: 'text-red-400' },
  back: { border: 'border-emerald-500', text: 'text-emerald-400' },
  traps: { border: 'border-lime-500', text: 'text-lime-400' },
  shoulders: { border: 'border-amber-500', text: 'text-amber-400' },
  biceps: { border: 'border-blue-500', text: 'text-blue-400' },
  triceps: { border: 'border-indigo-500', text: 'text-indigo-400' },
  forearms: { border: 'border-cyan-500', text: 'text-cyan-400' },
  quadriceps: { border: 'border-violet-500', text: 'text-violet-400' },
  hamstrings: { border: 'border-purple-500', text: 'text-purple-400' },
  glutes: { border: 'border-fuchsia-500', text: 'text-fuchsia-400' },
  calves: { border: 'border-pink-500', text: 'text-pink-400' },
  core: { border: 'border-teal-500', text: 'text-teal-400' },
  arms: { border: 'border-blue-500', text: 'text-blue-400' },
  legs: { border: 'border-purple-500', text: 'text-purple-400' }
};

export function MuscleCard({ muscle, onEdit, onDelete }: MuscleCardProps) {
  const colors = bodyPartColors[muscle.body_part] || bodyPartColors.chest;

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

import { Zap, Edit, Trash2 } from 'lucide-react';
import type { Muscle } from '../types/api';

interface MuscleCardProps {
  muscle: Muscle;
  onEdit?: () => void;
  onDelete?: () => void;
}

// Color mapping for specific muscle groups
const bodyPartColors: Record<string, { bg: string; border: string; text: string }> = {
  // Chest
  chest: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
  
  // Back & Traps
  back: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  traps: { bg: 'bg-lime-50', border: 'border-lime-200', text: 'text-lime-700' },
  
  // Shoulders
  shoulders: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  
  // Arms (biceps, triceps, forearms)
  biceps: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  triceps: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
  forearms: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700' },
  
  // Legs (quads, hamstrings, glutes, calves)
  quadriceps: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700' },
  hamstrings: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  glutes: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-700' },
  calves: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700' },
  
  // Core
  core: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700' }
};

export function MuscleCard({ muscle, onEdit, onDelete }: MuscleCardProps) {
  const colors = bodyPartColors[muscle.body_part] || bodyPartColors.chest;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-slate-900 flex-1">{muscle.name}</h3>
        <div className="flex items-center gap-1 shrink-0">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-3.5 h-3.5 text-blue-600" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
            </button>
          )}
          <Zap className="w-4 h-4 text-slate-400 ml-1" />
        </div>
      </div>

      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border capitalize`}
      >
        {muscle.body_part}
      </span>
    </div>
  );
}

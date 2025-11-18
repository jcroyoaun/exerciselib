import { useState } from 'react';
import { ChevronRight, ChevronDown, Edit, Trash2, Zap } from 'lucide-react';
import type { Exercise } from '../types/api';

interface ExerciseListItemProps {
  exercise: Exercise;
  onEdit: () => void;
  onDelete: () => void;
}

export function ExerciseListItem({ exercise, onEdit, onDelete }: ExerciseListItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-l-4 border-cyan-500 bg-slate-900/40 hover:bg-slate-900/60 transition-all">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-4 px-4 py-3 cursor-pointer group"
      >
        <button className="text-cyan-400 flex-shrink-0">
          {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        <div className="flex-1 grid grid-cols-12 gap-4 items-center min-w-0">
          <div className="col-span-4">
            <h3 className="font-mono text-base font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors truncate">
              {exercise.name}
            </h3>
          </div>

          <div className="col-span-2">
            <span className="inline-block px-2 py-0.5 bg-slate-800 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              {exercise.type}
            </span>
          </div>

          <div className="col-span-3 truncate">
            <span className="text-slate-400 font-mono text-sm truncate block">
              {exercise.movement_pattern?.name || '—'}
            </span>
          </div>

          <div className="col-span-2 truncate">
            {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
              <span className="text-slate-400 font-mono text-sm">
                {exercise.primary_muscles.length} primary
              </span>
            )}
          </div>

          <div className="col-span-1 flex items-center gap-1 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1.5 hover:bg-cyan-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1.5 hover:bg-red-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pl-14 border-t border-slate-700/50 bg-slate-950/40">
          <div className="pt-4 space-y-4">
            {exercise.movement_pattern?.description && (
              <div>
                <div className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
                  [ Movement Pattern ]
                </div>
                <p className="text-slate-300 font-mono text-sm leading-relaxed pl-4 border-l-2 border-cyan-500/30">
                  {exercise.movement_pattern.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <Zap className="w-3.5 h-3.5" />
                    [ Primary Muscles ]
                  </div>
                  <div className="space-y-1.5 pl-4">
                    {exercise.primary_muscles.map((muscle) => (
                      <div key={muscle.id} className="flex items-center justify-between bg-slate-800/50 border border-cyan-500/20 px-3 py-1.5">
                        <span className="text-cyan-300 font-mono text-sm">{muscle.name}</span>
                        <span className="text-slate-500 font-mono text-xs uppercase">{muscle.body_part}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <Zap className="w-3.5 h-3.5" />
                    [ Secondary Muscles ]
                  </div>
                  <div className="space-y-1.5 pl-4">
                    {exercise.secondary_muscles.map((muscle) => (
                      <div key={muscle.id} className="flex items-center justify-between bg-slate-800/30 border border-slate-700/50 px-3 py-1.5">
                        <span className="text-slate-300 font-mono text-sm">{muscle.name}</span>
                        <span className="text-slate-500 font-mono text-xs uppercase">{muscle.body_part}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
    <div className="border-l-4 border-orange-600 bg-amber-100/40 hover:bg-amber-100/80 transition-all">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-4 px-4 py-3 cursor-pointer group"
      >
        <button className="text-orange-600 flex-shrink-0">
          {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        <div className="flex-1 grid grid-cols-12 gap-4 items-center min-w-0">
          <div className="col-span-4">
            <h3 className="font-mono text-base font-bold text-orange-900 group-hover:text-orange-700 transition-colors truncate">
              {exercise.name}
            </h3>
          </div>

          <div className="col-span-2">
            <span className="inline-block px-2 py-0.5 bg-yellow-200 border-2 border-orange-600 text-orange-900 font-mono text-xs uppercase tracking-wider">
              {exercise.type}
            </span>
          </div>

          <div className="col-span-3 truncate">
            <span className="text-amber-800 font-mono text-sm truncate block">
              {exercise.movement_pattern?.name || '—'}
            </span>
          </div>

          <div className="col-span-2 truncate">
            {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
              <span className="text-amber-800 font-mono text-sm">
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
              className="p-1.5 hover:bg-orange-600/20 rounded transition-colors opacity-0 group-hover:opacity-100"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-orange-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1.5 hover:bg-red-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-700" />
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pl-14 border-t-2 border-orange-600/30 bg-yellow-50">
          <div className="pt-4 space-y-4">
            {exercise.movement_pattern?.description && (
              <div>
                <div className="text-orange-900 font-mono text-xs uppercase tracking-wider mb-2 font-bold">
                  [ Movement Pattern ]
                </div>
                <p className="text-amber-900 font-mono text-sm leading-relaxed pl-4 border-l-4 border-orange-600/50">
                  {exercise.movement_pattern.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-orange-900 font-mono text-xs uppercase tracking-wider mb-2 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    [ Primary Muscles ]
                  </div>
                  <div className="space-y-1.5 pl-4">
                    {exercise.primary_muscles.map((muscle) => (
                      <div key={muscle.id} className="flex items-center justify-between bg-amber-100 border-2 border-orange-600/40 px-3 py-1.5">
                        <span className="text-orange-900 font-mono text-sm font-semibold">{muscle.name}</span>
                        <span className="text-amber-700 font-mono text-xs uppercase">{muscle.body_part}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-amber-800 font-mono text-xs uppercase tracking-wider mb-2 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    [ Secondary Muscles ]
                  </div>
                  <div className="space-y-1.5 pl-4">
                    {exercise.secondary_muscles.map((muscle) => (
                      <div key={muscle.id} className="flex items-center justify-between bg-amber-50 border-2 border-amber-600/40 px-3 py-1.5">
                        <span className="text-amber-900 font-mono text-sm">{muscle.name}</span>
                        <span className="text-amber-700 font-mono text-xs uppercase">{muscle.body_part}</span>
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

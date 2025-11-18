import { useState } from 'react';
import { ChevronRight, ChevronDown, Edit, Trash2, Zap } from 'lucide-react';
import type { Exercise } from '../types/api';
import { exerciseTypeColors, getMovementPatternColors, getBodyPartColors } from '../lib/colors';

interface ExerciseListItemProps {
  exercise: Exercise;
  onEdit: () => void;
  onDelete: () => void;
}

export function ExerciseListItem({ exercise, onEdit, onDelete }: ExerciseListItemProps) {
  const [expanded, setExpanded] = useState(false);

  const typeColors = exerciseTypeColors[exercise.type];
  const patternColors = getMovementPatternColors(exercise.movement_pattern?.name);

  return (
    <div className={`border-l-4 ${expanded ? 'border-green-500 bg-neutral-800' : 'border-white/30 bg-neutral-800/40'} hover:bg-neutral-800/80 transition-all`}>
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-4 px-4 py-3 cursor-pointer group"
      >
        <button className={`${expanded ? 'text-green-400' : 'text-white/60'} flex-shrink-0`}>
          {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        <div className="flex-1 grid grid-cols-12 gap-4 items-center min-w-0">
          <div className="col-span-4">
            <h3 className={`font-mono text-base font-bold ${expanded ? 'text-green-400' : 'text-white'} group-hover:text-green-300 transition-colors truncate`}>
              {exercise.name}
            </h3>
          </div>

          <div className="col-span-2">
            <span className={`inline-block px-2 py-0.5 border-2 ${typeColors.border} ${typeColors.text} bg-neutral-800 font-mono text-xs uppercase tracking-wider`}>
              {exercise.type}
            </span>
          </div>

          <div className="col-span-3 truncate">
            <span className={`font-mono text-sm truncate block ${patternColors.text}`}>
              {exercise.movement_pattern?.name || '—'}
            </span>
          </div>

          <div className="col-span-2 truncate">
            {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
              <span className="text-neutral-400 font-mono text-sm">
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
              className="p-1.5 hover:bg-green-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-green-400" />
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
        <div className="px-4 pb-4 pl-14 border-t-2 border-green-500/30 bg-neutral-850">
          <div className="pt-4 space-y-4">
            {exercise.movement_pattern?.description && (
              <div>
                <div className={`${patternColors.text} font-mono text-xs uppercase tracking-wider mb-2 font-bold`}>
                  [ {exercise.movement_pattern.name} ]
                </div>
                <p className={`text-neutral-200 font-mono text-sm leading-relaxed pl-4 border-l-4 ${patternColors.border}`}>
                  {exercise.movement_pattern.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-green-400 font-mono text-xs uppercase tracking-wider mb-2 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    [ Primary Muscles ]
                  </div>
                  <div className="space-y-1.5 pl-4">
                    {exercise.primary_muscles.map((muscle) => {
                      const muscleColors = getBodyPartColors(muscle.body_part);
                      return (
                        <div key={muscle.id} className={`flex items-center justify-between bg-neutral-800 border-2 ${muscleColors.border} px-3 py-1.5`}>
                          <span className={`${muscleColors.text} font-mono text-sm font-semibold`}>{muscle.name}</span>
                          <span className={`${muscleColors.text} font-mono text-xs uppercase opacity-60`}>{muscle.body_part}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-neutral-300 font-mono text-xs uppercase tracking-wider mb-2 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    [ Secondary Muscles ]
                  </div>
                  <div className="space-y-1.5 pl-4">
                    {exercise.secondary_muscles.map((muscle) => {
                      const muscleColors = getBodyPartColors(muscle.body_part);
                      return (
                        <div key={muscle.id} className={`flex items-center justify-between bg-neutral-800 border-2 ${muscleColors.border} opacity-70 px-3 py-1.5`}>
                          <span className={`${muscleColors.text} font-mono text-sm`}>{muscle.name}</span>
                          <span className={`${muscleColors.text} font-mono text-xs uppercase opacity-60`}>{muscle.body_part}</span>
                        </div>
                      );
                    })}
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

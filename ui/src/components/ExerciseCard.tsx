import { Dumbbell, Target, Zap, Edit, Trash2 } from 'lucide-react';
import type { Exercise } from '../types/api';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
  onEdit?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export function ExerciseCard({ exercise, onClick, onEdit, onDelete }: ExerciseCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group relative"
    >
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 bg-white hover:bg-blue-50 rounded-lg shadow-sm border border-slate-200 transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4 text-blue-600" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-2 bg-white hover:bg-red-50 rounded-lg shadow-sm border border-slate-200 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        )}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-4 border-b border-slate-200">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-blue-600 rounded-lg shadow-sm flex-shrink-0">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">
              {exercise.name}
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-700 capitalize">
              {exercise.type}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {exercise.movement_pattern && (
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-0.5">
                Movement Pattern
              </p>
              <p className="text-sm font-semibold text-slate-900 truncate">
                {exercise.movement_pattern.name}
              </p>
            </div>
          </div>
        )}

        {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Primary Muscles
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {exercise.primary_muscles.slice(0, 3).map((muscle) => (
                <span
                  key={muscle.id}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {muscle.name}
                </span>
              ))}
              {exercise.primary_muscles.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                  +{exercise.primary_muscles.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 text-slate-400" />
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Secondary
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {exercise.secondary_muscles.slice(0, 2).map((muscle) => (
                <span
                  key={muscle.id}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200"
                >
                  {muscle.name}
                </span>
              ))}
              {exercise.secondary_muscles.length > 2 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                  +{exercise.secondary_muscles.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </div>
  );
}

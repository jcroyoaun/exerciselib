import { Dumbbell, Target, Activity, Edit, Trash2 } from 'lucide-react';
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
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex-1">
          {exercise.name}
        </h3>
        <div className="flex items-center gap-1 shrink-0 ml-3">
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
          <Dumbbell className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors ml-1" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Activity className="w-4 h-4 text-slate-500" />
          <span className="text-slate-600 font-medium capitalize">{exercise.type}</span>
        </div>

        {exercise.movement_pattern && (
          <div className="flex items-start gap-2 text-sm">
            <Target className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            <span className="text-slate-600">{exercise.movement_pattern.name}</span>
          </div>
        )}

        {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              Primary Muscles
            </div>
            <div className="flex flex-wrap gap-2">
              {exercise.primary_muscles.map((muscle) => (
                <span
                  key={muscle.id}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {muscle.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
          <div className="pt-2">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
              Secondary Muscles
            </div>
            <div className="flex flex-wrap gap-2">
              {exercise.secondary_muscles.map((muscle) => (
                <span
                  key={muscle.id}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200"
                >
                  {muscle.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

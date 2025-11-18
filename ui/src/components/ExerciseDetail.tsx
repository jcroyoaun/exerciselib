import { X, Dumbbell, Activity, Target, Zap, Edit, Trash2 } from 'lucide-react';
import type { Exercise } from '../types/api';

interface ExerciseDetailProps {
  exercise: Exercise;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ExerciseDetail({ exercise, onClose, onEdit, onDelete }: ExerciseDetailProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm flex-shrink-0">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white truncate">{exercise.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 ml-3"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Exercise Type
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-900 capitalize">{exercise.type}</p>
            </div>

            {exercise.movement_pattern && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Movement Pattern
                  </span>
                </div>
                <p className="text-lg font-semibold text-slate-900">
                  {exercise.movement_pattern.name}
                </p>
              </div>
            )}
          </div>

          {exercise.movement_pattern?.description && (
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">About this Movement</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                {exercise.movement_pattern.description}
              </p>
            </div>
          )}

          {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">Primary Muscles</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {exercise.primary_muscles.map((muscle) => (
                  <div
                    key={muscle.id}
                    className="bg-blue-50 rounded-lg p-4 border border-blue-200"
                  >
                    <p className="font-semibold text-blue-900">{muscle.name}</p>
                    <p className="text-xs text-blue-600 mt-1 capitalize">{muscle.body_part}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-slate-500" />
                <h3 className="text-lg font-semibold text-slate-900">Secondary Muscles</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {exercise.secondary_muscles.map((muscle) => (
                  <div
                    key={muscle.id}
                    className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                  >
                    <p className="font-semibold text-slate-900">{muscle.name}</p>
                    <p className="text-xs text-slate-600 mt-1 capitalize">{muscle.body_part}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {(onEdit || onDelete) && (
          <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex gap-3 flex-shrink-0">
            {onEdit && (
              <button
                onClick={onEdit}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Exercise
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

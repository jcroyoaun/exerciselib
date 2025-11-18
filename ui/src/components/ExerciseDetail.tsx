import { X, Dumbbell, Activity, Target, Zap } from 'lucide-react';
import type { Exercise } from '../types/api';

interface ExerciseDetailProps {
  exercise: Exercise;
  onClose: () => void;
}

export function ExerciseDetail({ exercise, onClose }: ExerciseDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Dumbbell className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{exercise.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
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
      </div>
    </div>
  );
}

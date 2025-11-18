import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Exercise, ExerciseType, Muscle, MovementPattern } from '../types/api';
import { getMuscles, getMovementPatterns } from '../lib/api';

interface ExerciseFormProps {
  exercise?: Exercise;
  onSave: (data: {
    name: string;
    type: ExerciseType;
    movement_pattern_id: number;
    primary_muscles: number[];
    secondary_muscles: number[];
  }) => Promise<void>;
  onCancel: () => void;
}

export function ExerciseForm({ exercise, onSave, onCancel }: ExerciseFormProps) {
  const [name, setName] = useState(exercise?.name || '');
  const [type, setType] = useState<ExerciseType>(exercise?.type || 'compound');
  const [movementPatternId, setMovementPatternId] = useState(exercise?.movement_pattern_id || 0);
  const [primaryMuscles, setPrimaryMuscles] = useState<number[]>(
    exercise?.primary_muscles?.map(m => m.id) || []
  );
  const [secondaryMuscles, setSecondaryMuscles] = useState<number[]>(
    exercise?.secondary_muscles?.map(m => m.id) || []
  );
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [patterns, setPatterns] = useState<MovementPattern[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [musclesData, patternsData] = await Promise.all([
          getMuscles({ page_size: 100 }),
          getMovementPatterns({ page_size: 100 })
        ]);
        setMuscles(musclesData.muscles);
        setPatterns(patternsData.movement_patterns);
      } catch (err) {
        setError('Failed to load form data');
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSave({
        name,
        type,
        movement_pattern_id: movementPatternId,
        primary_muscles: primaryMuscles,
        secondary_muscles: secondaryMuscles
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save exercise');
      setLoading(false);
    }
  };

  const toggleMuscle = (muscleId: number, isPrimary: boolean) => {
    if (isPrimary) {
      setPrimaryMuscles(prev =>
        prev.includes(muscleId) ? prev.filter(id => id !== muscleId) : [...prev, muscleId]
      );
      setSecondaryMuscles(prev => prev.filter(id => id !== muscleId));
    } else {
      setSecondaryMuscles(prev =>
        prev.includes(muscleId) ? prev.filter(id => id !== muscleId) : [...prev, muscleId]
      );
      setPrimaryMuscles(prev => prev.filter(id => id !== muscleId));
    }
  };

  const groupedMuscles = muscles.reduce((acc, muscle) => {
    if (!acc[muscle.body_part]) {
      acc[muscle.body_part] = [];
    }
    acc[muscle.body_part].push(muscle);
    return acc;
  }, {} as Record<string, Muscle[]>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {exercise ? 'Edit Exercise' : 'Create Exercise'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Exercise Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Bench Press"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Exercise Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="compound"
                  checked={type === 'compound'}
                  onChange={(e) => setType(e.target.value as ExerciseType)}
                  className="mr-2"
                />
                <span>Compound</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="isolation"
                  checked={type === 'isolation'}
                  onChange={(e) => setType(e.target.value as ExerciseType)}
                  className="mr-2"
                />
                <span>Isolation</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Movement Pattern
            </label>
            <select
              value={movementPatternId}
              onChange={(e) => setMovementPatternId(Number(e.target.value))}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Select a movement pattern</option>
              {patterns.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Target Muscles
            </label>
            <div className="space-y-4">
              {Object.entries(groupedMuscles).map(([bodyPart, musclesList]) => (
                <div key={bodyPart} className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-3 capitalize">
                    {bodyPart}
                  </h4>
                  <div className="space-y-2">
                    {musclesList.map((muscle) => (
                      <div key={muscle.id} className="flex items-center gap-3">
                        <span className="flex-1 text-sm text-slate-700">{muscle.name}</span>
                        <label className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={primaryMuscles.includes(muscle.id)}
                            onChange={() => toggleMuscle(muscle.id, true)}
                            className="mr-1.5"
                          />
                          Primary
                        </label>
                        <label className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={secondaryMuscles.includes(muscle.id)}
                            onChange={() => toggleMuscle(muscle.id, false)}
                            className="mr-1.5"
                          />
                          Secondary
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Saving...' : exercise ? 'Update Exercise' : 'Create Exercise'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

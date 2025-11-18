import { useState } from 'react';
import { X } from 'lucide-react';
import type { Muscle, DbBodyPart } from '../types/api';

interface MuscleFormProps {
  muscle?: Muscle;
  onSave: (data: { name: string; body_part: DbBodyPart }) => Promise<void>;
  onCancel: () => void;
}

const BODY_PARTS: DbBodyPart[] = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms',
  'quadriceps', 'hamstrings', 'glutes', 'calves', 'core', 'traps'
];

export function MuscleForm({ muscle, onSave, onCancel }: MuscleFormProps) {
  const [name, setName] = useState(muscle?.name || '');
  const [bodyPart, setBodyPart] = useState<DbBodyPart>(muscle?.body_part || 'chest');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSave({ name, body_part: bodyPart });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save muscle');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {muscle ? 'Edit Muscle' : 'Create Muscle'}
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
              Muscle Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Pectoralis Major"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Body Part
            </label>
            <select
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value as DbBodyPart)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {BODY_PARTS.map((part) => (
                <option key={part} value={part}>
                  {part.charAt(0).toUpperCase() + part.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Saving...' : muscle ? 'Update Muscle' : 'Create Muscle'}
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

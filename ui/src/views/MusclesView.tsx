import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { FilterButton } from '../components/FilterButton';
import { MuscleCard } from '../components/MuscleCard';
import { MuscleForm } from '../components/MuscleForm';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { getMuscles, createMuscle, updateMuscle, deleteMuscle } from '../lib/api';
import type { Muscle, BodyPart } from '../types/api';

export function MusclesView() {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bodyPartFilter, setBodyPartFilter] = useState<BodyPart | ''>('');
  const [page, setPage] = useState(1);
  const [editingMuscle, setEditingMuscle] = useState<Muscle | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingMuscle, setDeletingMuscle] = useState<Muscle | null>(null);

  const loadMuscles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMuscles({
        body_part: bodyPartFilter || undefined,
        page,
        page_size: 20
      });
      setMuscles(data.muscles);
      setMetadata(data.metadata);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load muscles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMuscles();
  }, [page, bodyPartFilter]);

  const toggleBodyPartFilter = (bodyPart: BodyPart) => {
    setBodyPartFilter(bodyPartFilter === bodyPart ? '' : bodyPart);
    setPage(1);
  };

  const handleCreate = async (data: any) => {
    await createMuscle(data);
    setIsCreating(false);
    loadMuscles();
  };

  const handleUpdate = async (data: any) => {
    if (editingMuscle) {
      await updateMuscle(editingMuscle.id, data);
      setEditingMuscle(null);
      loadMuscles();
    }
  };

  const handleDelete = async () => {
    if (deletingMuscle) {
      await deleteMuscle(deletingMuscle.id);
      setDeletingMuscle(null);
      loadMuscles();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-mono font-bold text-cyan-400">[ MANAGE MUSCLES ]</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-cyan-400 text-neutral-950 px-4 py-2 border-2 border-cyan-500 font-mono font-bold hover:bg-cyan-500 transition-colors uppercase text-sm"
        >
          <Plus className="w-4 h-4" />
          Create
        </button>
      </div>

      <div>
        <h3 className="text-xs font-mono font-semibold text-cyan-400 mb-3 uppercase tracking-wider">&gt; Filter by Body Part</h3>
        <div className="flex flex-wrap gap-2">
          {(['chest', 'back', 'shoulders', 'arms', 'legs', 'core'] as BodyPart[]).map((part) => (
            <button
              key={part}
              onClick={() => toggleBodyPartFilter(part)}
              className={`px-3 py-1.5 border-2 font-mono text-sm uppercase transition-colors ${
                bodyPartFilter === part
                  ? 'bg-cyan-400 text-neutral-950 border-cyan-500'
                  : 'bg-neutral-800 text-cyan-400 border-cyan-400 hover:bg-neutral-700'
              }`}
            >
              {part}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : muscles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-400 font-mono">// No muscles found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {muscles.map((muscle) => (
              <MuscleCard
                key={muscle.id}
                muscle={muscle}
                onEdit={() => setEditingMuscle(muscle)}
                onDelete={() => setDeletingMuscle(muscle)}
              />
            ))}
          </div>

          {metadata && <Pagination metadata={metadata} onPageChange={setPage} />}
        </>
      )}

      {isCreating && (
        <MuscleForm
          onSave={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingMuscle && (
        <MuscleForm
          muscle={editingMuscle}
          onSave={handleUpdate}
          onCancel={() => setEditingMuscle(null)}
        />
      )}

      {deletingMuscle && (
        <ConfirmDialog
          title="Delete Muscle"
          message={`Are you sure you want to delete "${deletingMuscle.name}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingMuscle(null)}
        />
      )}
    </div>
  );
}

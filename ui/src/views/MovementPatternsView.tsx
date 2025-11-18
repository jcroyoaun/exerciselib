import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { MovementPatternCard } from '../components/MovementPatternCard';
import { MovementPatternForm } from '../components/MovementPatternForm';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { getMovementPatterns, createMovementPattern, updateMovementPattern, deleteMovementPattern } from '../lib/api';
import type { MovementPattern } from '../types/api';

export function MovementPatternsView() {
  const [patterns, setPatterns] = useState<MovementPattern[]>([]);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [editingPattern, setEditingPattern] = useState<MovementPattern | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingPattern, setDeletingPattern] = useState<MovementPattern | null>(null);

  const loadPatterns = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovementPatterns({
        name: searchTerm,
        page,
        page_size: 12
      });
      setPatterns(data.movement_patterns);
      setMetadata(data.metadata);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movement patterns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatterns();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    loadPatterns();
  };

  const handleCreate = async (data: any) => {
    await createMovementPattern(data);
    setIsCreating(false);
    loadPatterns();
  };

  const handleUpdate = async (data: any) => {
    if (editingPattern) {
      await updateMovementPattern(editingPattern.id, data);
      setEditingPattern(null);
      loadPatterns();
    }
  };

  const handleDelete = async () => {
    if (deletingPattern) {
      await deleteMovementPattern(deletingPattern.id);
      setDeletingPattern(null);
      loadPatterns();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-mono font-bold text-cyan-400">[ MANAGE MOVEMENT PATTERNS ]</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-cyan-400 text-neutral-950 px-4 py-2 border-2 border-cyan-500 font-mono font-bold hover:bg-cyan-500 transition-colors uppercase text-sm"
        >
          <Plus className="w-4 h-4" />
          Create
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="search patterns..."
          className="w-full px-4 py-2.5 bg-neutral-700 border-2 border-cyan-400 text-white placeholder-white/30 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-cyan-400 text-neutral-950 font-mono text-xs font-bold hover:bg-cyan-500"
        >
          GO
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : patterns.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-400 font-mono">// No movement patterns found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patterns.map((pattern) => (
              <MovementPatternCard
                key={pattern.id}
                pattern={pattern}
                onEdit={() => setEditingPattern(pattern)}
                onDelete={() => setDeletingPattern(pattern)}
              />
            ))}
          </div>

          {metadata && <Pagination metadata={metadata} onPageChange={setPage} />}
        </>
      )}

      {isCreating && (
        <MovementPatternForm
          onSave={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingPattern && (
        <MovementPatternForm
          pattern={editingPattern}
          onSave={handleUpdate}
          onCancel={() => setEditingPattern(null)}
        />
      )}

      {deletingPattern && (
        <ConfirmDialog
          title="Delete Movement Pattern"
          message={`Are you sure you want to delete "${deletingPattern.name}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingPattern(null)}
        />
      )}
    </div>
  );
}

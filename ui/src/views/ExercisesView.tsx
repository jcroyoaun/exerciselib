import { useState, useEffect } from 'react';
import { Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { ExerciseListItem } from '../components/ExerciseListItem';
import { ExerciseForm } from '../components/ExerciseForm';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { getExercises, getMuscles, getMovementPatterns, createExercise, updateExercise, deleteExercise } from '../lib/api';
import type { Exercise, ExerciseType, Muscle, MovementPattern } from '../types/api';

export function ExercisesView() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [movementPatterns, setMovementPatterns] = useState<MovementPattern[]>([]);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<ExerciseType[]>([]);
  const [muscleFilters, setMuscleFilters] = useState<number[]>([]);
  const [patternFilters, setPatternFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [page, setPage] = useState(1);

  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingExercise, setDeletingExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    loadMusclesAndPatterns();
  }, []);

  useEffect(() => {
    loadExercises();
  }, [page, typeFilter, muscleFilters, patternFilters]);

  const loadMusclesAndPatterns = async () => {
    try {
      const [musclesData, patternsData] = await Promise.all([
        getMuscles({ page_size: 100 }),
        getMovementPatterns({ page_size: 100 })
      ]);
      setMuscles(musclesData.muscles);
      setMovementPatterns(patternsData.movement_patterns);
    } catch (err) {
      console.error('Failed to load filters:', err);
    }
  };

  const loadExercises = async () => {
    setLoading(true);
    setError(null);
    try {
      let allExercises: Exercise[] = [];

      if (muscleFilters.length > 0) {
        const exerciseSets = await Promise.all(
          muscleFilters.map(muscleId =>
            getExercises({
              name: searchTerm || undefined,
              type: typeFilter.length === 1 ? typeFilter[0] : undefined,
              muscle_id: muscleId,
              page: 1,
              page_size: 100
            })
          )
        );

        const seenIds = new Set<number>();
        exerciseSets.forEach(({ exercises: exs }) => {
          exs.forEach(ex => {
            if (!seenIds.has(ex.id)) {
              seenIds.add(ex.id);
              allExercises.push(ex);
            }
          });
        });

        if (patternFilters.length > 0) {
          allExercises = allExercises.filter(ex =>
            ex.movement_pattern && patternFilters.includes(ex.movement_pattern.name)
          );
        }

        const pageSize = 50;
        const startIdx = (page - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        const paginatedExercises = allExercises.slice(startIdx, endIdx);

        setExercises(paginatedExercises);
        setMetadata({
          current_page: page,
          page_size: pageSize,
          first_page: 1,
          last_page: Math.ceil(allExercises.length / pageSize),
          total_records: allExercises.length
        });
      } else {
        const data = await getExercises({
          name: searchTerm || undefined,
          type: typeFilter.length === 1 ? typeFilter[0] : undefined,
          movement_pattern: patternFilters.length === 1 ? patternFilters[0] : undefined,
          page,
          page_size: 50
        });

        setExercises(data.exercises);
        setMetadata(data.metadata);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load exercises');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadExercises();
  };

  const toggleType = (type: ExerciseType) => {
    setTypeFilter(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setPage(1);
  };

  const toggleMuscle = (muscleId: number) => {
    setMuscleFilters(prev =>
      prev.includes(muscleId) ? prev.filter(id => id !== muscleId) : [...prev, muscleId]
    );
    setPage(1);
  };

  const togglePattern = (patternName: string) => {
    setPatternFilters(prev =>
      prev.includes(patternName) ? prev.filter(n => n !== patternName) : [...prev, patternName]
    );
    setPage(1);
  };

  const clearFilters = () => {
    setTypeFilter([]);
    setMuscleFilters([]);
    setPatternFilters([]);
    setSearchTerm('');
    setPage(1);
  };

  const hasActiveFilters = typeFilter.length > 0 || muscleFilters.length > 0 || patternFilters.length > 0 || searchTerm;

  const handleCreate = async (data: any) => {
    await createExercise(data);
    setIsCreating(false);
    loadExercises();
  };

  const handleUpdate = async (data: any) => {
    if (editingExercise) {
      await updateExercise(editingExercise.id, data);
      setEditingExercise(null);
      loadExercises();
    }
  };

  const handleDelete = async () => {
    if (deletingExercise) {
      await deleteExercise(deletingExercise.id);
      setDeletingExercise(null);
      loadExercises();
    }
  };

  return (
    <div className="h-full flex">
      {showFilters && (
        <aside className="w-80 bg-neutral-900 border-r-4 border-yellow-400 overflow-y-auto flex-shrink-0">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-yellow-400 pb-3">
              <h3 className="text-lg font-mono font-bold text-yellow-400">[ FILTERS ]</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-yellow-400 hover:text-yellow-300 font-mono bg-neutral-800 px-2 py-1 border-2 border-yellow-400"
                >
                  CLEAR
                </button>
              )}
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-yellow-400 mb-3 block uppercase tracking-wider">
                &gt; Exercise Type
              </label>
              <div className="space-y-2">
                {(['compound', 'isolation'] as ExerciseType[]).map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={typeFilter.includes(type)}
                      onChange={() => toggleType(type)}
                      className="w-4 h-4 rounded-none border-2 border-yellow-400 bg-neutral-950 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-sm font-mono text-neutral-300 group-hover:text-yellow-400 capitalize">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-yellow-400 mb-3 block uppercase tracking-wider">
                &gt; Muscle Groups
              </label>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {muscles.map(muscle => (
                  <label key={muscle.id} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={muscleFilters.includes(muscle.id)}
                      onChange={() => toggleMuscle(muscle.id)}
                      className="w-4 h-4 rounded-none border-2 border-yellow-400 bg-neutral-950 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-sm font-mono text-neutral-300 group-hover:text-yellow-400">
                      {muscle.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-yellow-400 mb-3 block uppercase tracking-wider">
                &gt; Movement Patterns
              </label>
              <div className="space-y-2">
                {movementPatterns.map(pattern => (
                  <label key={pattern.id} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={patternFilters.includes(pattern.name)}
                      onChange={() => togglePattern(pattern.name)}
                      className="w-4 h-4 rounded-none border-2 border-yellow-400 bg-neutral-950 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-sm font-mono text-neutral-300 group-hover:text-yellow-400">
                      {pattern.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col overflow-hidden bg-neutral-950">
        <div className="bg-neutral-900 border-b-4 border-yellow-400 px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-neutral-800 border-2 border-yellow-400 hover:bg-neutral-700 transition-colors"
              title={showFilters ? 'Hide filters' : 'Show filters'}
            >
              <SlidersHorizontal className="w-5 h-5 text-yellow-400" />
            </button>

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/50" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="search exercises..."
                className="w-full pl-10 pr-10 py-2.5 bg-neutral-800 border-2 border-yellow-400 text-yellow-400 placeholder-neutral-500/40 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    handleSearch();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-700"
                >
                  <X className="w-4 h-4 text-yellow-400" />
                </button>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="px-4 py-2.5 bg-yellow-400 text-neutral-950 border-4 border-yellow-500 font-mono font-bold hover:bg-yellow-500 transition-colors text-sm uppercase tracking-wider"
            >
              SEARCH
            </button>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs font-mono text-yellow-400/60 uppercase">active:</span>
              {typeFilter.map(type => (
                <span key={type} className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-800 border-2 border-yellow-400 text-yellow-400 text-xs font-mono">
                  {type}
                  <button onClick={() => toggleType(type)} className="hover:bg-neutral-700 ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {muscleFilters.map(id => {
                const muscle = muscles.find(m => m.id === id);
                return muscle ? (
                  <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-800 border-2 border-green-600 text-green-400 text-xs font-mono">
                    {muscle.name}
                    <button onClick={() => toggleMuscle(id)} className="hover:bg-neutral-700 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ) : null;
              })}
              {patternFilters.map(name => (
                <span key={name} className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-800 border-2 border-amber-700 text-neutral-300 text-xs font-mono">
                  {name}
                  <button onClick={() => togglePattern(name)} className="hover:bg-neutral-700 ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-neutral-950">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : exercises.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 bg-neutral-800 border-4 border-yellow-400 mb-4">
                <Search className="w-8 h-8 text-yellow-400/50" />
              </div>
              <h3 className="text-lg font-mono font-bold text-yellow-400 mb-2">// NO RESULTS FOUND</h3>
              <p className="text-neutral-400 font-mono text-sm max-w-md">
                {hasActiveFilters
                  ? '&gt; Try adjusting your filters or search criteria.'
                  : '&gt; Get started by creating your first exercise.'}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2 mb-6">
                <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-neutral-800 border-b-2 border-yellow-400">
                  <div className="col-span-4 text-yellow-400 font-mono text-xs uppercase tracking-wider font-bold">Exercise</div>
                  <div className="col-span-2 text-yellow-400 font-mono text-xs uppercase tracking-wider font-bold">Type</div>
                  <div className="col-span-3 text-yellow-400 font-mono text-xs uppercase tracking-wider font-bold">Pattern</div>
                  <div className="col-span-2 text-yellow-400 font-mono text-xs uppercase tracking-wider font-bold">Muscles</div>
                  <div className="col-span-1 text-yellow-400 font-mono text-xs uppercase tracking-wider text-right font-bold">Actions</div>
                </div>
                {exercises.map(exercise => (
                  <ExerciseListItem
                    key={exercise.id}
                    exercise={exercise}
                    onEdit={() => setEditingExercise(exercise)}
                    onDelete={() => setDeletingExercise(exercise)}
                  />
                ))}
              </div>

              {metadata && metadata.last_page > 1 && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-neutral-800 border-2 border-yellow-400 text-yellow-400 font-mono text-sm hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    &lt; PREV
                  </button>
                  <span className="text-yellow-400 font-mono text-sm">
                    [{metadata.current_page}/{metadata.last_page}]
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(metadata.last_page, p + 1))}
                    disabled={page === metadata.last_page}
                    className="px-4 py-2 bg-neutral-800 border-2 border-yellow-400 text-yellow-400 font-mono text-sm hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    NEXT &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsCreating(true)}
        className="fixed bottom-8 right-8 p-4 bg-yellow-400 text-neutral-950 rounded-none shadow-lg hover:bg-yellow-500 transition-all hover:scale-110 border-4 border-yellow-500"
        title="Create Exercise"
      >
        <Plus className="w-6 h-6 font-bold" />
      </button>

      {isCreating && (
        <ExerciseForm onSave={handleCreate} onCancel={() => setIsCreating(false)} />
      )}

      {editingExercise && (
        <ExerciseForm
          exercise={editingExercise}
          onSave={handleUpdate}
          onCancel={() => setEditingExercise(null)}
        />
      )}

      {deletingExercise && (
        <ConfirmDialog
          title="Delete Exercise"
          message={`Are you sure you want to delete "${deletingExercise.name}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingExercise(null)}
        />
      )}
    </div>
  );
}

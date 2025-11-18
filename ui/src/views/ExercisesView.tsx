import { useState, useEffect } from 'react';
import { Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { ExerciseCard } from '../components/ExerciseCard';
import { ExerciseDetail } from '../components/ExerciseDetail';
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

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
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

        const pageSize = 12;
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
          page_size: 12
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
      setSelectedExercise(null);
      loadExercises();
    }
  };

  const handleDelete = async () => {
    if (deletingExercise) {
      await deleteExercise(deletingExercise.id);
      setDeletingExercise(null);
      setSelectedExercise(null);
      loadExercises();
    }
  };

  return (
    <div className="h-full flex">
      {showFilters && (
        <aside className="w-80 bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-3 block">Exercise Type</label>
              <div className="space-y-2">
                {(['compound', 'isolation'] as ExerciseType[]).map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={typeFilter.includes(type)}
                      onChange={() => toggleType(type)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900 capitalize">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-3 block">
                Muscle Groups
              </label>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {muscles.map(muscle => (
                  <label key={muscle.id} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={muscleFilters.includes(muscle.id)}
                      onChange={() => toggleMuscle(muscle.id)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      {muscle.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-3 block">
                Movement Patterns
              </label>
              <div className="space-y-2">
                {movementPatterns.map(pattern => (
                  <label key={pattern.id} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={patternFilters.includes(pattern.name)}
                      onChange={() => togglePattern(pattern.name)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      {pattern.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title={showFilters ? 'Hide filters' : 'Show filters'}
            >
              <SlidersHorizontal className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search exercises..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    handleSearch();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Search
            </button>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs font-medium text-slate-500">Active filters:</span>
              {typeFilter.map(type => (
                <span key={type} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                  {type}
                  <button onClick={() => toggleType(type)} className="hover:bg-blue-200 rounded">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {muscleFilters.map(id => {
                const muscle = muscles.find(m => m.id === id);
                return muscle ? (
                  <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">
                    {muscle.name}
                    <button onClick={() => toggleMuscle(id)} className="hover:bg-emerald-200 rounded">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ) : null;
              })}
              {patternFilters.map(name => (
                <span key={name} className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-medium">
                  {name}
                  <button onClick={() => togglePattern(name)} className="hover:bg-amber-200 rounded">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : exercises.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 bg-slate-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">No exercises found</h3>
              <p className="text-slate-600 text-sm max-w-md">
                {hasActiveFilters
                  ? 'Try adjusting your filters or search criteria.'
                  : 'Get started by creating your first exercise.'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mb-6">
                {exercises.map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onClick={() => setSelectedExercise(exercise)}
                    onEdit={e => {
                      e.stopPropagation();
                      setEditingExercise(exercise);
                    }}
                    onDelete={e => {
                      e.stopPropagation();
                      setDeletingExercise(exercise);
                    }}
                  />
                ))}
              </div>

              {metadata && metadata.last_page > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-slate-600">
                    Page {metadata.current_page} of {metadata.last_page}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(metadata.last_page, p + 1))}
                    disabled={page === metadata.last_page}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsCreating(true)}
        className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
        title="Create Exercise"
      >
        <Plus className="w-6 h-6" />
      </button>

      {selectedExercise && (
        <ExerciseDetail
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onEdit={() => {
            setEditingExercise(selectedExercise);
            setSelectedExercise(null);
          }}
          onDelete={() => {
            setDeletingExercise(selectedExercise);
            setSelectedExercise(null);
          }}
        />
      )}

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

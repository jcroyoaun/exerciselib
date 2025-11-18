import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterButton } from '../components/FilterButton';
import { ExerciseCard } from '../components/ExerciseCard';
import { ExerciseDetail } from '../components/ExerciseDetail';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { getExercises } from '../lib/api';
import type { Exercise, ExerciseType, BodyPart } from '../types/api';

export function ExercisesView() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<ExerciseType | ''>('');
  const [bodyPartFilter, setBodyPartFilter] = useState<BodyPart | ''>('');
  const [page, setPage] = useState(1);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const loadExercises = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getExercises({
        name: searchTerm,
        type: typeFilter || undefined,
        body_part: bodyPartFilter || undefined,
        page,
        page_size: 12
      });
      setExercises(data.exercises);
      setMetadata(data.metadata);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load exercises');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExercises();
  }, [page, typeFilter, bodyPartFilter]);

  const handleSearch = () => {
    setPage(1);
    loadExercises();
  };

  const toggleTypeFilter = (type: ExerciseType) => {
    setTypeFilter(typeFilter === type ? '' : type);
    setPage(1);
  };

  const toggleBodyPartFilter = (bodyPart: BodyPart) => {
    setBodyPartFilter(bodyPartFilter === bodyPart ? '' : bodyPart);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          placeholder="Search exercises..."
        />

        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Exercise Type</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="Compound"
                active={typeFilter === 'compound'}
                onClick={() => toggleTypeFilter('compound')}
              />
              <FilterButton
                label="Isolation"
                active={typeFilter === 'isolation'}
                onClick={() => toggleTypeFilter('isolation')}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Body Part</h3>
            <div className="flex flex-wrap gap-2">
              {(['chest', 'back', 'shoulders', 'arms', 'legs', 'core'] as BodyPart[]).map((part) => (
                <FilterButton
                  key={part}
                  label={part.charAt(0).toUpperCase() + part.slice(1)}
                  active={bodyPartFilter === part}
                  onClick={() => toggleBodyPartFilter(part)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : exercises.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No exercises found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onClick={() => setSelectedExercise(exercise)}
              />
            ))}
          </div>

          {metadata && <Pagination metadata={metadata} onPageChange={setPage} />}
        </>
      )}

      {selectedExercise && (
        <ExerciseDetail
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}

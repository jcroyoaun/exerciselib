import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterButton } from '../components/FilterButton';
import { MuscleCard } from '../components/MuscleCard';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { getMuscles } from '../lib/api';
import type { Muscle, BodyPart } from '../types/api';

export function MusclesView() {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bodyPartFilter, setBodyPartFilter] = useState<BodyPart | ''>('');
  const [page, setPage] = useState(1);

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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Filter by Body Part</h3>
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

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : muscles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No muscles found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {muscles.map((muscle) => (
              <MuscleCard key={muscle.id} muscle={muscle} />
            ))}
          </div>

          {metadata && <Pagination metadata={metadata} onPageChange={setPage} />}
        </>
      )}
    </div>
  );
}

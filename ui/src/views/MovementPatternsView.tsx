import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { MovementPatternCard } from '../components/MovementPatternCard';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { getMovementPatterns } from '../lib/api';
import type { MovementPattern } from '../types/api';

export function MovementPatternsView() {
  const [patterns, setPatterns] = useState<MovementPattern[]>([]);
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

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

  return (
    <div className="space-y-6">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
        placeholder="Search movement patterns..."
      />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : patterns.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No movement patterns found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patterns.map((pattern) => (
              <MovementPatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>

          {metadata && <Pagination metadata={metadata} onPageChange={setPage} />}
        </>
      )}
    </div>
  );
}

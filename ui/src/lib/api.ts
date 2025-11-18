import type {
  ExercisesResponse,
  MusclesResponse,
  MovementPatternsResponse,
  Exercise,
  Muscle,
  MovementPattern,
  ExerciseType,
  BodyPart,
  DbBodyPart,
  BODY_PART_MAPPING
} from '../types/api';
import { BODY_PART_MAPPING as bodyPartMapping } from '../types/api';

const API_BASE = '/v1';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || error.message || response.statusText);
  }
  return response.json();
}

export async function getExercises(params: {
  name?: string;
  type?: ExerciseType;
  movement_pattern?: string;
  body_part?: BodyPart;
  muscle_id?: number;
  page?: number;
  page_size?: number;
} = {}): Promise<ExercisesResponse> {
  // If body_part is provided, we need to fetch exercises for ALL sub-categories
  if (params.body_part) {
    const dbBodyParts = bodyPartMapping[params.body_part];
    
    // Fetch exercises for all related body parts and combine results
    const allExercises: Exercise[] = [];
    const seenIds = new Set<number>();
    
    for (const dbBodyPart of dbBodyParts) {
      const searchParams = new URLSearchParams();
      if (params.name) searchParams.set('name', params.name);
      if (params.type) searchParams.set('type', params.type);
      if (params.movement_pattern) searchParams.set('movement_pattern', params.movement_pattern);
      searchParams.set('body_part', dbBodyPart);
      searchParams.set('page', '1');
      searchParams.set('page_size', '100'); // Get all for this category
      
      const query = searchParams.toString();
      const result = await fetchAPI<ExercisesResponse>(`/exercises${query ? `?${query}` : ''}`);
      
      // Deduplicate exercises (an exercise might target multiple muscle groups)
      for (const exercise of result.exercises) {
        if (!seenIds.has(exercise.id)) {
          seenIds.add(exercise.id);
          allExercises.push(exercise);
        }
      }
    }
    
    // Sort and paginate client-side
    const page = params.page || 1;
    const pageSize = params.page_size || 12;
    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const paginatedExercises = allExercises.slice(startIdx, endIdx);
    
    return {
      exercises: paginatedExercises,
      metadata: {
        current_page: page,
        page_size: pageSize,
        first_page: 1,
        last_page: Math.ceil(allExercises.length / pageSize),
        total_records: allExercises.length
      }
    };
  }
  
  // No body_part filter or other filters
  const searchParams = new URLSearchParams();
  if (params.name) searchParams.set('name', params.name);
  if (params.type) searchParams.set('type', params.type);
  if (params.movement_pattern) searchParams.set('movement_pattern', params.movement_pattern);
  if (params.muscle_id) searchParams.set('muscle_id', params.muscle_id.toString());
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.page_size) searchParams.set('page_size', params.page_size.toString());

  const query = searchParams.toString();
  return fetchAPI<ExercisesResponse>(`/exercises${query ? `?${query}` : ''}`);
}

export async function getExercise(id: number): Promise<{ exercise: Exercise }> {
  return fetchAPI<{ exercise: Exercise }>(`/exercises/${id}`);
}

export async function getMuscles(params: {
  body_part?: BodyPart;
  page?: number;
  page_size?: number;
} = {}): Promise<MusclesResponse> {
  // If body_part is provided, we need to fetch for ALL sub-categories
  if (params.body_part) {
    const dbBodyParts = bodyPartMapping[params.body_part];
    
    // Fetch muscles for all related body parts and combine results
    const allMuscles: Muscle[] = [];
    
    for (const dbBodyPart of dbBodyParts) {
      const searchParams = new URLSearchParams();
      searchParams.set('body_part', dbBodyPart);
      searchParams.set('page', '1');
      searchParams.set('page_size', '100'); // Get all for this category
      
      const query = searchParams.toString();
      const result = await fetchAPI<MusclesResponse>(`/muscles${query ? `?${query}` : ''}`);
      allMuscles.push(...result.muscles);
    }
    
    // Sort and paginate client-side
    const page = params.page || 1;
    const pageSize = params.page_size || 20;
    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const paginatedMuscles = allMuscles.slice(startIdx, endIdx);
    
    return {
      muscles: paginatedMuscles,
      metadata: {
        current_page: page,
        page_size: pageSize,
        first_page: 1,
        last_page: Math.ceil(allMuscles.length / pageSize),
        total_records: allMuscles.length
      }
    };
  }
  
  // No filter - fetch all
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.page_size) searchParams.set('page_size', params.page_size.toString());

  const query = searchParams.toString();
  return fetchAPI<MusclesResponse>(`/muscles${query ? `?${query}` : ''}`);
}

export async function getMuscle(id: number): Promise<{ muscle: Muscle }> {
  return fetchAPI<{ muscle: Muscle }>(`/muscles/${id}`);
}

export async function getMovementPatterns(params: {
  name?: string;
  page?: number;
  page_size?: number;
} = {}): Promise<MovementPatternsResponse> {
  const searchParams = new URLSearchParams();

  if (params.name) searchParams.set('name', params.name);
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.page_size) searchParams.set('page_size', params.page_size.toString());

  const query = searchParams.toString();
  return fetchAPI<MovementPatternsResponse>(`/movement-patterns${query ? `?${query}` : ''}`);
}

export async function getMovementPattern(id: number): Promise<{ movement_pattern: MovementPattern }> {
  return fetchAPI<{ movement_pattern: MovementPattern }>(`/movement-patterns/${id}`);
}

export async function createExercise(exercise: {
  name: string;
  type: ExerciseType;
  movement_pattern_id: number;
  primary_muscles: number[];
  secondary_muscles: number[];
}): Promise<{ exercise: Exercise }> {
  return fetchAPI<{ exercise: Exercise }>('/exercises', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exercise)
  });
}

export async function updateExercise(id: number, exercise: {
  name?: string;
  type?: ExerciseType;
  movement_pattern_id?: number;
  primary_muscles?: number[];
  secondary_muscles?: number[];
}): Promise<{ exercise: Exercise }> {
  return fetchAPI<{ exercise: Exercise }>(`/exercises/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exercise)
  });
}

export async function deleteExercise(id: number): Promise<{ message: string }> {
  return fetchAPI<{ message: string }>(`/exercises/${id}`, {
    method: 'DELETE'
  });
}

export async function createMuscle(muscle: {
  name: string;
  body_part: DbBodyPart;
}): Promise<{ muscle: Muscle }> {
  return fetchAPI<{ muscle: Muscle }>('/muscles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(muscle)
  });
}

export async function updateMuscle(id: number, muscle: {
  name?: string;
  body_part?: DbBodyPart;
}): Promise<{ muscle: Muscle }> {
  return fetchAPI<{ muscle: Muscle }>(`/muscles/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(muscle)
  });
}

export async function deleteMuscle(id: number): Promise<{ message: string }> {
  return fetchAPI<{ message: string }>(`/muscles/${id}`, {
    method: 'DELETE'
  });
}

export async function createMovementPattern(pattern: {
  name: string;
  description: string;
}): Promise<{ movement_pattern: MovementPattern }> {
  return fetchAPI<{ movement_pattern: MovementPattern }>('/movement-patterns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pattern)
  });
}

export async function updateMovementPattern(id: number, pattern: {
  name?: string;
  description?: string;
}): Promise<{ movement_pattern: MovementPattern }> {
  return fetchAPI<{ movement_pattern: MovementPattern }>(`/movement-patterns/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pattern)
  });
}

export async function deleteMovementPattern(id: number): Promise<{ message: string }> {
  return fetchAPI<{ message: string }>(`/movement-patterns/${id}`, {
    method: 'DELETE'
  });
}

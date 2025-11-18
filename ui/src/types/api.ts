export type ExerciseType = 'compound' | 'isolation';

// Database body part enum (specific muscle groups)
export type DbBodyPart = 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps' | 'forearms' | 'quadriceps' | 'hamstrings' | 'glutes' | 'calves' | 'core' | 'traps';

// User-facing body part categories (top-level groups)
export type BodyPart = 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core';

// Mapping from top-level categories to database values
export const BODY_PART_MAPPING: Record<BodyPart, DbBodyPart[]> = {
  chest: ['chest'],
  back: ['back', 'traps'],
  shoulders: ['shoulders'],
  arms: ['biceps', 'triceps', 'forearms'],
  legs: ['quadriceps', 'hamstrings', 'glutes', 'calves'],
  core: ['core']
};

export interface Muscle {
  id: number;
  name: string;
  body_part: DbBodyPart;
}

export interface MovementPattern {
  id: number;
  name: string;
  description: string;
}

export interface Exercise {
  id: number;
  name: string;
  type: ExerciseType;
  movement_pattern_id: number;
  movement_pattern?: MovementPattern;
  primary_muscles?: Muscle[];
  secondary_muscles?: Muscle[];
  version: number;
}

export interface Metadata {
  current_page: number;
  page_size: number;
  first_page: number;
  last_page: number;
  total_records: number;
}

export interface ExercisesResponse {
  exercises: Exercise[];
  metadata: Metadata;
}

export interface MusclesResponse {
  muscles: Muscle[];
  metadata: Metadata;
}

export interface MovementPatternsResponse {
  movement_patterns: MovementPattern[];
  metadata: Metadata;
}

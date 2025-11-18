export const exerciseTypeColors = {
  compound: {
    border: 'border-orange-500',
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  isolation: {
    border: 'border-purple-500',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
};

export const movementPatternColors: Record<string, { border: string; text: string; bg: string }> = {
  'Squat': { border: 'border-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10' },
  'Hip Hinge': { border: 'border-rose-500', text: 'text-rose-400', bg: 'bg-rose-500/10' },
  'Lunge': { border: 'border-fuchsia-500', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' },
  'Push': { border: 'border-red-500', text: 'text-red-400', bg: 'bg-red-500/10' },
  'Pull': { border: 'border-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  'Carry': { border: 'border-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10' },
  'default': { border: 'border-neutral-500', text: 'text-neutral-400', bg: 'bg-neutral-500/10' },
};

export const bodyPartColors: Record<string, { border: string; text: string; bg: string }> = {
  chest: { border: 'border-red-500', text: 'text-red-400', bg: 'bg-red-500/10' },
  back: { border: 'border-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  traps: { border: 'border-lime-500', text: 'text-lime-400', bg: 'bg-lime-500/10' },
  shoulders: { border: 'border-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10' },
  biceps: { border: 'border-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10' },
  triceps: { border: 'border-indigo-500', text: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  forearms: { border: 'border-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  quadriceps: { border: 'border-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10' },
  hamstrings: { border: 'border-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/10' },
  glutes: { border: 'border-fuchsia-500', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' },
  calves: { border: 'border-pink-500', text: 'text-pink-400', bg: 'bg-pink-500/10' },
  core: { border: 'border-teal-500', text: 'text-teal-400', bg: 'bg-teal-500/10' },
  arms: { border: 'border-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10' },
  legs: { border: 'border-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/10' },
};

export function getMovementPatternColors(patternName: string | undefined) {
  if (!patternName) return movementPatternColors.default;
  return movementPatternColors[patternName] || movementPatternColors.default;
}

export function getBodyPartColors(bodyPart: string) {
  return bodyPartColors[bodyPart] || bodyPartColors.core;
}

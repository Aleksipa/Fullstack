interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (exerciseHours: number[], target: number): ExerciseResults => {
  if (!Array.isArray(exerciseHours) || exerciseHours.length === 0) {
    throw new Error('Exercise hours must be an array of numbers');
  }

  if (!exerciseHours.every((hours) => typeof hours === 'number' && !isNaN(hours))) {
    throw new Error('All exercise hours must be numbers');
  }

  if (typeof target !== 'number' || isNaN(target) || target <= 0) {
    throw new Error('Target must be a positive number');
  }

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
  const average = exerciseHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const success = average >= target;
  const rating = () => {
    if (average >= target) {
      return 3;
    } else if (average >= target / 2) {
      return 2;
    } else {
      return 1;
    }
  };
  const ratingDescription =
    average >= target
      ? 'Good job!'
      : average >= target / 2
        ? 'Not too bad but could be better'
        : 'Work harder';
  return {
    periodLength,
    trainingDays,
    success,
    rating: rating(),
    ratingDescription,
    target,
    average,
  };
};

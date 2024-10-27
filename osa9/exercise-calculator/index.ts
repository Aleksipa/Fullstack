import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const queryParameters = req.query;
  const height = Number(queryParameters.height);
  const weight = Number(queryParameters.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight) || height < 0 || weight < 0) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const bmi = calculateBmi(height, weight);
    return res.json({ weight, height, bmi });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'An unknown error occurred' });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: number[], target: number };

  if (!daily_exercises || target === undefined || !Array.isArray(daily_exercises) || !daily_exercises.every(Number.isFinite) || !Number.isFinite(target)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises.map(Number), target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
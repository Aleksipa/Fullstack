export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal weight';
  } else {
    return 'Overweight';
  }
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
console.log(calculateBmi(height, weight));

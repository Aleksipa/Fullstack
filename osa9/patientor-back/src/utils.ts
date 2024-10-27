import { NewPatient, Gender } from "./types";
import { z } from "zod";

export const patientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const toNewPatient = (object: unknown): NewPatient => {
  return patientSchema.parse(object);
};

export default toNewPatient;

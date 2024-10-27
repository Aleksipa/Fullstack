import { NewPatient, Gender } from "./types";
import { z } from "zod";
import { NewEntry, Diagnosis, HealthCheckRating, EntryType } from "./types";

// Type guard for string
function isString(text: unknown): text is string {
  return typeof text === "string" || text instanceof String;
}

// Type guard for Date
function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

// Type guard for HealthCheckRating
function isHealthCheckRating(param: number): param is HealthCheckRating {
  return Object.values(HealthCheckRating).includes(param);
}

function parseDiagnosisCodes(object: unknown): Array<Diagnosis["code"]> {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  const codes = object.diagnosisCodes;
  if (!Array.isArray(codes) || !codes.every((code) => isString(code))) {
    throw new Error("Invalid diagnosis codes");
  }

  return codes;
}

function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

function validateBaseEntry(object: unknown) {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("description" in object) ||
    !("date" in object) ||
    !("specialist" in object)
  ) {
    throw new Error("Missing required fields");
  }

  if (
    !isString(object.description) ||
    !isString(object.specialist) ||
    !isString(object.date) ||
    !isDate(object.date)
  ) {
    throw new Error("Incorrect field types");
  }
}

interface BaseEntryFields {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface HealthCheckFields extends BaseEntryFields {
  type: EntryType.HealthCheck;
  healthCheckRating: unknown;
}

interface HospitalFields extends BaseEntryFields {
  type: EntryType.Hospital;
  discharge: {
    date: unknown;
    criteria: unknown;
  };
}

interface OccupationalHealthcareFields extends BaseEntryFields {
  type: EntryType.OccupationalHealthcare;
  employerName: unknown;
  sickLeave?: unknown;
}

function toNewEntry(object: unknown): NewEntry {
  if (!object || typeof object !== "object") {
    throw new Error("Missing entry data");
  }

  validateBaseEntry(object);
  const diagnosisCodes = parseDiagnosisCodes(object);

  if (!("type" in object)) {
    throw new Error("Missing entry type");
  }

  switch (object.type) {
    case EntryType.HealthCheck: {
      const entry = object as HealthCheckFields;
      if (
        !("healthCheckRating" in entry) ||
        !isHealthCheckRating(Number(entry.healthCheckRating))
      ) {
        throw new Error("Invalid or missing healthCheckRating");
      }

      const newEntry: NewEntry = {
        type: EntryType.HealthCheck,
        description: String(entry.description),
        date: String(entry.date),
        specialist: String(entry.specialist),
        diagnosisCodes,
      };
      return newEntry;
    }

    case EntryType.Hospital: {
      const entry = object as HospitalFields;
      if (
        !entry.discharge ||
        typeof entry.discharge !== "object" ||
        !("date" in entry.discharge) ||
        !("criteria" in entry.discharge) ||
        !isString(entry.discharge.date) ||
        !isDate(entry.discharge.date) ||
        !isString(entry.discharge.criteria)
      ) {
        throw new Error("Invalid discharge information");
      }

      const newEntry: NewEntry = {
        type: EntryType.Hospital,
        description: String(entry.description),
        date: String(entry.date),
        specialist: String(entry.specialist),
        diagnosisCodes,
        discharge: {
          date: entry.discharge.date,
          criteria: entry.discharge.criteria,
        },
      };
      return newEntry;
    }

    case EntryType.OccupationalHealthcare: {
      const entry = object as OccupationalHealthcareFields;
      if (!entry.employerName || !isString(entry.employerName)) {
        throw new Error("Missing or invalid employer name");
      }

      let sickLeave: { startDate: string; endDate: string } | undefined =
        undefined;

      if (entry.sickLeave && typeof entry.sickLeave === "object") {
        const sickLeaveData = entry.sickLeave as {
          startDate: unknown;
          endDate: unknown;
        };
        if (
          !("startDate" in sickLeaveData) ||
          !("endDate" in sickLeaveData) ||
          !isString(sickLeaveData.startDate) ||
          !isString(sickLeaveData.endDate) ||
          !isDate(sickLeaveData.startDate) ||
          !isDate(sickLeaveData.endDate)
        ) {
          throw new Error("Invalid sick leave data");
        }
        sickLeave = {
          startDate: sickLeaveData.startDate,
          endDate: sickLeaveData.endDate,
        };
      }

      return {
        type: EntryType.OccupationalHealthcare,
        description: String(entry.description),
        date: String(entry.date),
        specialist: String(entry.specialist),
        diagnosisCodes,
        employerName: String(entry.employerName),
        sickLeave,
      };
    }

    default:
      return assertNever(object.type as never);
  }
}

export { toNewEntry };

export const patientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.any()).optional(),
});

const toNewPatient = (object: unknown): NewPatient => {
  return patientSchema.parse(object);
};

export default toNewPatient;

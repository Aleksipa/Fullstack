import patients from "../../data/patients";
import { Patient, NewPatient } from "../types";
import { NonSensitivePatient } from "../types";
import { v1 as uuid } from "uuid";
import { Entry, NewEntry } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: [],
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

function addEntry(patientId: string, entry: NewEntry): Entry {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  if (!patient.entries) {
    patient.entries = [];
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  } as Entry;

  patient.entries.push(newEntry);
  return newEntry;
}

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry,
};

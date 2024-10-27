import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Alert } from "@mui/material";
import { Diagnosis, Entry, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { EntryDetails } from "../EntryDetails";
import { AddEntryForm } from "../AddEntryModal/AddEntryForm";

export function PatientPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Record<string, Diagnosis>>({});
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patientData = await patientService.getById(id);
        setPatient(patientData);
      }
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnosisData = await diagnosisService.getAll();
      const diagnosisMap = diagnosisData.reduce(
        (map, diagnosis) => ({
          ...map,
          [diagnosis.code]: diagnosis,
        }),
        {} as Record<string, Diagnosis>
      );
      setDiagnoses(diagnosisMap);
    };
    void fetchDiagnoses();
  }, []);

  const handleAddEntry = async (newEntry: Omit<Entry, "id">) => {
    try {
      if (id) {
        const addedEntry = await patientService.addEntry(id, newEntry);
        setPatient((prevPatient) =>
          prevPatient
            ? {
                ...prevPatient,
                entries: [...(prevPatient.entries ?? []), addedEntry],
              }
            : null
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
      setTimeout(() => setError(null), 5000);
    }
  };

  if (!patient) return null;

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h4" style={{ marginBottom: "0.5em" }}>
        {patient.name}
      </Typography>
      <Typography>gender: {patient.gender}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Add New Entry
      </Typography>

      <AddEntryForm onSubmit={handleAddEntry} diagnoses={diagnoses} />

      <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
        Entries
      </Typography>

      {patient.entries?.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </Box>
  );
}

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { EntryDetails } from "../EntryDetails";

export function PatientPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Record<string, Diagnosis>>({});
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

  if (!patient) return null;

  return (
    <Box>
      <Typography variant="h4" style={{ marginBottom: "0.5em" }}>
        {patient.name}
      </Typography>
      <Typography>gender: {patient.gender}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
        Entries
      </Typography>

      {patient.entries?.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </Box>
  );
}

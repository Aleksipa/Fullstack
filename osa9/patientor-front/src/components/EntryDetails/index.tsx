import { Diagnosis, Entry } from "../../types";
import { Box, Typography, Card, CardContent } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";

function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

interface Props {
  entry: Entry;
  diagnoses: Record<string, Diagnosis>;
}

export function EntryDetails({ entry, diagnoses }: Props) {
  const baseEntryDetails = (
    <>
      <Typography variant="body1" display="flex" alignItems="center" gap={1}>
        {entry.date}
        {entry.type === "Hospital" && <LocalHospitalIcon />}
        {entry.type === "OccupationalHealthcare" && <WorkIcon />}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      {entry.diagnosisCodes && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">Diagnoses:</Typography>
          <ul style={{ margin: 0 }}>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                {code} {diagnoses[code]?.name}
              </li>
            ))}
          </ul>
        </Box>
      )}
      <Typography variant="body2">diagnosed by {entry.specialist}</Typography>
    </>
  );

  switch (entry.type) {
    case "Hospital":
      return (
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ borderLeft: 4, borderColor: "error.main" }}>
            {baseEntryDetails}
            <Typography variant="body2" color="text.secondary">
              Discharge: {entry.discharge.date} - {entry.discharge.criteria}
            </Typography>
          </CardContent>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ borderLeft: 4, borderColor: "info.main" }}>
            {baseEntryDetails}
            <Typography variant="body2" color="text.secondary">
              Employer: {entry.employerName}
            </Typography>
            {entry.sickLeave && (
              <Typography variant="body2" color="text.secondary">
                Sick leave: {entry.sickLeave.startDate} -{" "}
                {entry.sickLeave.endDate}
              </Typography>
            )}
          </CardContent>
        </Card>
      );
    default:
      return assertNever(entry);
  }
}

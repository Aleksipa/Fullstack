import { useState } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Diagnosis, HealthCheckRating, EntryFormValues } from "../../types";

interface Props {
  onSubmit: (values: EntryFormValues) => Promise<void>;
  diagnoses: Record<string, Diagnosis>;
}

export function AddEntryForm({ onSubmit }: Props) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit({
      type: "Hospital",
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    });

    // Reset form
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating(0);
    setDiagnosisCodes([]);
    setDischargeDate("");
    setDischargeCriteria("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        margin="normal"
        required
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        margin="normal"
        required
      />
      <TextField
        select
        label="Health Check Rating"
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
        margin="normal"
        required
      >
        {[0, 1, 2, 3].map((rating) => (
          <MenuItem key={rating} value={rating}>
            {rating}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Discharge Date"
        type="date"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        margin="normal"
        required
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Discharge Criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        margin="normal"
        required
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Entry
      </Button>
    </Box>
  );
}

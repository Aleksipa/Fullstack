import express from "express";
import patientService from "../services/patientService";
import toNewPatient, { patientSchema } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = patientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(400).json({ error: "Unkown error." });
    }
  }
});

export default router;

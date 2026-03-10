import express from "express";
import { createExperience } from "../controllers/experienceController.js";

const router = express.Router();

router.post("/", createExperience);

export default router;

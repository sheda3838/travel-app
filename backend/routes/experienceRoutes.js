import express from "express";
import { create, getAll, getSingle, update, deleteOne, getMine } from "../controllers/experienceController.js";
import {protect } from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/", protect, create);
router.get("/", getAll);
router.get("/mine", protect, getMine);
router.get("/:id", getSingle);
router.patch("/:id", protect, update);
router.delete("/:id", protect, deleteOne);


export default router;

import express from "express";
import { create, getAll, getSingle, update, deleteOne, getMine } from "../controllers/experienceController.js";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/mine", getMine);
router.get("/:id", getSingle);
router.patch("/:id", update);
router.delete("/:id", deleteOne);


export default router;

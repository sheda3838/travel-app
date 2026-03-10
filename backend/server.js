import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import {protect} from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

//connect to MongoDB
connectDB();

//middleware
app.use(cors());
app.use(express.json());

//test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/experiences", protect, experienceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

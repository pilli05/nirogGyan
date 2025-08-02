import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/db/db.js";
import doctorsRouter from "./src/api/routers/doctorsRouter.js";
import appointmentRouter from "./src/api/routers/appointmentRouter.js";

const app = express();

const PORT = 4000;
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/v1/doctors", doctorsRouter);
app.use("/api/v1/appointments", appointmentRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

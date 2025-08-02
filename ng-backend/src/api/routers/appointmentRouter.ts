import { Router } from "express";
import appointmentController from "../controllers/appointmentController.js";

const appointmentRouter = Router();

appointmentRouter
  .route("/bookAppointment")
  .post(appointmentController.bookAppointment);

export default appointmentRouter;

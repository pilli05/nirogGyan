import { Router } from "express";
import doctorsController from "../controllers/doctorsController.js";

const doctorsRouter = Router();

doctorsRouter.route("/createDoctor").post(doctorsController.createDoctor);
doctorsRouter.route("/doctorsList").get(doctorsController.getDoctorsList);
doctorsRouter
  .route("/getDoctor/:doctorId")
  .get(doctorsController.getDoctorById);

export default doctorsRouter;

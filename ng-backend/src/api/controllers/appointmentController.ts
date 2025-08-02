import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import appointmentService from "../services/appointmentService.js";

const appointmentController = {
  bookAppointment: async (req: Request, res: Response) => {
    try {
      const {
        doctorId,
        doctorName,
        name,
        email,
        age,
        gender,
        description,
        date,
        time,
      } = req.body;

      const patientId = uuidv4();

      const patient = {
        patientId,
        doctorId,
        doctorName,
        name,
        email,
        age,
        gender,
        description,
        date,
        time,
      };
      const response = await appointmentService.bookAppointment(patient);
      res.status(201).json({ message: "Appointment booked", data: response });
    } catch (error) {
      res.status(500).json({ message: "Error booking appointment" });
    }
  },
};

export default appointmentController;

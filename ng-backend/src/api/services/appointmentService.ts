import { IPatient } from "../../types/custom.js";
import appointmentsRepository from "../repositories/appointmentsRepository.js";

const appointmentService = {
  bookAppointment: async (patient: IPatient) => {
    try {
      const response = await appointmentsRepository.bookAppointment(patient);
      return response;
    } catch (error) {
      throw new Error("Error booking appointment");
    }
  },
};

export default appointmentService;

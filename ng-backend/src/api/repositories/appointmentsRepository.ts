import { connectDB } from "../../db/db.js";
import { Patient } from "../../models/patientModel.js";
import { IPatient } from "../../types/custom.js";

const appointmentsRepository = {
  bookAppointment: async (patient: IPatient) => {
    try {
      await connectDB();
      const response = await Patient.insertOne(patient);
      return response;
    } catch (error) {
      throw new Error("Error booking appointment");
    }
  },
};

export default appointmentsRepository;

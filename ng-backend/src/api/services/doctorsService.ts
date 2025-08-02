import { IDoctor } from "../../types/custom.js";
import doctorsRepository from "../repositories/doctorsRepository.js";

const doctorsService = {
  createDoctor: async (doctor: IDoctor) => {
    try {
      const response = await doctorsRepository.createDoctor(doctor);
      return response;
    } catch (error) {
      throw new Error("Error creating doctor");
    }
  },

  getDoctorById: async (doctorId: string) => {
    try {
      const response = await doctorsRepository.getDoctorById(doctorId);
      return response;
    } catch (error) {
      throw new Error("Error getting doctor by id");
    }
  },

  getDoctorsList: async (search: string, page: number, limit: number) => {
    try {
      const searchString = typeof search === "string" ? search : "";
      const doctors = await doctorsRepository.getDoctorsList(
        searchString,
        page,
        limit
      );
      return doctors;
    } catch (error) {
      throw new Error("Error getting doctors list");
    }
  },
};

export default doctorsService;

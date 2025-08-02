import { Request, Response } from "express";
import doctorsService from "../services/doctorsService.js";
import { v4 as uuidv4 } from "uuid";

const doctorsController = {
  createDoctor: async (req: Request, res: Response) => {
    try {
      const {
        name,
        hospitalName,
        emailId,
        contactDetails,
        specialization,
        description,
        isAvailable,
      } = req.body;
      const doctorId = uuidv4();
      const doctor = {
        doctorId,
        name,
        hospitalName,
        emailId,
        contactDetails,
        specialization,
        description,
        isAvailable,
      };

      const response = await doctorsService.createDoctor(doctor);
      res.status(200).json({ message: "Doctor created", data: response });
    } catch (error) {
      res.status(500).json({ message: "Error creating doctor" });
    }
  },

  getDoctorById: async (req: Request, res: Response) => {
    try {
      const { doctorId } = req.params;
      const response = await doctorsService.getDoctorById(doctorId);
      res.status(200).json({ message: "Doctor found", data: response });
    } catch (error) {
      res.status(500).json({ message: "Error getting doctor" });
    }
  },

  getDoctorsList: async (req: Request, res: Response) => {
    try {
      const { search, page, limit } = req.query;
      const searchString = typeof search === "string" ? search : "";
      const pageNo = typeof page === "string" ? parseInt(page) : 1;
      const pageSize = typeof limit === "string" ? parseInt(limit) : 5;
      const response = await doctorsService.getDoctorsList(
        searchString,
        pageNo,
        pageSize
      );
      res.status(200).json({ message: "Doctors list", data: response });
    } catch (error) {
      res.status(500).json({ message: "Error getting doctors list" });
    }
  },
};

export default doctorsController;

import { connectDB } from "../../db/db.js";
import { Doctors } from "../../models/doctorsModel.js";
import { IDoctor } from "../../types/custom.js";

const doctorsRepository = {
  createDoctor: async (doctor: IDoctor) => {
    try {
      await connectDB();
      const newDoctor = await Doctors.insertOne(doctor);
      return newDoctor;
    } catch (error) {
      throw new Error("Error creating doctor");
    }
  },

  getDoctorById: async (doctorId: string) => {
    try {
      await connectDB();
      const doctor = await Doctors.findOne({ doctorId });
      return doctor;
    } catch (error) {
      throw new Error("Error getting doctor by id");
    }
  },

  getDoctorsList: async (search: string, page: number, limit: number) => {
    try {
      await connectDB();
      const skip = (page - 1) * limit;
      const doctors = await Doctors.find(
        {
          $or: [
            {
              name: {
                $regex: search,
                $options: "i",
              },
            },
            {
              specialization: {
                $regex: search,
                $options: "i",
              },
            },
            {
              hospitalName: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        },
        {
          _id: 0,
        }
      )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Doctors.countDocuments({});

      return {
        data: doctors,
        total,
      };
    } catch (error) {
      throw new Error("Error getting doctors list");
    }
  },
};

export default doctorsRepository;

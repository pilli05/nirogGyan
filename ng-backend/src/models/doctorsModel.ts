import mongoose from "mongoose";

const doctorsSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    contactDetails: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Doctors = mongoose.model("doctors", doctorsSchema);

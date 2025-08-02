import * as yup from "yup";

const appointmentSchema = yup.object({
  name: yup.string().required("Patient name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  date: yup
    .date()
    .min(new Date().toISOString().split("T")[0], "Date cannot be in the past")
    .required("Date is required"),
  time: yup.string().required("Time is required"),
});

export default appointmentSchema;

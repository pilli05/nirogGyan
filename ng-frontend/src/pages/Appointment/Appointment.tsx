import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

interface IFormData {
  doctorId: string;
  doctorName: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  description: string;
  phone: string;
  date: string;
  time: string;
}

const Appointment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  const location = useLocation();

  const doctorId = location?.state?.doctorDetails?.doctorId;
  const doctorName = location?.state?.doctorDetails?.name;
  const specialization = location?.state?.doctorDetails?.specialization;

  const onSubmit = async (data: IFormData) => {
    data.doctorId = doctorId;
    data.doctorName = doctorName;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/appointments/bookAppointment",
        data
      );
      if (response.status === 201) {
        toast.success("Appointment Booked Successfully");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="!p-10 !pt-5">
      <h1 className="text-2xl font-bold text-gray-600 underline">
        Appointment Booking
      </h1>
      <div className="!mt-2 flex justify-center ">
        <div className="flex flex-col justify-center items-center !p-5  rounded-lg bg-white shadow-md shadow-gray-300 w-auto md:w-2xl">
          <h1 className="text-xl font-bold text-purple-600 !mb-3">
            Book Appointment
          </h1>
          <p className="!mb-2 italic text-gray-500">
            Appointment with
            <span className="text-blue-600 !ml-2 font-bold">
              Dr.{doctorName} ({specialization})
            </span>
          </p>

          <form
            className="w-full !my-3 text-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5  text-sm ">
              <div className="">
                <label
                  className="block !mb-2 text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Patient Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg !p-3 outline-none w-full"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Patient name is required",
                    maxLength: {
                      value: 50,
                      message: "Patient name should be less than 50 characters",
                    },
                  })}
                />
                <p className="text-red-500 text-xs !my-2">
                  {errors.name?.message}
                </p>
              </div>
              <div className="">
                <label
                  className="block !mb-2 text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Eamil <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg !p-3 outline-none w-full"
                  placeholder="Enter your email"
                  maxLength={50}
                  {...register("email", {
                    required: "Email is required",
                    maxLength: {
                      value: 50,
                      message: "Email must be under 50 characters",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                <p className="text-red-500 text-xs !my-2">
                  {errors.email?.message}
                </p>
              </div>
              <div className="">
                <label
                  className="block !mb-2 text-sm font-medium text-gray-700"
                  htmlFor="age"
                >
                  Age <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="age"
                  maxLength={3}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg !p-3 outline-none w-full"
                  placeholder="Enter your age"
                  {...register("age", {
                    required: "Age is required",
                    maxLength: {
                      value: 3,
                      message: "Age must be under 3 characters",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Age must be a number",
                    },
                  })}
                />
                <p className="text-red-500 text-xs !my-2">
                  {errors.age?.message}
                </p>
              </div>
              <div className="">
                <label
                  className="block !mb-2 text-sm font-medium text-gray-700"
                  htmlFor="gender"
                >
                  Gender <span className="text-red-500">*</span>
                </label>

                <select
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg !p-3 outline-none w-full"
                  {...register("gender", { required: true })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <p className="text-red-500 text-xs !my-2">
                  {errors.gender?.type === "required" && "Gender is required"}
                </p>
              </div>
              <div className="">
                <label
                  className="block !mb-2 text-sm font-medium text-gray-700"
                  htmlFor="date"
                >
                  Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg !p-3 outline-none w-full"
                  placeholder="Date"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("date", { required: true })}
                />
                <p className="text-red-500 text-xs !my-2">
                  {errors.date?.type === "required" && "Date is required"}
                </p>
              </div>
              <div className="">
                <label
                  className="block !mb-2 text-sm font-medium text-gray-700"
                  htmlFor="time"
                >
                  Time <span className="text-red-500">*</span>
                </label>

                <input
                  type="time"
                  id="time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg !p-3 outline-none w-full"
                  placeholder="Time"
                  {...register("time", { required: true })}
                />
                <p className="text-red-500 text-xs !my-2">
                  {errors.time?.type === "required" && "Time is required"}
                </p>
              </div>
            </div>
            <div className="!my-3">
              <label
                className="block !mb-2 text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Description
              </label>

              <textarea
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg !p-3 outline-none w-full"
                placeholder="Enter your description"
                maxLength={2000}
                {...register("description", { required: false })}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#082567] text-white font-bold !py-3 !px-4 rounded cursor-pointer hover:bg-blue-700 duration-300"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;

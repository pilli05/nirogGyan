import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IDoctors {
  doctorId: string;
  name: string;
  hospitalName: string;
  emailId: string;
  contactDetails: string;
  specialization: string;
  description: string;
  isAvailable: boolean;
}

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState<IDoctors | null>(null);

  const doctorId = location?.state?.doctorId;

  const handleNaviageToAppointmentBooking = (doctorDetails: IDoctors) => {
    navigate("/appointment-booking", { state: { doctorDetails } });
  };

  const getDoctorById = async (doctorId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/doctors/getDoctor/${doctorId}`
      );
      if (response.status === 200) {
        setDoctorDetails(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorById(doctorId);
  }, [doctorId]);

  console.log(doctorDetails);
  return (
    <div className="!p-10">
      <h1 className="text-2xl font-bold text-gray-600 underline">
        Doctor Profile
      </h1>
      <div className="!mt-5 flex justify-center ">
        <div className="flex flex-col justify-center items-center !p-5  rounded-lg bg-white shadow-md shadow-gray-300 ">
          <div className="w-20 h-20 rounded-full text-4xl  flex justify-center items-center !mb-5 bg-slate-200 text-[#ed2fda]">
            {doctorDetails?.name[0]}
          </div>
          <div className="flex flex-col  !space-y-4">
            <h1 className="text-xl font-bold text-blue-800 text-center">
              Dr. {doctorDetails?.name}
            </h1>
            <div className="flex justify-between items-center  text-sm text-gray-500">
              <span className="w-[200px]">Specialization</span>
              <span className="font-semibold">
                {doctorDetails?.specialization}
              </span>
            </div>
            <div className="flex justify-between items-center  text-sm text-gray-500">
              <span className="w-[200px]">Hospital</span>
              <span className="font-semibold">
                {doctorDetails?.hospitalName}
              </span>
            </div>
            <div className="flex justify-between items-center  text-sm text-gray-500">
              <span className="w-[200px]">Email</span>
              <span className="font-semibold">{doctorDetails?.emailId}</span>
            </div>
            <div className="flex justify-between items-center  text-sm text-gray-500">
              <span className="w-[200px]">Mobile Number</span>
              <span className="font-semibold">
                {doctorDetails?.contactDetails}
              </span>
            </div>
            <div className="flex justify-between items-center  text-sm text-gray-500">
              <span className="w-[200px]">Availability</span>
              <span
                className={` text-black text-sm !px-2 !py-1 rounded ${
                  doctorDetails?.isAvailable ? "bg-green-200" : "bg-gray-300"
                }`}
              >
                {doctorDetails?.isAvailable ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-center !my-3 text-sm">
              <button
                onClick={
                  doctorDetails?.isAvailable
                    ? () => {
                        handleNaviageToAppointmentBooking(doctorDetails);
                      }
                    : () => {}
                }
                className={`bg-[#082567] text-white font-bold !py-2 !px-4 rounded  ${
                  doctorDetails?.isAvailable
                    ? "bg-[#082567] hover:bg-blue-600 cursor-pointer duration-300"
                    : " hover:bg-blue-500 cursor-not-allowed opacity-40 duration-300"
                }`}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

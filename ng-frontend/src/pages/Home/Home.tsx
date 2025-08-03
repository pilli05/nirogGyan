import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
const Home = () => {
  const navigate = useNavigate();
  const [doctorsList, setDoctorsList] = useState<IDoctors[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const goToProfilePage = (doctorId: string) => {
    navigate("/profile", { state: { doctorId } });
  };

  const getDoctorsList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/doctors/doctorsList?search=${searchInput}&page=${currentpage}&limit=${pageSize}`
      );
      if (response.status === 200) {
        setDoctorsList(response.data.data.data);
        setTotalCount(response.data.data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsList();
  }, [currentpage]);

  useEffect(() => {
    const clearTimer = setTimeout(() => {
      if (searchInput.length >= 3 || searchInput.length === 0) {
        getDoctorsList();
      }
    }, 500);
    return () => clearTimeout(clearTimer);
  }, [searchInput]);

  return (
    <div className="!p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-600 underline !mb-3 sm:!mb-0">
          Doctors List
        </h1>
        <input
          type="search"
          placeholder="Search by name or hospital or specialization "
          className="bg-white border border-gray-300 rounded-lg outline-none !px-3 !py-2 w-auto sm:w-[500px]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !mt-5">
        {doctorsList && doctorsList.length > 0 ? (
          doctorsList.map((doctor) => (
            <div
              key={doctor.doctorId}
              className="bg-white !p-4  border border-slate-300 rounded-lg cursor-pointer hover:scale-105 duration-300"
              onClick={() => goToProfilePage(doctor.doctorId)}
            >
              <div className="flex">
                <div className=" bg-[#ed2fda] text-white text-3xl w-20 h-16 rounded-full flex items-center justify-center !mr-3">
                  {doctor.name[0]}
                </div>

                <div className="w-full">
                  <h2 className="text-base font-semibold">
                    {doctor.name.toUpperCase()}
                  </h2>
                  <p className="text-gray-600 text-sm font-semibold !mb-1">
                    {doctor.specialization}
                  </p>
                  <div className="flex justify-between w-full">
                    <p className="text-blue-600 font-semibold text-sm">
                      {doctor.hospitalName}
                    </p>
                    <span
                      className={`  text-black text-xs !px-2 !py-1 rounded ${
                        doctor.isAvailable ? "bg-green-200" : "bg-gray-300"
                      }`}
                    >
                      {doctor.isAvailable ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white !p-4 rounded shadow rounded-b-lg">
            <h2 className="text-lg font-semibold">No Doctors Available</h2>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-end !mt-10">
          <button
            className={`bg-gray-300 text-gray-600 !px-3 !py-1 rounded !mr-2 ${
              currentpage === 1 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => setCurrentPage(currentpage - 1)}
            disabled={currentpage === 1}
          >
            Previous
          </button>
          {Array.from(
            { length: Math.ceil(totalCount / pageSize) },
            (_, index) => (
              <button
                key={index}
                className={`bg-gray-300 text-gray-600 !px-3 !py-1 rounded !mx-1 cursor-pointer  ${
                  currentpage === index + 1 ? "!bg-blue-500 text-white" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            className={`bg-gray-300 text-gray-600 !px-3 !py-1 rounded !ml-2 !mr-2 ${
              currentpage === Math.ceil(totalCount / pageSize)
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => setCurrentPage(currentpage + 1)}
            disabled={currentpage === Math.ceil(totalCount / pageSize)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

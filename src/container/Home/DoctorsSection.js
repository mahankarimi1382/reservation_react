import React, { useEffect, useState } from "react";
import star from "../../assets/Pics/star.png";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import doctor_icon from "../../assets/Pics/doctor-icon.jpg";
import { Link, useNavigate } from "react-router-dom";
import { read_firsPage_doctors } from "../../api/ApiCalling";
import LoadingComponent from "../../components/LoadingComponent";
import { doctorProfileStore } from "../../store/Store";
import { RateCounter } from "../../utils/RateCounter";

function DoctorsSection() {
  const { setDoctorId, setDoctorName } = doctorProfileStore();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFirstPageDoctors = async () => {
    const data = await read_firsPage_doctors();
    if (data) {
      setDoctors(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFirstPageDoctors();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {loading && <LoadingComponent />}

      <div className="lg:mt-20 mt-5 flex justify-between w-11/12">
        <h2 className="lg:text-[38px] flex justify-center items-center gap-1 lg:gap-2">
          <span className="text-[#005DAD]">پزشکان</span>
          ویزیت فوری
        </h2>

        <Link
          to="/doctors"
          className="text-[#005DAD] flex items-center gap-1 text-[12px] lg:text-[16px]"
        >
          مشاهده همه
          <IoIosArrowBack />
        </Link>
      </div>

      <div className="py-2 px-2 lg:mt-10 mt-5 flex gap-12 no-scrollbar overflow-x-auto w-11/12">
        {doctors.map((item) => (
          <div
            key={item.id}
            className="bg-white px-2 lg:px-0 flex lg:gap-5 gap-2 flex-col justify-center items-center rounded-xl shadow-[3px_5px_9px_0px_rgba(0,_0,_0,_0.1)]
            min-w-[215px] lg:min-w-[310px] h-[266px] lg:h-[399px]"
          >
            <div className="relative">
              <span className="bg-[#00B62A] w-3 h-3 right-[5%] top-[3%] absolute z-40 rounded-full border-2 border-white" />

              <img
                alt="doctor-img"
                className="object-cover w-[86px] h-[86px] lg:w-[133px] lg:h-[133px] rounded-full"
                src={doctor_icon}
              />
            </div>

            <div className="flex w-full lg:px-5 justify-between items-center">
              <h2 className="lg:text-[16px] lg:font-semibold">
                {item.doctorTreatmentCenter.doctor.doctorName}{" "}
                {item.doctorTreatmentCenter.doctor.doctorFamily}
              </h2>

              <div className="flex items-center justify-center">
                <RateCounter rate={5} width={16} />
              </div>
            </div>

            <h2 className="text-gray-400 text-[14px] lg:font-semibold lg:px-5 w-full">
              تخصص: {item.doctorTreatmentCenter.doctor.specialist}
            </h2>

            <h2 className="text-[#1F7168] text-[14px] lg:font-semibold w-full lg:px-5">
              (0) 0 بیمار راضی
            </h2>

            <button
              onClick={() => {
                const doctor = item.doctorTreatmentCenter?.doctor;
                setDoctorId(doctor?.id);
                setDoctorName(
                  `${doctor?.doctorName ?? ""} ${doctor?.doctorFamily ?? ""}`.trim()
                );
                navigate(
                  `/doctors/${encodeURIComponent(
                    `${doctor?.doctorName ?? ""} ${doctor?.doctorFamily ?? ""}`.trim()
                  )}`
                );
              }}
              className="hover:bg-[#005DAD] hover:text-white transition-all flex justify-center items-center gap-2 text-sm lg:text-base lg:w-2/3 text-[#005DAD] rounded-lg p-1 lg:p-2 border-2 border-[#005DAD]"
            >
              نوبت بگیرید
              <MdArrowBackIosNew />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsSection;

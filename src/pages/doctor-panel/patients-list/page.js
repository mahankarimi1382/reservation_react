import { CiSearch } from "react-icons/ci";
import DoctorProfIcon from "../../../assets/Pics/doctor-profile-icon.png";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DoctorPanelMenu from "../../../container/doctor-panel/DoctorPanelMenu";
import { PiWarningCircle } from "react-icons/pi";
import { fullNameStorage, userDoctorStorage } from "../../../store/Store";
import ProfileDropdown from "../../../components/ProfileDropdown";
import { read_doctor_patients } from "../../../api/ApiCalling";
import { SyncLoader } from "react-spinners";

function page() {
  const { fullName } = fullNameStorage();
  const { doctorid } = userDoctorStorage();

  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!doctorid) {
      setIsLoading(false);
      return;
    }
    read_doctor_patients(doctorid).then((list) => {
      setPatients(list);
      setIsLoading(false);
    });
  }, [doctorid]);

  const rows = patients
    .filter((item) => {
      if (!searchTerm.trim()) return true;
      const text = `${item.patientName ?? ""} ${item.patientFamily ?? ""} ${
        item.nationalId ?? ""
      }`;
      return text.includes(searchTerm.trim());
    })
    .map((item) => ({
      id: item.id,
      code: item.id,
      name: `${item.patientName ?? ""} ${item.patientFamily ?? ""}`.trim(),
      nationalcode: item.nationalId ?? "—",
      phone: item.patientPhone ?? "—",
      gender: item.gender === true ? "آقا" : item.gender === false ? "خانم" : "—",
    }));

  return (
    <div dir="rtl" className="flex pb-20  bg-[#F6FBFF]">
      <DoctorPanelMenu />
      <div className=" mt-10 w-full flex flex-col gap-7 items-center">
        <div className=" flex justify-between items-center w-[80%]">
          <label className=" bg-white w-[450px] border px-2 p-1 border-[#005DAD] rounded-xl flex justify-between ">
            <input
              className=" w-full outline-none"
              placeholder="جستجو"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className=" text-white text-4xl p-1 rounded-lg bg-[#005DAD]" />
          </label>
         <ProfileDropdown
            fullName={fullName}
            title="دکتر"

          />
        </div>
        <div className=" w-[80%] flex gap-7 flex-col">
          <div className=" flex p-3 border border-[#005DAD] bg-[#ECF6FF] rounded-xl items-center text-[#005DAD] gap-1">
            <PiWarningCircle />
            <h5>
              لیست زیر شامل بیماران شما می باشد.
            </h5>
          </div>

          <div className=" flex flex-col w-full rounded-lg border shadow-md bg-white">
            <div className=" py-4 w-full flex rounded-t-lg bg-[#DBEDFF]">
              <h4 className=" w-1/6 flex justify-center  items-center text-[#3F444D] text-lg">
                کد پیگیری
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                نام بیمار
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                شماره تماس
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                جنسیت
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                کدملی
              </h4>
              <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg"></h4>
            </div>
            {isLoading && (
              <div className=" flex justify-center items-center py-10">
                <SyncLoader color="#005DAD" size={9} />
              </div>
            )}
            {!isLoading && rows.length === 0 && (
              <div className=" flex justify-center items-center py-10 text-[#757575]">
                بیماری برای نمایش وجود ندارد
              </div>
            )}
            {rows.map((item) => {
              return (
                <div
                  className=" border flex py-5 px-4  bg-white "
                  key={item.id}
                >
                  <h4 className=" w-1/6 flex justify-center items-center text-[#3F444D] text-lg">
                    {item.code}
                  </h4>
                  <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                    {item.name}
                  </h4>
                  <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg" dir="ltr">
                    {item.phone}
                  </h4>
                  <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg">
                    {item.gender}
                  </h4>
                  <h4 className=" w-[16%] flex justify-center items-center text-[#3F444D] text-lg" dir="ltr">
                    {item.nationalcode}
                  </h4>
                  <span className=" w-[16%]"></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

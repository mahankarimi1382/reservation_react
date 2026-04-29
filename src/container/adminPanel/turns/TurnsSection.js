"use client";
import {
  delete_doctor,
  delete_patient,
  get_all_turns,
  get_patients,
} from "../../../api/ApiCalling";
import { AddPatinetButt } from "../../../components/Buttons/Button";
import DatePickerComponent from "../../../components/DatePickerComponent";
import { SelectFilter } from "../../../components/Inputs/Input";
import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import excel_icon from "../../../assets/Pics/excelIcon.png";
import { MdDeleteForever } from "react-icons/md";
import LoadingComponent from "../../../components/LoadingComponent";
import SeeTurnDetailsModal from "../../../components/modals/SeeTurnDetailsModal";
function TurnsSection() {
  const [isSeeTurnDetails, setIsSeeTurnDetails] = useState(false);
  const [turns, setTurns] = useState([]);
  const [selecteditem, setSelectedItem] = useState({});
  console.log(turns);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await get_all_turns();
      if (data) {
        setTurns(data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const convertDate = (dateString) => {
    let str = `${dateString}`;
    if (str.length == 8) {
      const year = str.substring(0, 4);
      const month = str.substring(4, 6);
      const day = str.substring(6, 8);
      return `${year}/${month}/${day}`;
    }
  };
  return (
    <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
      {/* <div className=" flex w-[80%]  justify-center gap-5 items-center">
        <DatePickerComponent title="از تاریخ" />
        <DatePickerComponent title="تا تاریخ" />
        <SelectFilter title="نام پزشک" />
        <SelectFilter title="نام مرکز درمانی" />
        <SelectFilter title="تخصص" />
        <SelectFilter title="نوع ویزیت" />
      </div> */}
      <div className=" gap-2 flex justify-end w-[80%] items-center">
        {isLoading && <LoadingComponent />}
        {isSeeTurnDetails && (
          <SeeTurnDetailsModal
            selectedItem={selecteditem}
            closeModal={() => setIsSeeTurnDetails(false)}
          />
        )}
        <button className=" border rounded-lg px-3 p-1 gap-2 text-[#185B37] border-[#185B37] flex">
          <img src={excel_icon} alt=" icon" width={24} />
          خروجی اکسل
        </button>
        {/* <button className=" border rounded-lg px-3 p-1 gap-2 text-[#3F444D] border-[#3F444D] flex">
            <Image src={printer} alt=" icon" width={24} />
            چاپ اطلاعات{" "}
          </button> */}
        {/* <AddPatinetButt
          isAddPatient={isAddPatient}
          setIsAddPatient={setIsAddPatient}
        /> */}
      </div>
      <div className=" gap-3 flex flex-col w-[80%] rounded-lg border shadow-md p-4 bg-white">
        <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
          <h4 className=" w-[18%] flex justify-center  items-center text-[#3F444D] ">
            نام پزشک <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
            نام بیمار <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
            زمان ویزیت <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
            کد ملی بیمار
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
            شماره همراه بیمار <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[15%] flex justify-center items-center text-[#3F444D] "></h4>
        </div>

        {turns.map((item) => {
          return (
            <div
              className=" border flex items-center justify-center py-3 rounded-lg bg-white shadow-md"
              key={item.id}
            >
              <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
                {item.doctor.doctorName} {item.doctor.doctorFamily}
              </h4>
              <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
                {item.patient.patientName} {item.patient.patientFamily}
              </h4>
              <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
                {convertDate(item.reservation.reservationDate)} ساعت{" "}
                {item.reservation.reservationTime}
              </h4>
              <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
                {item.patient.nationalId}
              </h4>
              <h4 className=" w-[18%] flex justify-center items-center text-[#3F444D] ">
                {item.patient.patientPhone}
              </h4>
              <div className=" w-[15%] flex justify-center items-center ">
                <button
                  onClick={() => {
                    console.log(item);
                    setSelectedItem({
                      name:
                        item.doctor.doctorName + " " + item.doctor.doctorFamily,
                      pName:
                        item.patient.patientName +
                        " " +
                        item.patient.patientFamily,
                      date:
                        convertDate(item.reservation.reservationDate) +
                        "ساعت" +
                        item.reservation.reservationTime,
                      address:
                        (item.doctorTreatmentCenter.clinic &&
                          item.doctorTreatmentCenter.clinic.address) ||
                        item.doctorTreatmentCenter.office.address,
                      type: "حضوری",
                      nationalId: item.patient.nationalId,
                      phone: item.patient.patientPhone,
                    });
                    setIsSeeTurnDetails(true);
                  }}
                  className=" text-sm  bg-[#DBEDFF] text-[#005DAD] border border-[#005DAD] p-2 rounded-lg"
                >
                  مشاهده جزئیات
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TurnsSection;

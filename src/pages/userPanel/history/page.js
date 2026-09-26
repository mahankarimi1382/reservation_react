import { SelectFilter } from "../../../components/Inputs/Input";
import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React, { useEffect, useState } from "react";
import hozoriIcon from "../../../assets/Pics/people.png";
import onlineIcon from "../../../assets/Pics/monitor-mobbile-black.png";
import hozoriIcon_blue from "../../../assets/Pics/hozori-blue.png";
import doctorIcon from "../../../assets/Pics/doctor-icon.jpg";
import { UserPanel_PhoneTitle } from "../dashboard/page";
import DeletingModal from "../../../components/modals/DeletingModal";
import { SyncLoader } from "react-spinners";
import {
  delete_patient_reservation,
  get_all_turns,
} from "../../../api/ApiCalling";

// تاریخ شمسی ذخیره‌شده در بک‌اند به صورت عدد 14030512 است
const formatJalaliDate = (value) => {
  if (!value) return "";
  const str = String(value);
  if (str.length !== 8) return str;
  return `${str.slice(0, 4)}/${str.slice(4, 6)}/${str.slice(6, 8)}`;
};

function page() {
  const [turns, setTurns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [selectedTurn, setSelectedTurn] = useState(null);
  const [activeFilter, setActiveFilter] = useState("همه");

  useEffect(() => {
    get_all_turns()
      .then((data) => {
        setTurns(data ?? []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const VistitTypeFilters = [
    { id: 1, type: "همه", isSelect: true, icon: null },
    { id: 1, type: "آنلاین", isSelect: true, icon: onlineIcon },
    { id: 1, type: "حضوری", isSelect: true, icon: hozoriIcon },
  ];

  const cards = turns
    .filter((item) => {
      if (activeFilter === "همه") return true;
      const typeText =
        item?.reservation?.doctorTreatmentCenter?.officeType?.officeTypeName ??
        item?.reservation?.doctorTreatmentCenter?.office?.officeTypeName ??
        "";
      return typeText.includes(activeFilter === "آنلاین" ? "آنلاین" : "حضور");
    })
    .map((item) => ({
      id: item.id,
      profile: doctorIcon,
      name: `${item?.doctor?.doctorName ?? ""} ${
        item?.doctor?.doctorFamily ?? ""
      }`.trim(),
      skill: item?.doctor?.specialist?.name ?? "",
      loc:
        item?.reservation?.doctorTreatmentCenter?.office?.address ??
        item?.reservation?.doctorTreatmentCenter?.clinic?.address ??
        "",
      tel: item?.doctor?.mobile ?? "",
      type: "حضوری",
      date: `${formatJalaliDate(
        item?.turn?.reservation?.reservationDate
      )} ساعت ${item?.turn?.stime ?? ""}`,
      code: item.id,
      price: item?.reservation?.visitCost?.price
        ? `${Number(
            item.reservation.visitCost.price
          ).toLocaleString("en-US")} تومان`
        : "—",
    }));

  return (
    <div dir="rtl" className=" bg-[#F6FBFF] w-full">
      <Navbar />
      <UserPanel_PhoneTitle />

      <div className=" flex w-full">
        <UserPanelMenue />
        <div className=" lg:w-[82%] w-[90%] mx-auto flex flex-col gap-10 items-center pb-10">
          <div className=" p-2 gap-2 lg:px-10 lg:py-5 w-full lg:mb-0 mb-20  lg:w-[90%] flex flex-col  bg-white rounded-xl lg:gap-10 shadow-md border ">
            <div className=" border-b pb-2 lg:pb-5 w-full flex items-center gap-2 lg:gap-5">
              <h5 className=" text-sm lg:text-base">نوع نوبت:</h5>
              {VistitTypeFilters.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setActiveFilter(item.type)}
                    className={` flex justify-center text-sm lg:text-base lg:w-20 items-center p-2 gap-1 rounded-md ${
                      activeFilter === item.type
                        ? " bg-[#005DAD] text-white"
                        : " bg-[rgba(203,203,203,0.17)]"
                    }`}
                  >
                    {item.icon && (
                      <img
                        src={item.icon}
                        className=" lg:w-[24px] w-[20px]"
                        alt="icon"
                        width={24}
                      />
                    )}
                    {item.type}
                  </button>
                );
              })}
            </div>
            {isLoading && <SyncLoader color="#005DAD" />}
            {!isLoading && cards.length === 0 && (
              <h5 className=" text-center text-[#757575] py-10">
                نوبتی برای نمایش وجود ندارد
              </h5>
            )}
            <div className=" flex flex-col gap-2 lg:gap-5 items-center justify-center">
              {cards.map((item) => {
                return (
                  <div
                    className=" p-1 w-full lg:p-3 flex flex-col border lg:border-2 rounded-lg"
                    key={item.id}
                  >
                    <div className=" hidden lg:flex items-start justify-start lg:gap-5 lg:pb-5 border-b border-dashed">
                      <img
                        src={item.profile}
                        width={83}
                        alt="profile"
                        className=" rounded-full lg:w-[83px] w-[60px] border border-[#005DAD]"
                      />
                      <div className=" flex justify-between items-center w-full">
                        <div className=" flex gap-5 flex-col">
                          <div className=" flex flex-col justify-center">
                            <h5 className=" lg:text-base text-sm">
                              {item.name}
                            </h5>
                            <p className=" lg:text-sm text-xs text-[#757575]">
                              {item.skill}
                            </p>
                          </div>
                          <div className=" flex">
                            <h5 className=" lg:text-base text-sm">
                              محل ویزیت :
                            </h5>
                            <p className=" text-[#005DAD]">{item.loc}</p>
                          </div>
                          <div className=" flex">
                            <h5 className=" lg:text-base text-sm">شماره تماس:</h5>
                            <p className=" text-[#005DAD]">{item.tel}</p>
                          </div>
                        </div>
                        <div className=" hidden lg:flex gap-5 flex-col">
                          <div className=" flex items-center">
                            <h5>روش نوبت دهی : </h5>
                            <h5 className=" text-[#005DAD] flex justify-center items-center">
                              <img
                                src={hozoriIcon_blue}
                                width={24}
                                alt="icon"
                              />
                              {item.type}
                            </h5>
                          </div>
                          <div className=" flex">
                            <h5>تاریخ و ساعت :</h5>
                            <p className=" text-[#005DAD]">{item.date}</p>
                          </div>
                          <div className=" flex">
                            <h5>کد رهگیری:</h5>
                            <p className=" text-[#005DAD]">{item.code}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" lg:hidden flex flex-col items-start justify-start lg:gap-5 lg:pb-5 border-b border-dashed">
                      <div className=" flex w-full gap-2">
                        <img
                          src={item.profile}
                          width={83}
                          alt="profile"
                          className=" rounded-full lg:w-[83px] w-[60px] border border-[#005DAD]"
                        />
                        <div className=" flex flex-col justify-center">
                          <h5 className=" lg:text-base text-sm">{item.name}</h5>
                          <p className=" lg:text-sm text-xs text-[#757575]">
                            {item.skill}
                          </p>
                          <div className=" flex items-center">
                            <h5 className=" text-sm">شماره تماس:</h5>
                            <p className="text-xs text-[#005DAD]">{item.tel}</p>
                          </div>
                        </div>
                      </div>
                      <div className=" flex justify-between items-center w-full">
                        <div className=" flex gap-2 flex-col">
                          <div className=" flex items-start">
                            <h5 className=" whitespace-nowrap lg:text-base text-sm">
                              محل ویزیت :
                            </h5>
                            <p className=" text-xs  text-[#005DAD]">
                              {item.loc}
                            </p>
                          </div>
                          <div className=" flex">
                            <div className=" flex items-center">
                              <h5 className=" text-sm ">روش نوبت دهی : </h5>
                              <h5 className=" text-xs text-[#005DAD] flex justify-center items-center">
                                <img
                                  src={hozoriIcon_blue}
                                  width={20}
                                  alt="icon"
                                />
                                {item.type}
                              </h5>
                            </div>
                            <div className=" flex items-center">
                              <h5 className=" text-sm">کد رهگیری:</h5>
                              <p className=" text-xs text-[#005DAD]">
                                {item.code}
                              </p>
                            </div>
                          </div>
                          <div className=" flex items-center">
                            <h5 className=" text-sm">تاریخ و ساعت :</h5>
                            <p className=" text-xs text-[#005DAD]">
                              {item.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" hidden lg:flex pt-10 pb-3  justify-between pr-[100px] items-center">
                      <div className=" flex gap-5 items-center">
                        <div className=" flex">
                          <h5>پرداختی:</h5>
                          <h5 className=" text-[#005DAD]">{item.price}</h5>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedTurn(item);
                            setIsDeletingModal(true);
                          }}
                          className=" w-32 p-1 text-[#E62333F2] border border-[#E62333F2] rounded-lg bg-[rgba(230,35,51,0.1)]"
                        >
                          کنسل نوبت
                        </button>
                      </div>
                      <button className=" w-32 p-1 text-[#00BA00] border border-[#00BA00] rounded-lg bg-[rgba(183,240,183,0.55)]">
                        ثبت نظر
                      </button>
                    </div>
                    <div className=" lg:hidden py-2 flex items-center justify-between">
                      <div className=" flex">
                        <h5 className=" text-sm">پرداختی:</h5>
                        <h5 className="text-xs text-[#005DAD]">{item.price}</h5>
                      </div>
                      <div className=" flex justify-between items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedTurn(item);
                            setIsDeletingModal(true);
                          }}
                          className=" px-5 text-xs p-1 text-[#E62333F2] border border-[#E62333F2] rounded-lg bg-[rgba(230,35,51,0.1)]"
                        >
                          کنسل نوبت
                        </button>
                        <button className=" px-5 text-xs p-1 text-[#00BA00] border border-[#00BA00] rounded-lg bg-[rgba(183,240,183,0.55)]">
                          ثبت نظر
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isDeletingModal && selectedTurn && (
        <DeletingModal
          DeletingFn={delete_patient_reservation}
          id={selectedTurn.id}
          name={`نوبت ${selectedTurn.name}`}
          setList={(newList) => setTurns(newList)}
          list={turns}
          closeModal={() => setIsDeletingModal(false)}
        />
      )}
    </div>
  );
}

export default page;

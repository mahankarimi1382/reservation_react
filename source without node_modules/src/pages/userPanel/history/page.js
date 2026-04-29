import { SelectFilter } from "../../../components/Inputs/Input";
import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React from "react";
import hozoriIcon from "../../../assets/Pics/people.png";
import onlineIcon from "../../../assets/Pics/monitor-mobbile-black.png";
import hozoriIcon_blue from "../../../assets/Pics/hozori-blue.png";
import bahram from "../../../assets/Pics/bahramMirzayi.png";
import { UserPanel_PhoneTitle } from "../dashboard/page";
function page() {
  const cards = [
    {
      id: 1,
      profile: bahram,
      name: "بهرام میرزایی",
      skill: "متخصص مغز و اعصاب",
      loc: "گاندی شمالی برادران شریفی پلاک 55 واحد 11",
      tel: "02122877889",
      type: "حضوری",
      date: "1403/06/28 ساعت 14:30",
      code: "16120784",
      price: "50,000 تومان",
    },
    {
      id: 2,
      profile: bahram,
      name: "بهرام میرزایی",
      skill: "متخصص مغز و اعصاب",
      loc: "گاندی شمالی برادران شریفی پلاک 55 واحد 11",
      tel: "02122877889",
      type: "حضوری",
      date: "1403/06/28 ساعت 14:30",
      code: "16120784",
      price: "50,000 تومان",
    },
    {
      id: 3,
      profile: bahram,
      name: "بهرام میرزایی",
      skill: "متخصص مغز و اعصاب",
      loc: "گاندی شمالی برادران شریفی پلاک 55 واحد 11",
      tel: "02122877889",
      type: "حضوری",
      date: "1403/06/28 ساعت 14:30",
      code: "16120784",
      price: "50,000 تومان",
    },
    {
      id: 4,
      profile: bahram,
      name: "بهرام میرزایی",
      skill: "متخصص مغز و اعصاب",
      loc: "گاندی شمالی برادران شریفی پلاک 55 واحد 11",
      tel: "02122877889",
      type: "حضوری",
      date: "1403/06/28 ساعت 14:30",
      code: "16120784",
      price: "50,000 تومان",
    },
  ];
  const VistitTypeFilters = [
    { id: 1, type: "همه", isSelect: true, icon: null },
    { id: 1, type: "آنلاین", isSelect: true, icon: onlineIcon },
    { id: 1, type: "حضوری", isSelect: true, icon: hozoriIcon },
  ];
  return (
    <div dir="rtl" className=" bg-[#F6FBFF] w-full">
      <Navbar />
      <UserPanel_PhoneTitle />

      <div className=" flex w-full">
        <UserPanelMenue />
        <div className=" lg:w-[82%] w-[90%] mx-auto flex flex-col gap-10 items-center pb-10">
          {/* <div className=" w-[90%] flex justify-between">
            <DatePickerComponent title="از تاریخ" />
            <DatePickerComponent title="تا تاریخ" />
            <SelectFilter title="نام پزشک" />
            <SelectFilter title="محل ویزیت" />
            <SelectFilter title="تخصص" />
          </div> */}
          <div className=" p-2 gap-2 lg:px-10 lg:py-5 w-full lg:mb-0 mb-20  lg:w-[90%] flex flex-col  bg-white rounded-xl lg:gap-10 shadow-md border ">
            <div className=" border-b pb-2 lg:pb-5 w-full flex items-center gap-2 lg:gap-5">
              <h5 className=" text-sm lg:text-base">نوع نوبت:</h5>
              {VistitTypeFilters.map((item) => {
                return (
                  <button
                    key={item.id}
                    className=" flex justify-center text-sm lg:text-base lg:w-20 items-center p-2 gap-1 bg-[rgba(203,203,203,0.17)] rounded-md"
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
                            <h5>شماره تماس:</h5>
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
                              حضوری
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
                                حضوری
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
                      <div className=" flex">
                        <h5>پرداختی:</h5>
                        <h5 className=" text-[#005DAD]">{item.price}</h5>
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
                      <div className=" flex justify-between items-center">
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
    </div>
  );
}

export default page;

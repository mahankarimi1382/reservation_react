import React, { useEffect, useState } from "react";
import karenLogo from "../../../assets/Pics/karenLogo.png";
import { CiBookmark } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import doctorIcon from "../../../assets/Pics/doctor-icon.jpg";

import { BsTelephone } from "react-icons/bs";
import taminejtemaei from "../../../assets/Pics/taminejtemaei.png";
import gooshiPezeshki from "../../../assets/Pics/gooshiPezeshki.png";
import { IoLocationOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import star from "../../../assets/Pics/star.png";
import hospital from "../../../assets/Pics/hospital.png";
import monitor from "../../../assets/Pics/monitor-mobbile.png";
import MapComponent from "../../../components/MapComponent";
import { AiFillLike } from "react-icons/ai";

import {
  EmtyReservButt,
  MatabShowButt,
  SeeDoctorNazaratButt,
} from "../../../components/Buttons/Button";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowRoundBack } from "react-icons/io";
import { Checkbox, Pagination, PaginationItem } from "@mui/material";
import { RateCounter } from "../../../utils/RateCounter";
import { useLocation } from "react-router-dom";

import { read_DoctorTreatmentCenterByNameSSR } from "../../../api/ApiCalling";
import { Phone_specialFilter_medicalcenter_dropDown } from "../../../components/Inputs/Input";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function MedicalCenterProfile() {
  const handleShare = async () => {
    if (navigator.share) {
      // چک می‌کنیم که مرورگر Web Share API را پشتیبانی می‌کند
      try {
        await navigator.share({
          title: "عنوان صفحه",
          text: "متن توضیحات صفحه",
          url: window.location.href, // لینک فعلی صفحه
        });
        console.log("اشتراک‌گذاری موفقیت‌آمیز بود!");
      } catch (error) {
        console.error("خطایی در اشتراک‌گذاری رخ داد:", error);
      }
    } else {
      console.error("مرورگر شما قابلیت اشتراک‌گذاری را پشتیبانی نمی‌کند.");
    }
  };
  const [position, setPosition] = useState([51.4055941, 35.758954]);
  const [doctors, setDoctors] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [filtredDocs, setFiltredDocs] = useState([]);
  const [isDropDown, setIsDropDown] = useState(false);
  console.log(doctors);
  const [medical, setMedical] = useState("");
  const [specialties, setSpecialties] = useState([]);
  console.log(specialties);
  console.log(medical);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const pathName = location.pathname;
  const pathParts = pathName.split("/").filter(Boolean);
  console.log(pathParts[1]);
  const medicalSsrName = decodeURIComponent(pathParts[1]);
  const getMedicalCenter = async () => {
    let name = medicalSsrName;
    const result = await read_DoctorTreatmentCenterByNameSSR(name);
    if (result) {
      console.log(result);
      setMedical(result.data);
      setPosition([result.data.centerLat, result.data.centerLon]);
      setDoctors(result.data.doctors);
      setFiltredDocs(result.data.doctors);
      setSpecialties(result.data.specialists);
      setLoading(false);
    }
  };
  useEffect(() => {
    getMedicalCenter();
  }, []);

  console.log(position);
  const toPersianDigits = (str) =>
    str.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  return (
    <div className="flex pt-10 justify-center bg-[#f5f5f5]">
      <div className=" flex flex-col gap-10 w-[90%]">
        {/* <Phone_specialFilter_medicalcenter_dropDown /> */}
        <div className="flex flex-col gap-2">
          <div className=" lg:hidden bg-white  p-2 w-[100%] border border-[#005DAD] rounded-2xl">
            <div className=" w-full justify-between flex items-start text-sm ">
              <span className=" w-1/3 text-[#005DAD] flex items-center ">
                <CiBookmark className=" text-2xl" />
                ذخیره{" "}
              </span>
              <img
                src={karenLogo}
                alt="logo"
                width={70}
                className=" w-1/3 rounded-full border border-[#005DAD]"
              />
              <span className=" w-1/3 whitespace-nowrap text-[#005DAD] flex items-center ">
                <CiShare2 className=" text-2xl" />
                اشتراک گذاری
              </span>
            </div>
            <div className=" flex flex-col">
              <h2 className=" text-lg text-center w-full text-[#005DAD]">
                {medical.centerName}
              </h2>
              <p>توضیحی برای نمایش وجود ندارد</p>
            </div>
          </div>
          <div className=" w-full  border p-2 lg:hidden  border-[#005DAD] text-sm flex flex-col justify-center rounded-2xl">
            <h2 className=" text-lg text-[#005DAD]">آدرس </h2>
            <div className=" flex items-center">
              <IoLocationOutline className=" text-[#005DAD] text-xl" />
              <h5>{medical.centerAddress}</h5>
            </div>
            <div className=" w-full flex-col gap-2 h-40 flex justify-center items-center">
              {medical && (
                <MapComponent
                  position={[medical.centerLat, medical.centerLon]}
                />
              )}
              <div className=" w-full">
                <div className=" flex  items-center gap-2">
                  <BsTelephone className=" text-[#005DAD] text-lg" />
                  <h2>شماره تماس: 02122133124 _ 02122987654</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" hidden w-full lg:flex justify-center gap-8 items-center flex-col rounded-xl bg-white h-[620px]">
          <div className=" w-[90%] px-10 py-5 h-[208px] border border-[#005DAD] rounded-2xl">
            <div className=" w-full flex -mb-5 justify-end">
              <h2 className=" flex items-center gap-2 text-[16x] ">
                <CiBookmark className=" text-2xl" />
                ذخیره
                <span className=" text-2xl text-[#757575]">|</span>
                <span
                  onClick={handleShare}
                  className=" cursor-pointer   text-[#005DAD] flex items-center "
                >
                  <CiShare2 className=" text-2xl" />
                  اشتراک گذاری
                </span>
              </h2>
            </div>
            <div className=" flex items-center justify-start">
              <img
                src={karenLogo}
                alt="logo"
                width={140}
                className=" rounded-full border border-[#005DAD]"
              />
              <div className=" flex flex-col gap-8 px-5 ">
                <h2 className=" text-2xl text-[#005DAD]">
                  {medical.centerName}
                </h2>
                <p>توضیحی برای نمایش وجود ندارد</p>
              </div>
            </div>
          </div>
          <div className=" flex w-[90%] gap-5">
            <div className=" w-[40%] justify-between flex flex-col">
              <div className=" w-full h-[151px] justify-center gap-5 px-5 border flex flex-col border-[#005DAD] rounded-2xl">
                <h2 className=" text-xl text-[#005DAD]">اطلاعات تماس</h2>
                <div className=" flex  items-center gap-2">
                  <BsTelephone className=" text-[#005DAD] text-lg" />
                  <h2>شماره تماس: 02122133124 _ 02122987654</h2>
                </div>
                <div className=" flex  items-center gap-2">
                  <BsTelephone className=" text-[#005DAD] text-lg" />
                  <h2>نوبت دهی تلفنی 24 ساعته : ندارد</h2>
                </div>
              </div>
              <div className=" w-full h-[151px] rounded-2xl">
                <div className=" w-full h-[151px] justify-center gap-5 px-5 border flex flex-col border-[#005DAD] rounded-2xl">
                  <h2 className=" text-xl text-[#005DAD]">
                    بیمه های طرف قرارداد کلینیک کارن
                  </h2>
                  <div className=" lg:flex hidden  items-center gap-2">
                    <img src={taminejtemaei} width={107} alt="icon" />
                    <img src={taminejtemaei} width={107} alt="icon" />
                    <img src={taminejtemaei} width={107} alt="icon" />
                    <img src={taminejtemaei} width={107} alt="icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[60%] h-[327px] border gap-8 px-5 border-[#005DAD] flex flex-col justify-center rounded-2xl">
              <h2 className=" text-xl text-[#005DAD]">آدرس </h2>
              <div className=" flex items-center">
                <IoLocationOutline className=" text-[#005DAD] text-xl" />
                <h5>{medical.centerAddress}</h5>
              </div>
              <div className=" w-full h-40 flex justify-center items-center">
                {/* <MapTest position={position} setPosition={setPosition} /> */}
                {medical && (
                  <MapComponent
                    position={[medical.centerLat, medical.centerLon]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full flex gap-20">
          <div className=" hidden lg:block w-[40%] bg-white rounded-2xl py-5 h-[579px]">
            <h2 className=" pb-2 px-5 flex font-semibold items-center">
              <img width={30} src={gooshiPezeshki} alt="icon" />
              تخصص ها
            </h2>
            <div className=" w-full justify-center items-center gap-5 flex flex-col">
              {/* <input
                className=" px-2 outline-none w-[90%] h-[54px] rounded-xl border shadow-lg"
                placeholder="لطفا تخصص مورد نظر خود را جستجو کنید"
              /> */}

              {specialties.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="px-2 outline-none items-center gap-3 flex w-[90%] h-[54px] shadow-md rounded-xl border"
                  >
                    <Checkbox
                      checked={selectedId === item.id}
                      onChange={(e) => {
                        let isCheked = e.target.checked;
                        if (isCheked) {
                          setSelectedId(item.id);

                          let filterdDoctors = doctors.filter(
                            (item2) => item2.specialist.id == item.id
                          );
                          console.log(filterdDoctors);
                          setFiltredDocs(filterdDoctors);
                        } else {
                          setSelectedId(null);
                          setFiltredDocs(doctors);
                        }
                      }}
                    />
                    <h2>{item.name}</h2>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" w-full lg:w-2/3 lg:mb-10 flex flex-col gap-4 lg:gap-5">
            <div className=" rounded-2xl px-3 items-center justify-center gap-1 flex h-[60px] w-[100%] bg-white ">
              <CiSearch className=" text-[#919191] text-3xl" />

              <input
                className=" text-sm outline-none h-full w-full"
                placeholder="جستجو پزشک،تخصص..."
              />
            </div>
            <div className=" lg:hidden flex flex-col gap-3">
              <div
                onClick={() => setIsDropDown(!isDropDown)}
                className=" px-2 border bg-white flex justify-between items-center  rounded-xl w-full"
              >
                <div className=" flex">
                  <img src={gooshiPezeshki} alt="icon" width={16} />
                  <h5 className=" text-[#005DAD]">تخصص ها</h5>
                </div>
                <IoIosArrowDown
                  className={` ${
                    isDropDown && "rotate-180"
                  } transition-all   duration-300 text-xl text-[#858585]`}
                />
              </div>
              <div className="bg-white shadow-lg rounded-xl">
                {isDropDown ? (
                  <div className="  mt-6 mr-2  p-2 transition-all duration-500 w-[95%] h-52 overflow-auto customScroll flex flex-col">
                    <div className=" hover:text-[#005dad]  p-1 border-b mx-2 flex items-center">
                      <button onClick={() => setFiltredDocs(doctors)}>
                        همه
                      </button>
                    </div>
                    {specialties.length != 0 ? (
                      specialties.map((item) => {
                        return (
                          <div
                            className=" hover:text-[#005dad]  p-1 border-b mx-2 flex items-center"
                            key={item.id}
                          >
                            <button
                              onClick={() => {
                                setSelectedId(item.id);
                                let filterdDoctors = doctors.filter(
                                  (item2) => item2.specialist.id == item.id
                                );
                                setFiltredDocs(filterdDoctors);
                              }}
                            >
                              {item.name}
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className=" w-full flex justify-center items-center">
                        نتیجه ای یافت نشد
                      </div>
                    )}
                  </div>
                ) : (
                  <div className=" transition-all mr-2 duration-300  w-[95%] h-0 overflow-auto customScroll flex flex-col">
                    {specialties.map((item) => {
                      return (
                        <div
                          className=" border-b mx-2 p-1 flex items-center"
                          key={item.id}
                        >
                          <h5> {item.name}</h5>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className=" w-full justify-center items-center flex flex-col gap-10">
              {/* <div className=" w-full">
                {filtredBoxes.map((item) => {
                  return (
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      key={item.id}
                      className="whitespace-nowrap overflow-hidden text-ellipsis min-w-[100px] h-[40px] m-[5px] px-[10px]"
                    >
                      {item.specialties}
                    </button>
                  );
                })}
              </div> */}
              {/* {isSerchDoctorLoading && <LoadingComponent />} */}
              {filtredDocs.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl xl:px-10 px-2 lg:px-5 lg:gap-6 gap-2 flex flex-col w-full bg-white text-xs lg:text-base pb-2 lg:min-h-[400px]"
                  >
                    <div className="flex justify-between lg:items-center items-start border-[#CBCBCB] border-b py-3 lg:py-7">
                      <div className="lg:w-1/2 flex items-start lg:items-center justify-start gap-2 lg:gap-5">
                        <img
                          width={90}
                          height={90}
                          className="w-[60px] h-[60px] lg:w-[90px] lg:h-[90px] border-2 border-[#005DAD] rounded-full"
                          src={doctorIcon}
                          alt="doctor-prof"
                        />
                        <div className="flex flex-col gap-2 lg:gap-5">
                          <h2 className="text-sm lg:text-[22px]">
                            {item.doctorName} {item.doctorFamily}
                          </h2>
                          <h2 className="text-[12px] lg:text-base text-[#757575]">
                            {item.specialist.name}
                          </h2>
                        </div>
                      </div>
                      <div className="flex flex-col items-end lg:items-start justify-center gap-2">
                        <div className="flex gap-1">
                          <RateCounter rate={5} width={22} />
                        </div>
                        <h2 className="rounded flex text-xs lg:text-base items-center justify-center gap-1 text-[#1F7168]">
                          <AiFillLike className="lg:text-lg" />
                          {item.recomend}
                        </h2>
                        <SeeDoctorNazaratButt />
                      </div>
                    </div>
                    <h2 className="text-sm lg:text-lg">
                      خدمات :
                      <span className="text-[#7E7E7E]">{item.skills}</span>
                    </h2>
                    <div className="text-xs gap-1 flex lg:gap-5 lg:text-lg">
                      <h2>روش نوبت دهی :</h2>
                      <h2 className="flex gap-1 lg:gap-2">
                        <img
                          className="lg:w-[24px] w-[20px]"
                          width={24}
                          src={monitor}
                          alt="monitor-icon"
                        />
                        ویزیت آنلاین
                      </h2>
                      <h2 className="flex gap-1 lg:gap-2">
                        <img
                          width={24}
                          className="lg:w-[24px] w-[20px]"
                          src={hospital}
                          alt="monitor-icon"
                        />
                        ویزیت حضوری
                      </h2>
                    </div>
                    <div className="w-full flex">
                      <MatabShowButt items={item.doctorTreatmentCenters} />
                    </div>
                    <div className="mt-5 lg:-mt-3 flex justify-between">
                      <EmtyReservButt docDetail={item} />
                      <Link
                        to={`/doctors/${item.id}`}
                        className="flex justify-center p-2 px-4 rounded-md text-white items-center bg-[#005DAD]"
                      >
                        نوبت بگیرید
                        <IoIosArrowRoundBack className="text-2xl" />
                      </Link>
                    </div>
                  </div>
                );
              })}

              <Pagination
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontFamily: "mainfont",
                  },
                }}
                size="small"
                // onChange={handleChange}
                // page={currentPageDoctorSearch}
                // count={totalPages}
                color="primary"
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: FaArrowRight, next: FaArrowLeft }}
                    {...item}
                    // فارسی‌سازی عدد صفحه
                    page={item.page ? toPersianDigits(item.page) : item.page}
                    // گزینه‌های "اول" و "آخر" رو دست‌نخورده بذار
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalCenterProfile;

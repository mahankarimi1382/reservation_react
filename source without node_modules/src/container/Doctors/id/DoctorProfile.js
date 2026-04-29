import React, { useEffect, useState, useMemo } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import doctorProfileImg from "../../../assets/Pics/user-profile.png";
import { IoLocationOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import map from "../../../assets/Pics/map.png";
import { AiFillLike } from "react-icons/ai";
import star from "../../../assets/Pics/star.png";
import personFrame from "../../../assets/Pics/frame.png";
import doctorSkillFrame from "../../../assets/Pics/doctor-skill-frame.png";
import experinceFrame from "../../../assets/Pics/experience-frame.png";
import imanKhosravi from "../../../assets/Pics/ImanKhosravi.png";
import smmile from "../../../assets/Pics/Smile vector.png";
import clock from "../../../assets/Pics/clock.png";
import maqalepic from "../../../assets/Pics/ocdMaqale.png";
import bookIcon from "../../../assets/Pics/book.png";
import AcordinDoctorpanel from "../../../components/AcordinDoctorpanel";
import VisitSection from "./VisitSection";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import {
  MatabShowButt,
  SabteNazarButton,
} from "../../../components/Buttons/Button";
import {
  follow_doctor_profile,
  get_doctor_profile_by_id,
  read_doctor_Comment,
  read_DoctorByNameSSR,
  read_DoctorComents,
} from "../../../api/ApiCalling";
import {
  doctorProfileStore,
  reservationStore,
  smeIdStorage,
} from "../../../store/Store";
import LoadingComponent from "../../../components/LoadingComponent";
import { RateCounter } from "../../../utils/RateCounter";
import doctorIcon from "../../../assets/Pics/doctor-icon.jpg";
import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

import { HiOutlineFaceSmile } from "react-icons/hi2";
import { CgSmileSad } from "react-icons/cg";

function DoctorProfile() {
  const [coments, setComents] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState();
  const [doctorId, setDoctorId] = useState(null);
  const [position, setPosition] = useState(null);
  const [doctorDesc, setDoctorDesc] = useState("");
  const [doctorTreatmentCenters, setDoctorTreatmentCenters] = useState([]);
  const { setDoctorSpecialties } = reservationStore();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const pathName = location.pathname;
  const pathParts = pathName.split("/").filter(Boolean);
  const doctorSsrName = decodeURIComponent(pathParts[1]);

  // پیجینگ کامنت‌ها
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // محاسبه کامنت‌های صفحه فعلی
  const currentComments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return coments.slice(startIndex, endIndex);
  }, [coments, currentPage, itemsPerPage]);

  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(coments.length / itemsPerPage);

  // تابع تغییر صفحه
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // اسکرول به بخش کامنت‌ها
    const commentsSection = document.getElementById("comments-section");
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log(coments);
  console.log(doctorDetails);
  console.log(doctorTreatmentCenters);
  console.log(doctorDetails);

  const getDoctor = async () => {
    let name = doctorSsrName;
    const result = await read_DoctorByNameSSR(name);
    if (result) {
      console.log(result);
      setDoctorDetails(result.data);
      setIsLoading(false);
      setDoctorId(result.data.id);
      setDoctorTreatmentCenters(
        result.data.smeProfile.doctors[0].doctorTreatmentCenters
      );
      const coments = await read_DoctorComents(result.data.id);
      if (coments) {
        setComents(coments.list);
      }
      console.log(coments);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "عنوان صفحه",
          text: "متن توضیحات صفحه",
          url: window.location.href,
        });
        console.log("اشتراک‌گذاری موفقیت‌آمیز بود!");
      } catch (error) {
        console.error("خطایی در اشتراک‌گذاری رخ داد:", error);
      }
    } else {
      console.error("مرورگر شما قابلیت اشتراک‌گذاری را پشتیبانی نمی‌کند.");
    }
  };

  const { setDoctorNezamCode } = reservationStore();
  const { smeId } = smeIdStorage();

  const MapComponent = lazy(() => import("../../../components/MapComponent"));

  const FollowDoctor = () => {
    setIsLoading(true);
    let data = {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        smeProfileId: smeId,
      },
      followProfileId: doctorId,
      myProfileId: smeId,
      followProfileLogo: "string",
      followProfileName: "string",
    };
    follow_doctor_profile(data, setIsLoading);
  };

  console.log(doctorId);

  const imgFN = (img) => {
    console.log(img);
    if (img == "string") {
      return doctorIcon.src;
    } else {
      return img;
    }
  };

  const get_doctor_comments = async () => {
    console.log(doctorId);
    const result = await read_doctor_Comment(doctorId);
    if (result) {
      console.log(result);
    }
  };

  const usersExperineces = [
    {
      id: 1,
      name: "ایمان خسروی",
      date: "1402/10/12",
      rate: 5,
      visit: "ویزیت شده در مطب ونک",
      caption: "تشخیص دکتر و تجویز دارو فوق العاده هستش سپاس فراوان",
      time: 15,
    },
    {
      id: 2,
      name: "ایمان خسروی",
      date: "1402/10/12",
      rate: 5,
      visit: "ویزیت شده در مطب ونک",
      caption: "تشخیص دکتر و تجویز دارو فوق العاده هستش سپاس فراوان",
      time: 15,
    },
  ];

  const maqalat = [
    {
      id: 1,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 2,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 3,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 4,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 5,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 6,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 7,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 8,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 9,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 10,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 11,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 12,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
    {
      id: 13,
      topic: "اختلال وسواس فکری چیست؟",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و.....",
    },
  ];

  return (
    <div className="pb-20 min-h-[2150px] flex flex-col w-full justify-between items-center bg-[#f5f5f5]">
      {isLoading && <LoadingComponent />}
      <div className="pt-10 min-h-[1582px] flex-col lg:flex-row flex w-full items-center lg:items-start lg:justify-between lg:px-20">
        <div className="flex flex-col items-center w-[95%] lg:w-[57%] bg-white rounded-xl">
          <div className="w-[90%] flex py-10 flex-col gap-4 lg:gap-10">
            <div className="w-full px-1 justify-between lg:px-4 xl:gap-4 text-sm xl:text-base flex items-center bg-white shadow-[0px_3px_6px_2px_rgba(0,_0,_0,_0.1)] h-[111px] lg:h-[150px] rounded-2xl">
              <div className="flex gap-2">
                <img
                  width={113}
                  className="w-[50px] h-[50px] object-cover object-center lg:w-[90px] lg:h-[90px] xl:w-[113px] border border-[#005DAD] rounded-full xl:h-[113px]"
                  alt="doctor-profile"
                  src={
                    doctorDetails
                      ? imgFN(doctorDetails.docInstaLink)
                      : doctorIcon.src
                  }
                />

                <div className="flex whitespace-nowrap flex-col justify-center gap-2">
                  <h2 className="">
                    {doctorDetails && doctorDetails.doctorName}{" "}
                    {doctorDetails && doctorDetails.doctorFamily}
                  </h2>
                  <p className="text-xs lg:text-[14px] text-[#757575]">
                    {doctorDetails &&
                      doctorDetails.smeProfile.doctors[0].specialist.name}
                  </p>
                  <p className="flex items-center gap-1">
                    <IoLocationOutline />
                    تهران
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center gap-2">
                <div className="flex items-center lg:gap-2 gap-1 text-xs lg:text-[16x]">
                  <CiBookmark
                    onClick={() => FollowDoctor()}
                    className="text-2xl"
                  />
                  <h5 className="hidden lg:block">ذخیره</h5>
                  <span className="text-2xl text-[#757575]">|</span>
                  <span
                    onClick={handleShare}
                    className="cursor-pointer text-[#005DAD] lg:text-base text-xs flex items-center"
                  >
                    <CiShare2 className="text-2xl" />
                    <h5 className="hidden lg:block"> اشتراک گذاری</h5>
                  </span>
                </div>
                <p className="rounded flex justify-center p-1 lg:bg-[#F0F0F0] text-[#1F7168] text-[12px] items-center">
                  <AiFillLike className="text-xs lg:text-xl" />
                  97% <span className="hidden lg:flex">پیشنهاد کابران</span>
                </p>
                <div className="flex lg:hidden">
                  <RateCounter rate={5} width={16} />
                </div>
                <p className="lg:flex hidden items-center gap-1">
                  <img width={22} src={star} alt="star" />
                  4.5/5 از (نظر 320)
                </p>
              </div>
            </div>
            <div className="w-full flex lg:hidden">
              <VisitSection id={doctorId} />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="lg:text-[16px] flex items-center">
                <img width={24} src={personFrame} alt="person-frame" />
                درباره پزشک
              </h2>
              <p className="text-justify lg:text-base text-sm text-[#757575]">
                {doctorDetails && doctorDetails.desc}
              </p>
            </div>
            <div className="flex items-center border-y-2 py-5 gap-1">
              <img width={28} src={doctorSkillFrame} alt="" />
              <h2>تخصص پزشک: </h2>
              <p className="text-[#7E7E7E]">
                {doctorDetails &&
                  doctorDetails.smeProfile.doctors[0].specialist.name}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 border-b-2 pb-10">
              <div className="flex gap-4 w-full">
                <MatabShowButt
                  setPosition={setPosition}
                  items={doctorTreatmentCenters}
                />
              </div>
              {position && (
                <div className="w-full h-40 flex justify-center items-center">
                  <Suspense fallback={<div>Loading map...</div>}>
                    <MapComponent position={position} />
                  </Suspense>{" "}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center">
                <img width={28} src={experinceFrame} alt="" />
                <h2>تجربیات کابران: </h2>
              </div>
              <p className="text-sm lg:text-base text-[#7E7E7E]">
                در ادامه می‌توانید تجربه مراجعه‌ی کاربران دیگر به دکتر{" "}
                {doctorDetails && doctorDetails.doctorName}{" "}
                {doctorDetails && doctorDetails.doctorFamily} را بخوانید.در
                صورتی که شما هم از بیماران دکتر{" "}
                {doctorDetails && doctorDetails.doctorName}{" "}
                {doctorDetails && doctorDetails.doctorFamily} بوده‌اید می‌توانید
                نظر خود را ثبت کنید.
              </p>
              <div className="w-full flex items-end justify-end">
                <SabteNazarButton doctorDetails={doctorDetails} />
              </div>
            </div>

            {/* بخش کامنت‌ها با پیجینگ */}
            <div id="comments-section" className="w-full">
              {/* لیست کامنت‌های صفحه فعلی */}
              <div className="flex justify-center flex-col gap-2 lg:gap-8">
                {currentComments.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="rounded-xl flex-col flex lg:py-2 items-center w-full lg:h-[208px] shadow-[0_2px_15px_-5px_rgba(0,0,0,0.3)]"
                    >
                      <div className="flex w-full flex-col lg:gap-2 xl:gap-5">
                        <div className="flex justify-between px-2 xl:px-10 items-center">
                          <div className="gap-2 flex xl:gap-10 items-center">
                            <img
                              src={imanKhosravi}
                              alt="userpic"
                              className="w-[44px] lg:w-[80px]"
                              width={80}
                            />
                            <div className="lg:w-72 flex lg:gap-4 gap-2 flex-col">
                              <h2 className="lg:text-[20px]">
                                کاربر دکتر رزرو
                              </h2>
                              <p className="text-[14px] text-[#757575]">
                                {item.commentDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex lg:items-start items-end gap-4 flex-col">
                            <div className="flex gap-1 lg:gap-2">
                              {Array.from({ length: item.likeNumber }).map(
                                (_, index) => {
                                  return (
                                    <div className="" key={index}>
                                      <img
                                        className="w-[12px] lg:w-[24px]"
                                        width={24}
                                        alt=""
                                        src={star}
                                      />
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="px-2 text-xs lg:text-base xl:px-10 text-[#757575]">
                          {item.desc}
                        </p>
                        <div className="px-2 lg:px-0 py-1 border-t lg:py-5 lg:mx-4 xl:mx-10 flex justify-between">
                          {item.isSuggest ? (
                            <h2 className="text-[#005DAD] text-[10px] lg:text-base flex items-center gap-1">
                              <HiOutlineFaceSmile />
                              این پزشک را پیشنهاد می‌کنم
                            </h2>
                          ) : (
                            <h2 className="text-red-500 text-[10px] lg:text-base flex items-center gap-1">
                              <CgSmileSad />
                              این پزشک را پیشنهاد نمیکنم
                            </h2>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* کامپوننت پیجینگ - فقط نمایش داده می‌شود اگر بیش از یک صفحه وجود داشته باشد */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-2">
                  {/* دکمه صفحه قبل */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
                      currentPage === 1
                        ? "border-gray-300 text-gray-300 cursor-not-allowed"
                        : "border-[#005DAD] text-[#005DAD] hover:bg-[#005DAD] hover:text-white transition-colors"
                    }`}
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>

                  {/* شماره صفحات */}
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                            currentPage === pageNumber
                              ? "bg-[#005DAD] text-white border-[#005DAD]"
                              : "border-gray-300 text-gray-700 hover:border-[#005DAD] hover:text-[#005DAD]"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  {/* دکمه صفحه بعد */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
                      currentPage === totalPages
                        ? "border-gray-300 text-gray-300 cursor-not-allowed"
                        : "border-[#005DAD] text-[#005DAD] hover:bg-[#005DAD] hover:text-white transition-colors"
                    }`}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* نمایش اطلاعات صفحه‌بندی */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <p className="text-sm text-gray-600">
                    نمایش {(currentPage - 1) * itemsPerPage + 1} تا{" "}
                    {Math.min(currentPage * itemsPerPage, coments.length)} از{" "}
                    {coments.length} کامنت
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-[41%] gap-5 mb-10 flex flex-col">
          <div className="hidden w-full lg:flex">
            <VisitSection id={doctorId} />
          </div>
        </div>
      </div>
      <div className="w-[90%] bg-white flex items-center flex-col rounded-xl min-h-[507px]">
        <div className="flex flex-col gap-10 py-10 justify-center w-[90%]">
          <h2 className="text-[26px] flex items-center gap-2">
            <img width={32} src={bookIcon} alt="book-icon" />
            راهنمای نوبت گیری از دکتر بهرام میرزایی
          </h2>
          <AcordinDoctorpanel />
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;

import React from "react";
import karenLogo from "../../assets/Pics/karenLogo.png";
import star from "../../assets/Pics/star.png";
import hospital from "../../assets/Pics/hospital.png";
import monitor from "../../assets/Pics/monitor-mobbile.png";
import userTag from "../../assets/Pics/user-tag.png";
import favoriteChart from "../../assets/Pics/favorite-chart.png";

import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

import { Filtering_MedicalCenters_Store } from "../../store/Store";
import { RateCounter } from "../../utils/RateCounter";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function AllMedicalCenters({ totalPages, medicals, isSerchMedicalLoading }) {
  const { currentPageMedicalSearch, setCurrentPageMedicalSearch } =
    Filtering_MedicalCenters_Store();

  const navigate = useNavigate();

  const handleChange = (event, value) => {
    setCurrentPageMedicalSearch(value);
  };

  const toPersianDigits = (str) =>
    str.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);

  return (
    <div className="w-[90%] lg:w-full justify-center items-center flex flex-col gap-2 lg:gap-10">
      {medicals.length !== 0
        ? medicals.map((item) => {
            return (
              <div
                key={item.id}
                className="lg:w-[810px] w-full lg:h-[308px] justify-center lg:gap-5 gap-2 p-1 lg:px-5 rounded-xl flex flex-col bg-white"
              >
                <div className="inline lg:flex lg:items-center items-start">
                  <div className="flex gap-2 lg:gap-0">
                    <img
                      onClick={() =>
                        navigate(`/medical-centers/${item.name}`)
                      }
                      src={karenLogo}
                      className="cursor-pointer w-[55px] lg:w-[154px]"
                      alt="logo"
                      width={154}
                    />

                    <div className="lg:hidden w-full gap-2 flex flex-col">
                      <h2
                        onClick={() =>
                          navigate(`/medical-centers/${item.name}`)
                        }
                        className="cursor-pointer lg:text-xl"
                      >
                        {item.name}
                      </h2>

                      <RateCounter rate={5} width={18} />
                    </div>
                  </div>

                  <div className="w-full lg:gap-6 pr-2 flex flex-col gap-2">
                    <div className="hidden w-full lg:flex justify-between">
                      <h2 className="lg:text-xl">{item.name}</h2>

                      <RateCounter rate={5} width={18} />
                    </div>

                    <div className="flex lg:gap-5 gap-1 text-sm lg:text-base">
                      <h2>روش نوبت دهی :</h2>

                      <h2 className="flex lg:gap-2 gap-1 lg:text-base text-xs font-semibold">
                        <img
                          width={24}
                          className="w-[16px] lg:w-[24px]"
                          src={monitor}
                          alt="monitor-icon"
                        />
                        ویزیت آنلاین
                      </h2>

                      <h2 className="flex lg:gap-2 gap-1 lg:text-base text-xs font-semibold">
                        <img
                          className="w-[16px] lg:w-[24px]"
                          width={24}
                          src={hospital}
                          alt="hospital-icon"
                        />
                        ویزیت حضوری
                      </h2>
                    </div>

                    <h2 className="flex items-center lg:text-base text-sm">
                      <IoLocationOutline className="text-xl text-[#005DAD]" />
                      آدرس: {item.address}
                    </h2>

                    <div className="flex gap-5">
                      <h2 className="lg:text-base text-sm px-2 flex items-center lg:gap-2 p-1 rounded-full bg-[rgba(69,199,255,0.23)]">
                        <img src={favoriteChart} alt="icon" width={24} />
                        {item.specialistCount}
                        تخصص
                      </h2>

                      <h2 className="lg:text-base text-sm px-2 flex items-center lg:gap-2 p-1 rounded-full bg-[#FBEDD7]">
                        <img src={userTag} alt="icon" width={24} />
                        {item.doctorsCount}
                        دکتر عضو
                      </h2>
                    </div>
                  </div>
                </div>

                <hr className="mx-5" />

                <div className="w-full justify-end flex">
                  <Link
                    to={`/medical-centers/${item.name}`}
                    className="text-white flex rounded-xl lg:text-base text-sm justify-center items-center bg-[#005DAD] p-1 lg:p-2"
                  >
                    نوبت بگیرید
                    <IoIosArrowRoundBack className="text-2xl" />
                  </Link>
                </div>
              </div>
            );
          })
        : !isSerchMedicalLoading && "نتیجه ای یافت نشد"}

      <Pagination
        size="small"
        onChange={handleChange}
        page={currentPageMedicalSearch}
        count={totalPages}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: FaArrowRight, next: FaArrowLeft }}
            {...item}
            page={item.page ? toPersianDigits(item.page) : item.page}
          />
        )}
      />
    </div>
  );
}

export default AllMedicalCenters;

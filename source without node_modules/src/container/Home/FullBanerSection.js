import React from "react";
import fullBanner from "../../assets/Pics/fullBaner.png";
import hospitalIcon from "../../assets/Pics/FullBannerIcons/hospital.png";
import group from "../../assets/Pics/FullBannerIcons/group.png";
import doctor from "../../assets/Pics/FullBannerIcons/doctor.png";
import telephone from "../../assets/Pics/FullBannerIcons/telephone.png";

function FullBanerSection() {
  return (
    <div className=" w-full bg-blue-300 lg:h-full h-[150px] relative flex justify-center items-center">
      <img alt="full banner" className=" h-full" src={fullBanner} />
      <div className=" flex-wrap lg:flex-row w-full lg:w-[80%] absolute flex justify-between">
        <div className="  w-1/2 lg:w-1/4 text-[10px] lg:text-base flex text-white pl-4 lg:pl-0  justify-center items-center flex-col">
          <img
            width={110}
            className=" xs:w-8 w-5 sm:w-10 md:w-[40%] "
            src={hospitalIcon}
            alt="hospital-icon"
          />
          <h5 className=" mt-2">+456</h5>
          <p>بیمارستان های طرف قرارداد</p>
        </div>
        <div className=" pr-4 lg:pr-0 w-1/2 lg:w-1/4 text-[10px] lg:text-base flex text-white justify-center items-center flex-col">
          <img
            width={110}
            className=" xs:w-8 w-5 sm:w-10 md:w-[40%]"
            src={doctor}
            alt="hospital-icon"
          />
          <h5 className=" mt-2">+456</h5>
          <p>بیمارستان های طرف قرارداد</p>
        </div>
        <div className=" pl-4 lg:pl-0 w-1/2 lg:w-1/4 text-[10px] lg:text-base flex text-white justify-center items-center flex-col">
          <img
            className=" xs:w-8 w-5 sm:w-10 md:w-[40%]"
            width={110}
            src={telephone}
            alt="hospital-icon"
          />
          <h5 className=" mt-2">+456</h5>
          <p>بیمارستان های طرف قرارداد</p>
        </div>
        <div className=" pr-4 lg:pr-0 w-1/2 lg:w-1/4 text-[10px] lg:text-base flex text-white justify-center items-center flex-col">
          <img
            className=" xs:w-8 w-5 sm:w-10 md:w-[40%]"
            width={110}
            src={group}
            alt="hospital-icon"
          />
          <h5 className=" mt-2">+456</h5>
          <p>بیمارستان های طرف قرارداد</p>
        </div>
      </div>
    </div>
  );
}

export default FullBanerSection;

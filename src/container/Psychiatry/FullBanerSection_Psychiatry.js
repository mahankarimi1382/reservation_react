import React from "react";
import fullBanner from "../../assets/Pics/fullBaner.png";
import hospitalIcon from "../../assets/Pics/FullBannerIcons/hospital.png";
import group from "../../assets/Pics/FullBannerIcons/group.png";
import doctor from "../../assets/Pics/FullBannerIcons/doctor.png";
import telephone from "../../assets/Pics/FullBannerIcons/telephone.png";

function FullBanerSection_Psychiatry() {
  return (
    <div className=" w-full relative flex justify-center items-center">
      <img alt="full banner" src={fullBanner} />
      <div className=" w-[80%] absolute flex justify-between">
        <div className=" flex text-white justify-center items-center flex-col">
          <img width={110} src={hospitalIcon} alt="hospital-icon" />
          <h5 className=" mt-2 text-3xl">+456</h5>
          <p>بیمارستان های طرف قرارداد</p>
        </div>
        <div className=" flex text-white justify-center items-center flex-col">
          <img width={110} src={doctor} alt="hospital-icon" />
          <h5 className=" mt-2 text-3xl">+456</h5>
          <p>بیمارستان های طرف قرارداد</p>
        </div>
        <div className=" flex text-white justify-center items-center flex-col">
          <img width={110} src={telephone} alt="hospital-icon" />
          <h5 className=" mt-2 text-3xl">+456</h5>
          <p>بیمارستان های طرف قرارداد</p>
        </div>
        <div className=" flex text-white justify-center items-center flex-col">
          <img width={110} src={group} alt="hospital-icon" />
          <h5 className=" mt-2 text-3xl">+456</h5>
          <p>بیمارستان های طرف قرارداد</p>
        </div>
      </div>
    </div>
  );
}

export default FullBanerSection_Psychiatry;

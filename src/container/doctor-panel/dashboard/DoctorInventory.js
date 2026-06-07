import React from "react";
import doctorWalletBg from "../../../assets/Pics/doctorPanel/doctorWalletBg.png";
import cardCover from "../../../assets/Pics/doctorPanel/cardcover.png";
import { fullNameStorage } from "../../../store/Store";
function DoctorInventory() {
    const { fullName } = fullNameStorage();
  
  return (
    <div className=" shadow-md w-[30%] min-h-[192px] max-h-[192px] p-4 gap-3 bg-white rounded-3xl flex flex-col">
      <h5 className=" font-semibold">موجودی حساب شما</h5>
      <div className=" w-full relative flex flex-col justify-center items-center">
        <img src={doctorWalletBg} alt="bgImg" width={190} />
        <img src={cardCover} width={180} alt="image" className="  absolute" />
        <div className=" text-white absolute flex flex-col justify-center items-center gap-3">
          <h4>145,500,000 تومان</h4>
          <h5 className=" text-sm">دکتر {fullName}</h5>
        </div>
      </div>
    </div>
  );
}

export default DoctorInventory;

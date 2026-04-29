import React from "react";
import receipt from "../../../assets/Pics/receipt-icon.png";
function WalletSummarySection() {
  return (
    <div className=" xxl:w-[223px] text-sm flex flex-col gap-5">
      <div className=" border-b p-2  border-dashed border-[#D3E9FD] flex">
        <img alt="icon" src={receipt} width={24} />
        <h5>موجودی حساب: 70،000 تومان</h5>
      </div>
      <h5 className=" text-xs">مبلغ مورد نظر جهت شارژ حساب را انتخاب کنید</h5>
      <div className=" pb-2 flex items-center justify-center gap-[2px]">
        <button className="text-[#757575] rounded-md text-xs  p-1 border">
          100,000 تومان
        </button>
        <button className="text-[#757575] rounded-md text-xs  p-1 border">
          100,000 تومان
        </button>
        <button className="text-[#757575] rounded-md text-xs  p-1 border">
          100,000 تومان
        </button>
      </div>
    </div>
  );
}

export default WalletSummarySection;

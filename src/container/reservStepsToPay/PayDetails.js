import React from "react";

// قیمت واقعی ویزیت از استور رزرو خوانده می‌شود (قبلاً هاردکد بود)
function PayDetails({ price }) {
  const formatted = price
    ? Number(price).toLocaleString("en-US")
    : "—";
  return (
    <div className=" w-[90%]  lg:h-[301px] border flex flex-col gap-2 lg:gap-5 lg:p-5 p-2 border-[#005DAD] rounded-xl">
      <h2 className=" lg:text-xl lg:pb-5 pb-2 text-[#005DAD] border-b border-[#005DAD] border-dashed">
        جزئیات پرداخت
      </h2>
      <div className=" text-xs lg:text-xl flex justify-between">
        <h2>مبلغ و کارمزد خدمات آنلاین</h2>
        <h2>پرداخت شده توسط پزشک</h2>
      </div>
      <div className=" lg:text-xl flex justify-between">
        <h2>مبلغ ویزیت</h2>
        <h2>{formatted} تومان</h2>
      </div>{" "}
      <div className=" border-b pb-5 border-[#005DAD] border-dashed lg:text-xl flex justify-between">
        <h2>مبلغ بیعانه</h2>
        <h2>{formatted} تومان</h2>
      </div>
      <div className=" text-xs lg:text-xl  text-[#005DAD] font-black flex justify-between">
        <h2>مبلغ قابل پرداخت ( بدون کد تخفیف )</h2>
        <h2>{formatted} تومان</h2>
      </div>{" "}
    </div>
  );
}

export default PayDetails;

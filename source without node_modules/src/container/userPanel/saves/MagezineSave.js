import React from "react";
import pesorasos from "../../../assets/Pics/pesoriasos.png";
import doctorProf from "../../../assets/Pics/image 130.png";
function MagezineSave() {
  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex gap-2 lg:gap-5 items-start">
        <img
          src={pesorasos}
          alt="img"
          width={155}
          className=" w-[110px] lg:w-[155px]"
        />
        <div className=" flex flex-col justify-start items-start gap-2">
          <h4 className=" font-semibold">پسوریازیس</h4>
          <p className=" lg:text-base text-xs text-[#4E4E4E]">
            سوریازیس (به فرانسوی: psoriasis) یا صدفک[۱]، بیماری
            پوستی مزمن خودایمنی است. این بیماری هنگامی رخ می‌دهد که دستگاه
            ایمنی بدن سیگنال‌های اشتباهی می‌فرستد. این سیگنال‌ها باعث افزایش
            سرعت چرخهٔ{" "}
          </p>
          <div className=" w-full flex  justify-end">
            <button className=" lg:hidden text-sm text-end text-[#005DAD]">
              مشاهده کامل{" "}
            </button>
          </div>
          <div className=" hidden text-sm gap-3 items-start rounded-md lg:flex bg-[rgba(219,215,215,0.43)] p-2">
            <img src={doctorProf} alt="profile" width={51} />
            <div className=" flex">
              <div className=" flex flex-col">
                <h5>دکتر حلما محمدی</h5>
                <h5 className=" text-[#4E4E4E]">متخصص پوست و مو</h5>
                <p className=" text-[#4E4E4E]">تاریخ انتشار مجله:1403/06/09</p>
              </div>

              <div className="  flex">
                <h5>دسته بندی مقاله:</h5>
                <h5 className=" text-[#4E4E4E]">پوست و مو، زیبایی</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="  text-sm gap-3 items-start rounded-md lg:hidden flex bg-[rgba(219,215,215,0.43)] p-2">
        <img src={doctorProf} alt="profile" width={51} />
        <div className=" flex">
          <div className=" flex flex-col">
            <h5>دکتر حلما محمدی</h5>
            <h5 className=" text-[#4E4E4E]">متخصص پوست و مو</h5>
            <p className=" text-[#4E4E4E]">تاریخ انتشار مجله:1403/06/09</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MagezineSave;

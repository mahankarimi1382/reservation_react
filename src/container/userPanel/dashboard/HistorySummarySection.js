import React from "react";
import bahram from "../../../assets/Pics/bahramMirzayi.png";

function HistorySummarySection() {
  return (
    <div className="   gap-[10px] lg:p-2 xl:p-0 flex flex-col justify-center items-center lg:pt-5">
      <div className=" xxl:w-[500px] gap-1 px-2 lg:px-0 lg:w-[390px]  justify-center items-center flex border-b border-dashed border-[#D3E9FD] lg:pb-5 lg:gap-1 xl:gap-3">
        <img
          src={bahram}
          width={68}
          alt="profile"
          className=" w-[50px] aspect-square lg:w-[68px] rounded-full border border-[#005DAD]"
        />
        <div className=" flex flex-col gap-2">
          <div className=" flex lg:gap-4 xl:gap-10 text-sm">
            <div className=" flex-col lg:gap-2 flex">
              <h5>بهرام میرزایی</h5>
              <h5 className=" lg:text-base text-xs text-[#757575]">
                متخصص مغز و اعصاب
              </h5>
            </div>
            <div className=" flex-col flex">
              <div className="flex">
                <h5 className=" text-xs md:text-sm lg:text-base">
                  روش نوبت دهی :
                </h5>
                <p className=" text-[#005DAD] text-xs lg:text-base"> حضوری </p>
              </div>
              <div className="flex">
                <h5 className=" text-xs md:text-sm  lg:text-base whitespace-nowrap">
                  تاریخ وساعت :{" "}
                </h5>
                <p className=" text-[#005DAD] text-xs lg:text-base">
                  1403/06/28 ساعت 14:30
                </p>
              </div>
            </div>
          </div>
          <div className=" flex text-xs md:text-sm">
            <h5 className="  whitespace-nowrap">محل ویزیت :</h5>
            <p className=" text-[#005DAD]">
              گاندی شمالی برادران شریفی پلاک 55 واحد 11
            </p>
          </div>
        </div>
      </div>
      <div className=" xxl:w-[500px] gap-1 px-2 lg:px-0 lg:w-[390px]  justify-center items-center flex border-b border-dashed border-[#D3E9FD] lg:pb-5 lg:gap-1 xl:gap-3">
        <img
          src={bahram}
          width={68}
          alt="profile"
          className=" w-[50px] aspect-square lg:w-[68px] rounded-full border border-[#005DAD]"
        />
        <div className=" flex flex-col gap-2">
          <div className=" flex lg:gap-4 xl:gap-10 text-sm">
            <div className=" flex-col lg:gap-2 flex">
              <h5>بهرام میرزایی</h5>
              <h5 className=" lg:text-base text-xs text-[#757575]">
                متخصص مغز و اعصاب
              </h5>
            </div>
            <div className=" flex-col flex">
              <div className="flex">
                <h5 className=" text-xs md:text-sm lg:text-base">
                  روش نوبت دهی :
                </h5>
                <p className=" text-[#005DAD] text-xs lg:text-base"> حضوری </p>
              </div>
              <div className="flex">
                <h5 className=" text-xs md:text-sm  lg:text-base whitespace-nowrap">
                  تاریخ وساعت :{" "}
                </h5>
                <p className=" text-[#005DAD] text-xs lg:text-base">
                  1403/06/28 ساعت 14:30
                </p>
              </div>
            </div>
          </div>
          <div className=" flex text-xs md:text-sm">
            <h5 className="  whitespace-nowrap">محل ویزیت :</h5>
            <p className=" text-[#005DAD]">
              گاندی شمالی برادران شریفی پلاک 55 واحد 11
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistorySummarySection;

import React from "react";

function DashboardBox(props) {
  console.log(props);
  return (
    <div
      className={`${props.Wfull && "w-full lg:w-auto"} ${
        props.is45 && "min-w-[45%] lg:min-w-0"
      }    items-center flex gap-3 flex-col pb-5 rounded-3xl shadow-[0px_2px_6px_0px_rgba(0,_0,_0,_0.1)]`}
    >
      <div className=" w-full lg:h-[64px] h-[40px]  flex rounded-t-3xl justify-center items-center">
        <h2 className=" font-semibold lg:font-normal flex justify-center items-center gap-2">
          <img src={props.icon} width={24} alt="icon" />
          {props.title}
        </h2>
      </div>
      {props.children}
      <button className=" rounded-xl border border-[#005DAD] text-[#005DAD] py-2 w-[120px]">
        مشاهده جزئیات
      </button>
    </div>
  );
}

export default DashboardBox;

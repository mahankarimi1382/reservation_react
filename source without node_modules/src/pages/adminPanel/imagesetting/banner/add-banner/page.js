import AdminPanelMenu from "../../../../../container/adminPanel/AdminPanelMenu";
import React from "react";
import AddBanner from "../../../../../container/adminPanel/banner/AddBanner";

function page() {

  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />
      <div className=" w-full flex justify-center items-center">
        <div className=" w-[80%] mt-14 p-5 items-center flex gap-7 bg-white rounded-3xl flex-col">
          <AddBanner />
        </div>
      </div>
    </div>
  );
}

export default page;

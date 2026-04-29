import Navbar from "../../../components/Navbar";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React from "react";
import SubsetedusersSection from "../../../container/userPanel/substedUsers/subsetedusersSection";

function page() {
  return (
    <div dir="rtl" className=" bg-[#F6FBFF] w-full">
      <Navbar />
      <div className=" w-full min-h-screen items-start flex">
        <UserPanelMenue />
        <SubsetedusersSection />
      </div>
    </div>
  );
}

export default page;

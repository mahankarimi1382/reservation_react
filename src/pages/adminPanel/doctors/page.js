import AdminPanelMenu from "../../../container/adminPanel/AdminPanelMenu";
import React from "react";

import DoctorsSection from "../../../container/adminPanel/doctors/DoctorsSection";
function page() {
  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />

      <DoctorsSection />

    </div>
  );
}

export default page;

import AdminPanelMenu from "../../../container/adminPanel/AdminPanelMenu";
import React from "react";

import DoctorsSection from "../../../container/adminPanel/doctors/DoctorsSection";
import InsurancesSection from "../../../container/adminPanel/insurances/InsurancesSection";
function page() {
  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />

      <InsurancesSection />
    </div>
  );
}

export default page;

import AdminPanelMenu from "../../../../container/adminPanel/AdminPanelMenu";
import React from "react";

import MedicalCentersList from "../../../../components/MedicalCentersList";

function page() {
  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />

      <MedicalCentersList type="office" />
    </div>
  );
}

export default page;

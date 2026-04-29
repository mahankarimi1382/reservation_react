import AdminPanelMenu from "../../../container/adminPanel/AdminPanelMenu";
import React from "react";

import SpecialtiesPanelSection from "../../../container/adminPanel/Specialties/specialtiesSection";

function page() {
  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />

      <SpecialtiesPanelSection />

    </div>
  );
}

export default page;

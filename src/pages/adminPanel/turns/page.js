import AdminPanelMenu from "../../../container/adminPanel/AdminPanelMenu";
import React from "react";

import TurnsSection from "../../../container/adminPanel/turns/TurnsSection";

function page() {
  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />
      <TurnsSection />
    </div>
  );
}

export default page;

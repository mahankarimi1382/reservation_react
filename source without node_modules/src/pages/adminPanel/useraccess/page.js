
import AdminPanelMenu from "../../../container/adminPanel/AdminPanelMenu";
import React from "react";

import UserAccesSection from "../../../container/adminPanel/useracces/UserAccesSection";
function page() {

  return (
    <div dir="rtl" className="flex bg-[#F6FBFF] justify-start">
      <AdminPanelMenu />
      <UserAccesSection />
    </div>
  );
}

export default page;

import React from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import DoctorProfile from "../../../container/Doctors/id/DoctorProfile";
function page() {
  return (
    <div dir="rtl">
      <div className=" border border-b shadow">
        <Navbar />
      </div>
      <DoctorProfile />
      <Footer />
    </div>
  );
}

export default page;

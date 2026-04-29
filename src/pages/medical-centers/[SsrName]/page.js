"use client"
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import MedicalCenterProfile from "../../../container/MedicalCenters/id/MedicalCenterProfile";
import React from "react";

function page({params}) {
  return (
    <div dir="rtl">
      <div className=" border border-b shadow">
        <Navbar params={params} />
      </div>
      <MedicalCenterProfile />
      <Footer />
    </div>
  );
}

export default page;

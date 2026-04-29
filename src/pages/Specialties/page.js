import Navbar from "../../components/Navbar";
import React, { useState } from "react";
import SpecialtiesSwipper from "../../container/Specialties/SpecialtiesSwipper";
import SpecialtiesMenu from "../../container/Specialties/SpecialtiesMenu";

const SpecialtiesPageComponent = () => {
  const [specialties, setSpecialties] = useState([]);
  return (
    <div className=" flex w-[90%] gap-2 lg:gap-0  justify-between">
      <SpecialtiesMenu setSpecialties={setSpecialties} />
      <SpecialtiesSwipper
        setSpecialties={setSpecialties}
        Specialties={specialties}
      />
    </div>
  );
};
function page() {
  return (
    <div
      dir="rtl"
      className="bg-[#f5f5f5]  lg:pb-0 pb-24 w-full flex flex-col min-h-screen  gap-5 lg:gap-20 items-center"
    >
      <Navbar />
      <SpecialtiesPageComponent />
    </div>
  );
}

export default page;

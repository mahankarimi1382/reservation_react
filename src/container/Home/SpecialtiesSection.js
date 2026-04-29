import React from "react";
import SwipperSection from "../../components/SwipperSection";
import { SpecialtiesSectionButton } from "../../components/Buttons/Button";
function SpecialtiesSection() {
  return (
    <div className=" w-full flex-col items-center lg:gap-16 mt-5  lg:mt-24 justify-center flex">
      <div className=" w-full items-center justify-center px-4 flex">
        <h2 className=" flex gap-2  lg:text-[32px]">
          <span className=" text-[#005DAD]">تخصص</span>
          های دکتر رزرو
        </h2>
      </div>
      <div className="  lg:ml-10 xl:ml-0 justify-center pl-3 w-full flex lg:w-[90%] xl:w-[80%] items-center">

        <SwipperSection />
        <SpecialtiesSectionButton />
      </div>
    </div>
  );
}

export default SpecialtiesSection;

"use client";
import { get_specialties, read_all_insirances } from "../../../api/ApiCalling";
import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoPlus } from "react-icons/go";
import SubmitSpecialtiesModal from "../../../components/modals/SubmitSpecialtiesModal";
import LoadingComponent from "../../../components/LoadingComponent";
import { myStore } from "../../../store/Store";
import InsurancesPagination from "./InsurancesPagination";

function InsurancesSection() {
  const [insurances, setInsurances] = useState([]);
  const [filtredArr, setFiltredArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(insurances);
  const [isLoading, setIsLoading] = useState(true);
  const getInsurances = async () => {
    const data = await read_all_insirances();
    if (data) {
      setInsurances(data);
      setFiltredArr(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getInsurances();
  }, []);

  return (
    <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
      {isLoading && <LoadingComponent />}

      <div className=" w-[80%] flex justify-between"></div>
      <div className=" gap-3 flex flex-col w-[80%] rounded-lg border shadow-md p-4 bg-white">
        <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
          <h4 className=" w-1/4 flex justify-center  items-center text-[#3F444D] text-lg">
            نوع
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-1/4 flex justify-center items-center text-[#3F444D] text-lg">
            بیمه
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-1/2 flex justify-center items-center text-[#3F444D] text-lg">
            اقدامات
            <TiArrowSortedDown />
          </h4>
        </div>
        <InsurancesPagination
          setInsurances={setFiltredArr}
          items={filtredArr}
          insurances={filtredArr}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default InsurancesSection;

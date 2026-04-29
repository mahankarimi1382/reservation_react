"use client";
import { get_specialties } from "../../../api/ApiCalling";
import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { SelectFilter } from "../../../components/Inputs/Input";
import { GoPlus } from "react-icons/go";
import SubmitSpecialtiesModal from "../../../components/modals/SubmitSpecialtiesModal";
import SpecialistPagination from "./SpecialistPagination";
import LoadingComponent from "../../../components/LoadingComponent";
import { myStore } from "../../../store/Store";
import AddSpecialtiesCategory from "../../../components/modals/AddSpecialtiesCategory";
import SpecialtiesCategoryModal from "../../../components/modals/SpecialtiesCategoryModal";

function SpecialtiesPanelSection() {
  const { setIsSerchDoctorLoading, isSerchDoctorLoading } = myStore();
  const [specialist, setSpecialist] = useState([]);
  const [isAddSpecialModal, setIsAddSpecialModal] = useState(false);
  const [filtredArr, setFiltredArr] = useState([]);
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [item, setItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddCategory, setIsAddCategory] = useState(false);

  console.log(specialist);
  const url = "Specialist/read-specialists";

  const fetchData = async () => {
    const data = await get_specialties(url);
    if (data) {
      setSpecialist(data);
      setFiltredArr(data);

      setIsSerchDoctorLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    setIsSerchDoctorLoading(true);
  }, [isAddSpecialModal, isAddCategory]);
  const handleInputChange = (event) => {
    setCurrentPage(1);
    filterArray(event.target.value);
  };
  const filterArray = (value) => {
    const filtered = specialist.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltredArr(filtered);
  };
  return (
    <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
      {isSerchDoctorLoading && <LoadingComponent />}
      {isCategoryModal && (
        <SpecialtiesCategoryModal
          closeModal={() => setIsCategoryModal(false)}
        />
      )}

      {isAddSpecialModal && (
        <SubmitSpecialtiesModal
          setIsAddSpecialModal={setIsAddSpecialModal}
          item={item}
          setItem={setItem}
        />
      )}

      <div className=" w-[80%] flex justify-between">
        <input
          onChange={handleInputChange}
          placeholder="جستجو تخصص "
          className=" w-1/2 outline-none py-2 bg-white text-xs  lg:text-xl  "
        />
        <div className=" flex items-center gap-5">
          <button
            onClick={() => {
              setIsCategoryModal(true);
            }}
            className=" flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
          >
            دسته بندی ها
          </button>
          <button
            onClick={() => {
              setIsAddSpecialModal(true);
              setItem();
            }}
            className=" flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
          >
            <GoPlus className=" text-2xl" />
            افزودن تخصص
          </button>
        </div>
      </div>
      <div className=" gap-3 flex flex-col w-[80%] rounded-lg border shadow-md p-4 bg-white">
        <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
          <h4 className=" w-1/4 flex justify-center  items-center text-[#3F444D] text-lg">
            آیکون
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-1/4 flex justify-center items-center text-[#3F444D] text-lg">
            تخصص ها
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-1/2 flex justify-center items-center text-[#3F444D] text-lg">
            اقدامات
            <TiArrowSortedDown />
          </h4>
        </div>
        <SpecialistPagination
          isAddCategory={isAddCategory}
          setIsAddCategory={setIsAddCategory}
          setSpecialist={setFiltredArr}
          setItem={setItem}
          setIsAddSpecialModal={setIsAddSpecialModal}
          items={filtredArr}
          specialist={filtredArr}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default SpecialtiesPanelSection;

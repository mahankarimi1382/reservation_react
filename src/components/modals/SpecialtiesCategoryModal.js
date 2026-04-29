"use client";
import React, { useEffect, useState } from "react";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import { RxCross2 } from "react-icons/rx";
import { SyncLoader } from "react-spinners";
import {
  add_role_to_user,
  delete_category,
  get_roles,
  get_specialties,
  get_specialties_category,
  get_user_role_by_username,
} from "../../api/ApiCalling";
import { MdDeleteForever } from "react-icons/md";
import DeletingModal from "./DeletingModal";
import { TiArrowSortedDown } from "react-icons/ti";
import SpecialistPagination from "../../container/adminPanel/Specialties/SpecialistPagination";
import { myStore } from "../../store/Store";
import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import AddSpecialtiesCategory from "./AddSpecialtiesCategory";
import LoadingComponent from "../LoadingComponent";

function SpecialtiesCategoryModal({ closeModal }) {
  const [specialist, setSpecialist] = useState([]);
  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [isAddCategoryModal, setIsAddCategoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(specialist);

  const fetchData = async () => {
    const data = await get_specialties_category();
    if (data) {
      setSpecialist(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isAddCategoryModal]);

  return (
    <div className=" w-screen z-10 h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      {isLoading && <LoadingComponent />}
      {isAddCategoryModal && (
        <AddSpecialtiesCategory
          selectedCategory={selectedCategory}
          closeModal={() => setIsAddCategoryModal(false)}
        />
      )}
      {isDeletingModal && (
        <DeletingModal
          DeletingFn={delete_category}
          setList={setSpecialist}
          id={selectedCategory.id}
          name={selectedCategory.categoryName}
          closeModal={() => setIsDeletingModal(false)}
          list={specialist}
        />
      )}
      <div className=" relative w-1/2 h-[80%] bg-white items-center flex gap-2 flex-col py-2 px-2 pb-5 rounded-2xl">
        <RxCross2
          onClick={closeModal}
          className=" cursor-pointer absolute top-2 left-2"
        />
        <div className=" w-[95%] mt-5 flex justify-end">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setIsAddCategoryModal(true);
            }}
            className=" flex justify-center text-sm items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
          >
            <GoPlus className=" text-2xl" />
            افزودن دسته بندی
          </button>
        </div>
        <div className=" gap-3 flex flex-col w-[95%] h-[80%]  rounded-lg border shadow-md p-4 bg-white">
          <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
            <h4 className=" w-1/4 flex justify-center  items-center text-[#3F444D] text-lg">
              آیکون
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-1/4 flex justify-center items-center text-[#3F444D] text-lg">
              دسته بندی
              <TiArrowSortedDown />
            </h4>
            <h4 className=" w-1/2 flex justify-center items-center text-[#3F444D] text-lg">
              اقدامات
              <TiArrowSortedDown />
            </h4>
          </div>
          <div className=" h-[80%] overflow-auto">
            {/* {isDeletingModal && (
              <DeletingModal
                DeletingFn={delete_specialties}
                setList={setSpecialist}
                id={selectedItem.id}
                name={selectedItem.name}
                closeModal={() => setIsDeletingModal(false)}
                list={specialist}
              />
            )} */}
            {specialist.map((item) => {
              return (
                <div
                  className=" border flex py-3 rounded-lg bg-white shadow-md"
                  key={item.id}
                >
                  <div className=" w-1/4 flex justify-center items-center">
                    <img
                      src={
                        item.categoryLogoFile != "string" &&
                        item.categoryLogoFile
                      }
                      width={47}
                      height={47}
                      alt="logo"
                    />
                  </div>
                  <h4 className=" w-1/4 flex justify-center items-center text-[#3F444D]">
                    {item.categoryName}
                  </h4>
                  <div className=" gap-2 w-1/2 flex justify-center items-center text-[#3F444D]">
                    <button
                      onClick={() => {
                        setSelectedCategory(item);
                        setIsDeletingModal(true);
                      }}
                      className=" gap-2 border rounded-lg px-5 p-1 flex justify-center items-center bg-[#EED4D7] border-[#C30505] text-[#C30505]"
                    >
                      <HiOutlineTrash />
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setIsAddCategoryModal(true);
                        setSelectedCategory(item);
                      }}
                      className=" gap-2 border rounded-lg px-5 p-1 flex justify-center items-center bg-[#F2FEF8] border-[#1F7168] text-[#1F7168]"
                    >
                      <CiEdit className=" font-bold text-2xl" />
                      ویرایش
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialtiesCategoryModal;

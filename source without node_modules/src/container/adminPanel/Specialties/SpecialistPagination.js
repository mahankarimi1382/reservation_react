import { delete_specialties } from "../../../api/ApiCalling";
import AddCategoryModal from "../../../components/modals/AddCategoryModal";
import DeletingModal from "../../../components/modals/DeletingModal";
import { Pagination, PaginationItem } from "@mui/material";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";
import { TbCategory } from "react-icons/tb";

const SpecialistPagination = ({
  isAddCategory,
  setIsAddCategory,
  setSpecialist,
  items,
  setIsAddSpecialModal,
  setItem,
  specialist,
  currentPage,
  setCurrentPage,
}) => {
  // const [isAddCategory, setIsAddCategory] = useState(false);
  const [isDeletingModal, setIsDeletingModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});
  console.log(selectedItem);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const toPersianDigits = (str) =>
    str.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  return (
    <div>
      {isAddCategory && (
        <AddCategoryModal
          selectedSpecialties={selectedItem}
          closeModal={() => setIsAddCategory(false)}
        />
      )}
      {isDeletingModal && (
        <DeletingModal
          DeletingFn={delete_specialties}
          setList={setSpecialist}
          id={selectedItem.id}
          name={selectedItem.name}
          closeModal={() => setIsDeletingModal(false)}
          list={specialist}
        />
      )}
      {currentItems.map((item) => {
        return (
          <div
            className=" border flex py-3 rounded-lg bg-white shadow-md"
            key={item.id}
          >
            <div className=" w-1/4 flex justify-center items-center">
              <img src={item.logoFile} width={47} height={47} alt="logo" />
            </div>
            <h4 className=" w-1/4 flex justify-center items-center text-[#3F444D] text-lg">
              {item.name}
            </h4>
            <div className=" gap-2 w-1/2 flex justify-center items-center text-[#3F444D] text-lg">
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setIsDeletingModal(true);
                }}
                className=" gap-2 border rounded-lg px-5 p-1 flex justify-center items-center bg-[#EED4D7] border-[#C30505] text-[#C30505]"
              >
                <HiOutlineTrash />
                حذف
              </button>
              <button
                onClick={() => {
                  setItem(item);
                  setIsAddSpecialModal(true);
                }}
                className=" gap-2 border rounded-lg px-5 p-1 flex justify-center items-center bg-[#F2FEF8] border-[#1F7168] text-[#1F7168]"
              >
                <CiEdit className=" font-bold text-2xl" />
                ویرایش
              </button>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setIsAddCategory(true);
                }}
                className=" bg-[#DBEDFF] border border-[#005DAD] text-[#005DAD] gap-2  rounded-lg px-5 p-1 flex justify-center items-center "
              >
                <TbCategory className=" font-bold text-2xl" />
                دسته بندی
              </button>
            </div>
          </div>
        );
      })}
      <div className=" w-full flex justify-center items-center mt-5">
        {/* دکمه‌های صفحه‌بندی */}
        
        <Pagination
          size="small"
          onChange={handleChange}
          page={currentPage}
          count={totalPages}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: FaArrowRight, next: FaArrowLeft }}
              {...item}
              // فارسی‌سازی عدد صفحه
              page={item.page ? toPersianDigits(item.page) : item.page}
              // گزینه‌های "اول" و "آخر" رو دست‌نخورده بذار
            />
          )}
        />

      </div>
    </div>
  );
};

export default SpecialistPagination;

"use client";

import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import excel_icon from "../../../assets/Pics/excelIcon.png";
import printer from "../../../assets/Pics/printer.png";
import { get_all_users } from "../../../api/ApiCalling";
import LoadingComponent from "../../../components/LoadingComponent";
import UserAccesPaginate from "./UserAccesPaginate";
import AddRoleModal from "../../../components/modals/AddRoleModal";
import { GoPlus } from "react-icons/go";

function UserAccesSection() {
  const [users, setUsers] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [filtredArr, setFiltredArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddRoleModal, setIsAddRoleModal] = useState(false);
  console.log(users);
  const getUsers = async () => {
    const data = await get_all_users();
    if (data) {
      console.log(data);
      setUsers(data);
      setFiltredArr(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handleInputChange = (event) => {
    setCurrentPage(1);
    filterArray(event.target.value);
  };
  const filterArray = (value) => {
    const filtered = users.filter((item) =>
      item.userName.toLowerCase().includes(value.toLowerCase())
    );
    setFiltredArr(filtered);
  };
  return (
    <div className=" gap-10 mt-20 w-full flex flex-col items-center ">
      {loading && <LoadingComponent />}
      {isAddRoleModal && (
        <AddRoleModal closeModal={() => setIsAddRoleModal(false)} />
      )}
      {/* <div className=" flex w-[80%]  gap-5 items-center">
        <DatePickerComponent title="از تاریخ" />
        <DatePickerComponent title="تا تاریخ" />
        <SelectFilter title="نام پزشک" />
        <SelectFilter title="ساعت" />
        <SelectFilter title="نوع ویزیت" />
        <SelectFilter title="نام مرکز درمانی" />
      </div> */}
      <div className=" w-[80%] flex gap-5">
        <input
          onChange={handleInputChange}
          placeholder="جستجو بر اساس کد ملی "
          className=" w-1/3 border rounded-lg outline-none py-1 bg-white text-xs  lg:text-xl  "
        />
        <select
          className=" border rounded-lg"
          onChange={(e) => {
            setCurrentPage(1);
            if (e.target.value == 2) {
              setFiltredArr(
                filtredArr.filter((item) => item.userName.length < 11)
              );
            } else {
              setFiltredArr(users);
            }
          }}
        >
          <option>همه</option>
          <option value={2}>کابران سایت</option>
        </select>
      </div>
      <div className=" flex flex-col items-end w-[80%] gap-1">
        <button
          onClick={() => setIsAddRoleModal(true)}
          className=" flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
        >
          <GoPlus className=" text-2xl" />
          افزودن نقش
        </button>
        <div className=" gap-2 flex justify-end w-[80%] items-center">
          <button className=" border rounded-lg px-3 p-1 gap-2 text-[#185B37] border-[#185B37] flex">
            <img src={excel_icon} alt=" icon" width={24} />
            خروجی اکسل
          </button>
          <button className=" border rounded-lg px-3 p-1 gap-2 text-[#3F444D] border-[#3F444D] flex">
            <img src={printer} alt=" icon" width={24} />
            چاپ اطلاعات{" "}
          </button>
        </div>
      </div>
      <div className=" gap-3 flex flex-col w-[80%] rounded-lg border shadow-md p-4 bg-white">
        <div className=" py-2 w-full flex rounded-lg bg-[#F4F4F4]">
          <h4 className=" w-[15%] flex justify-center  items-center text-[#3F444D] ">
            نقش ها
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[15%] flex justify-center items-center text-[#3F444D] ">
            نام
            <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[15%] flex justify-center items-center text-[#3F444D] ">
            موبایل <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[15%] flex justify-center items-center text-[#3F444D] ">
            کد ملی <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[15%] flex justify-center items-center text-[#3F444D]">
            وضعیت <TiArrowSortedDown />
          </h4>
          <h4 className=" w-[25%] flex justify-center items-center text-[#3F444D]"></h4>
        </div>
        <UserAccesPaginate
          setFiltredArr={setFiltredArr}
          items={filtredArr}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default UserAccesSection;

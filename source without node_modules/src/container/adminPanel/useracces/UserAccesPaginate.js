"use client";

import { delete_specialties } from "../../../api/ApiCalling";
import { IOSSwitch } from "../../../components/Buttons/Button";
import DeletingModal from "../../../components/modals/DeletingModal";
import { FormControlLabel, Pagination } from "@mui/material";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import lockIcon from "../../../assets/Pics/lock-icon.png";
import EditUserRoleModal from "../../../components/modals/EditUserRoleModal";

function UserAccesPaginate({
  setSpecialist,
  items,
  currentPage,
  setCurrentPage,
}) {
  const [isEditUserRole, setIsEditUserRole] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");
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
  return (
    <div>
      {isEditUserRole && (
        <EditUserRoleModal
          closeModal={() => setIsEditUserRole(false)}
          userName={selectedUserName}
        />
      )}

      {currentItems.map((item) => {
        console.log(currentItems);
        return (
          <div
            className=" border flex py-3 rounded-lg bg-white shadow-md"
            key={item.id}
          >
            <h4 className=" w-[15%] flex justify-center items-center text-[#3F444D] ">
              {" "}
            </h4>
            <h4 className=" w-[15%] flex justify-center items-center text-[#3F444D] ">
              {item.profileName == "string" ? "کاربر مهمان" : item.profileName}
            </h4>
            <h4 className=" w-[15%] flex justify-center items-center text-[#3F444D] ">
              {" "}
            </h4>
            <h4 className=" w-[15%] flex justify-center items-center text-[#3F444D] ">
              {item.userName}
            </h4>
            <h4 className="  pl-8 text-green-600 w-[15%] flex justify-center items-center ">
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              />
            </h4>
            <div className=" w-[22%] flex justify-center items-center gap-2">
              <button className=" text-sm flex justify-center items-center gap-2  bg-[rgba(219,215,215,0.25)] text-[#4E4E4E] border border-[#4E4E4E] p-1  rounded-lg">
                <img src={lockIcon} alt="icon" width={24} />
                رمز عبور
              </button>
              <button
                onClick={() => {
                  setSelectedUserName(item.userName);
                  setIsEditUserRole(true);
                }}
                className=" text-sm flex justify-center items-center gap-2  bg-[rgba(228,255,241,0.45)] text-[#1F7168] border border-[#1F7168] p-1 rounded-lg"
              >
                <CiEdit className=" text-xl text-[#1F7168]" />
                ویرایش
              </button>
            </div>
          </div>
        );
      })}
      <div className=" w-full flex justify-center items-center mt-5">
        {/* دکمه‌های صفحه‌بندی */}
        <Pagination
          onChange={handleChange}
          page={currentPage}
          count={totalPages}
          color="primary"
        />
      </div>
    </div>
  );
}

export default UserAccesPaginate;

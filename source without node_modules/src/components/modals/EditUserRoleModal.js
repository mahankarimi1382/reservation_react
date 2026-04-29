"use client";
import React, { useEffect, useState } from "react";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import { RxCross2 } from "react-icons/rx";
import { SyncLoader } from "react-spinners";
import {
  add_role_to_user,
  get_roles,
  get_user_role_by_username,
} from "../../api/ApiCalling";
import { MdDeleteForever } from "react-icons/md";
import DeletingModal from "./DeletingModal";

function EditUserRoleModal({ userName, closeModal }) {
  const [selectedItem, setSelectedItem] = useState("");
  const [newRole, setNewRole] = useState("");
  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: 0,
    },
    userName: userName,
    userRoleName: newRole,
  };
  const handleSubmit = () => {
    setIsLoading(true);
    add_role_to_user(data, setIsLoading,closeModal);
  };
  const [roles, setRoles] = useState([]);
  console.log(roles);
  const getUsers = async () => {
    const data = await get_roles();
    if (data) {
      console.log(data);
      setRoles(data);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const [userRoles, setUserRoles] = useState([]);
  console.log(userRoles);
  const fetchData = async () => {
    const data = await get_user_role_by_username(userName);
    if (data) {
      setUserRoles(data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const RoleNameFn = (name) => {
    if (name == "DentistAdmin") {
      return "ادمین دندانپزشکی";
    } else if (name == "SupportAdmin") {
      return "ادمین پشتیبانی";
    } else if (name == "PsychiatristAdmin") {
      return "ادمین روانپزشکی";
    } else if (name == "TreatmentCentersAdmin") {
      return "ادمین مراکز درمانی";
    } else if (name == "SuperAdmin") {
      return "سوپر ادمین";
    }else{
      return(name)
    }
  };
  return (
    <div className=" w-screen z-10 h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      {isDeletingModal && (
        <DeletingModal
          DeletingFn={delete_specialties}
          setList={setUserRoles}
          id={selectedItem.id}
          name={selectedItem.name}
          closeModal={() => setIsDeletingModal(false)}
          list={specialist}
        />
      )}
      <div className=" relative w-1/4 h-1/2 bg-white flex flex-col py-2 px-2 pb-5 rounded-2xl">
        <RxCross2
          onClick={closeModal}
          className=" cursor-pointer absolute top-2 left-2"
        />
        <h5 className=" mt-2">
          دسترسی های کاربر <span className=" text-[#005DAD]">{userName}</span>:
        </h5>

        <div className=" w-full h-[75%] rounded-xl border border-[#005DAD]">
          {userRoles.length == 0 ? (
            <div className=" text-sm text-slate-500 w-full h-full flex justify-center items-center">
              دسترسی برای این کاربر وجود ندارد
            </div>
          ) : (
            userRoles.map((item, index) => {
              return (
                <div
                  className=" w-full flex justify-between items-center p-2 px-3 border-b"
                  key={index + 1}
                >
                  <h5 className=" text-sm">{RoleNameFn(item.roleName)}</h5>
                  <MdDeleteForever
                    onClick={() => {
                      console.log(item);
                    }}
                    className=" text-lg text-[#3F444D]  transition-all cursor-pointer hover:text-red-600"
                  />
                </div>
              );
            })
          )}
        </div>
        <div className=" flex justify-between items-center">
          <h5>افزودن دسترسی:</h5>
          <select
            onChange={(e) => setNewRole(e.target.value)}
            className=" text-gray-600"
          >
            <option value="">انتخاب کنید</option>

            {roles.map((item) => {
              return (
                <option value={item.name} key={item.div}>
                  {RoleNameFn(item.name)}
                </option>
              );
            })}
          </select>
        </div>
        <div className=" absolute bottom-3 w-full flex justify-center items-center">
          {newRole && (
            <button
              onClick={handleSubmit}
              className=" bg-[#005DAD] text-white w-[50%] p-1 rounded-lg"
            >
              {isLoading ? (
                <SyncLoader size={10} color="white" />
              ) : (
                "ثبت دسترسی"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditUserRoleModal;

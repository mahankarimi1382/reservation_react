"use client";
import React, { useEffect, useState } from "react";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import { RxCross2 } from "react-icons/rx";
import { SyncLoader } from "react-spinners";
import {
  add_role_to_user,
  add_specialist_to_category,
  get_Category_by_specialties,
  get_roles,
  get_specialties_by_id,
  get_specialties_category,
  get_user_role_by_username,
} from "../../api/ApiCalling";
import { MdDeleteForever } from "react-icons/md";
import DeletingModal from "./DeletingModal";
import DeletingCategoryFromSpecialModal from "./DeletingCategoryFromSpecialModal";

function AddCategoryModal({ selectedSpecialties, closeModal }) {
  console.log(selectedSpecialties);
  const [selectedItem, setSelectedItem] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [specialistCategorys, setSpecialistCategorys] = useState(
    (selectedSpecialties.categories[0] && selectedSpecialties.categories) || []
  );
  console.log(specialistCategorys);

  let data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: 0,
    },
    specialistId: selectedSpecialties.id,
    categoryId: Number(newCategory),
  };
  const handleSubmit = () => {
    setIsLoading(true);
    add_specialist_to_category(data, setIsLoading, closeModal);
  };
  const [categorys, setCategorys] = useState([]);
  const getcategorys = async () => {
    const data = await get_specialties_category();
    if (data) {
      console.log(data);
      setCategorys(data);
    }
  };
  useEffect(() => {
    getcategorys();
  }, []);

  return (
    <div className=" w-screen z-10 h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      {isDeletingModal && (
        <DeletingCategoryFromSpecialModal
          specialistId={selectedSpecialties.id}
          categoryId={selectedItem.id}
          setList={setSpecialistCategorys}
          name={selectedItem.categoryName}
          closeModal={() => setIsDeletingModal(false)}
          list={specialistCategorys}
        />
      )}
      <div className=" relative w-1/4 h-1/2 bg-white flex flex-col py-2 px-2 pb-5 rounded-2xl">
        <RxCross2
          onClick={closeModal}
          className=" cursor-pointer absolute top-2 left-2"
        />
        <h5 className=" mt-2">
          دسته بندی های تخصص{" "}
          <span className=" text-[#005DAD]">{selectedSpecialties.name}</span>:
        </h5>

        <div className=" w-full h-[75%] rounded-xl border border-[#005DAD]">
          {specialistCategorys.length == 0 ? (
            <div className=" text-sm text-slate-500 w-full h-full flex justify-center items-center">
              دسته بندی برای این تخصص وجود ندارد
            </div>
          ) : (
            specialistCategorys.map((item, index) => {
              console.log(item);
              return (
                <div
                  className=" w-full flex justify-between items-center p-2 px-3 border-b"
                  key={index + 1}
                >
                  <h5 className=" text-sm">{item.categoryName}</h5>
                  <MdDeleteForever
                    onClick={() => {
                      setIsDeletingModal(true);
                      setSelectedItem(item);
                    }}
                    className=" text-lg text-[#3F444D]  transition-all cursor-pointer hover:text-red-600"
                  />
                </div>
              );
            })
          )}
        </div>
        <div className=" flex justify-between items-center">
          <h5>افزودن دسته بندی:</h5>
          <select
            onChange={(e) => setNewCategory(e.target.value)}
            className=" text-gray-600"
          >
            <option value="">انتخاب کنید</option>

            {categorys.map((item) => {
              console.log(item);
              return (
                <option value={item.id} key={item.div}>
                  {item.categoryName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="  bottom-3 w-full flex justify-center items-center">
          {newCategory && (
            <button
              onClick={handleSubmit}
              className=" bg-[#005DAD] text-white w-[50%] p-1 rounded-lg"
            >
              {isLoading ? (
                <SyncLoader size={10} color="white" />
              ) : (
                "ثبت دسته بندی"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;

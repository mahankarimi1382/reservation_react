import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import Confetti from "react-confetti";
import { SyncLoader } from "react-spinners";
import {
  create_role,
  create_Specialties_category,
  edit_category,
} from "../../api/ApiCalling";
import { MdDeleteForever } from "react-icons/md";
import { Eror } from "../ToastAlerts";

function AddSpecialtiesCategory({ closeModal, selectedCategory }) {
  console.log(selectedCategory);
  const [image, setImage] = useState(
    (selectedCategory && selectedCategory.categoryLogoFile) || ""
  );
  const [categoryName, setCategoryName] = useState(
    (selectedCategory && selectedCategory.categoryName) || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  let data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: 0,
    },
    categoryName,
    categoryLogoFile: image,
  };
  let data2 = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: 0,
    },
    id: selectedCategory && selectedCategory.id,
    categoryName,
    categoryLogoFile: image,
  };
  const handleSubmit = () => {
    if (image == "") {
      Eror("لطفا اطلاعات را کامل وارد کنید");
    } else if (!image && !categoryName) {
      Eror("لطفا اطلاعات را کامل وارد کنید");
    } else {
      selectedCategory
        ? edit_category(data2, setIsLoading, closeModal)
        : create_Specialties_category(data, setIsLoading, closeModal);
    }
  };

  return (
    <div className=" w-screen z-10 h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className=" relative w-[450px] bg-white flex flex-col justify-between py-2 px-2 pb-5  items-center rounded-2xl">
        <RxCross2
          onClick={closeModal}
          className=" absolute cursor-pointer top-2 left-2"
        />
        <div className=" mt-5 w-full h-full flex flex-col">
          <h5>{selectedCategory ? "ویرایش دسته بندی" : "افزودن دسته بندی:"}</h5>
          <div className=" gap-2 flex flex-col p-5 relative w-full h-full rounded-lg border border-[#005DAD]">
            <h5>عنوان</h5>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="عنوان دسته بندی را وارد کنید"
              className=" w-full rounded border-[#005DAD] border p-2"
            />
            <h5>عکس دسته بندی</h5>

            <div className=" w-full flex   justify-center items-center">
              {image ? (
                <div className=" relative w-20 h-20 ">
                  <img
                    className=" w-20 h-20 aspect-square"
                    width={50}
                    height={20}
                    src={image ? image : item.logoFile}
                    alt="Uploaded"
                  />
                  <div
                    onClick={() => setImage(null)}
                    className=" group flex justify-center items-center absolute top-0 w-full h-full bg-sky-300 bg-opacity-10 hover:bg-opacity-50 transition-all"
                  >
                    <MdDeleteForever className=" text-3xl text-red-600 opacity-0 transition-all group-hover:opacity-100 " />
                  </div>
                </div>
              ) : (
                <input
                  className=" w-full border shadow-md rounded-lg p-3"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              )}{" "}
            </div>
            <div className="  w-full flex justify-center items-center">
              <button
                onClick={handleSubmit}
                className=" flex justify-center items-center min-h-10 w-1/3 gap-2 rounded-lg bg-[#005DAD] text-white"
              >
                {isLoading ? <SyncLoader color="white" size={10} /> : "ثبت"}
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSpecialtiesCategory;

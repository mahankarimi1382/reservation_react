import React, { useState } from "react";
import logo from "../../assets/Pics/logo-doctor.png";
import { add_specialties, edit_specialties } from "../../api/ApiCalling";
import { nationalCodeStorage } from "../../store/Store";
import { SyncLoader } from "react-spinners";
import { MdDeleteForever } from "react-icons/md";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { Eror } from "../ToastAlerts";

function SubmitSpecialtiesModal({ setIsAddSpecialModal, item, setItem }) {
  console.log(item);
  const { userName } = nationalCodeStorage();
  const [specialName, setSpecialName] = useState(item ? item.name : "");
  const [maxa, setMaxa] = useState(item ? item.maxa : "");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(item ? item.logoFile : null);
  const [maxaName, setMaxaName] = useState(item ? item.maxaName : "");
  console.log(image);
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
  const data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: userName,
    },
    id: item && item.id,
    name: specialName,
    maxa,
    maxaName,
    logoFile: image,
  };
  return (
    <div className=" z-20  w-screen h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className=" w-1/3 h-[80%] rounded-xl p-3 bg-white flex flex-col items-center">
        <div className=" relative w-full justify-center items-center flex">
          <img src={logo} alt="logo" width={67} />
          <RxCross2
            onClick={() => setIsAddSpecialModal(false)}
            className=" cursor-pointer absolute left-1 top-1 "
          />
        </div>
        <div className=" w-full flex gap-2 p-2 flex-col">
          <h5 className=" text-lg">کد مکسا :</h5>
          <input
            value={maxa}
            onChange={(e) => setMaxa(e.target.value)}
            className=" border shadow-md rounded-lg p-3"
          />
        </div>
        <div className=" w-full flex gap-2 p-2 flex-col">
          <h5 className=" text-lg">عنوان مکسا :</h5>
          <input
            value={maxaName}
            onChange={(e) => setMaxaName(e.target.value)}
            className=" border shadow-md rounded-lg p-3"
          />
        </div>
        <div className=" w-full flex gap-2 p-2 flex-col">
          <h5 className=" text-lg">عنوان تخصص</h5>
          <input
            value={specialName}
            onChange={(e) => setSpecialName(e.target.value)}
            className=" border shadow-md rounded-lg p-3"
          />
        </div>
        <div className=" w-full flex gap-2 p-2 flex-col">
          <h5 className=" text-lg">ویرایش آیکون :</h5>

          <div className=" w-full flex  justify-center items-center">
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
        </div>
        <button
          onClick={() => {
            if (specialName && maxa && image) {
              setItem();
              item
                ? edit_specialties(data, setIsLoading, setIsAddSpecialModal)
                : add_specialties(data, setIsLoading, setIsAddSpecialModal);
            } else {
              ErrorHandler("empty value");
            }
          }}
          className=" flex justify-center items-center min-h-10 w-1/3 gap-2 rounded-lg bg-[#005DAD] text-white"
        >
          {isLoading ? <SyncLoader color="white" size={10} /> : "ثبت"}
        </button>{" "}
      </div>
    </div>
  );
}

export default SubmitSpecialtiesModal;

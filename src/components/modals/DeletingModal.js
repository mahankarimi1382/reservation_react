import React, { useState } from "react";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import { RxCross2 } from "react-icons/rx";
import { SyncLoader } from "react-spinners";

function DeletingModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(props);
  return (
    <div className=" w-screen z-10 h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className=" relative w-1/3 h-1/3 bg-white flex flex-col justify-center py-2 px-2 pb-5  items-center rounded-2xl">
        <RxCross2
          onClick={props.closeModal}
          className=" absolute left-2 top-2 cursor-pointer  text-xl text-[#717171] "
        />
        <img
          className=" absolute top-2"
          src={ModalLogo}
          alt="logo"
          width={67}
        />
        <div className=" w-full flex flex-col justify-center items-center gap-7 absolute bottom-5">
          <h5 className=" flex justify-center items-center gap-2 flex-wrap">
            {" "}
            آیا از حذف کردن
            <span className=" text-[#005DAD]">{props.name}</span>
            از لیست مطمئن هستید ؟
          </h5>
          <div className=" flex w-full justify-center items-center gap-3">
            <button
              onClick={() => {
                props.DeletingFn(
                  props.id,
                  props.setList,
                  props.closeModal,
                  setIsLoading,
                  props.list
                );
              }}
              className=" w-1/4 p-2 rounded-lg text-white bg-[#005DAD]"
            >
              {isLoading ? <SyncLoader color="white" size={10} /> : "بله"}
            </button>
            <button
              onClick={props.closeModal}
              className=" w-1/4 p-2 rounded-lg text-[#005DAD] border-2 border-[#005DAD]"
            >
              خیر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletingModal;

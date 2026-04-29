import React from "react";
import { RxCross2 } from "react-icons/rx";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import Confetti from "react-confetti";
import { fullNameStorage } from "../../store/Store";

function SuccessModal({ setIsSuccessModal }) {
  const {fullName}=fullNameStorage()
  console.log(fullName)
  const handleClose = () => {
    setIsSuccessModal(false);
  };
  return (
    <div
      className=" w-screen z-10 h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]"
    >
      <Confetti  numberOfPieces={200} gravity={0.05} />
      <div
        className=" w-[450px] h-[282px] bg-white flex flex-col justify-between py-2 px-2 pb-5  items-center rounded-2xl"
      >
        <div className=" w-full flex justify-end items-end">
          <RxCross2
            onClick={handleClose}
            className=" cursor-pointer  text-xl text-[#717171] "
          />
        </div>
        <img className=" -mt-20" src={ModalLogo} alt="logo" width={67} />
        <h5> {fullName=="string"?"کاربر":fullName} عزیز نظر شما با موفقیت ثبت شد </h5>
        <button
          onClick={handleClose}
          className=" w-[314px] p-2 rounded-lg text-white bg-[#005DAD]"
        >
          بازگشت
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;

import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ModalLogo from "../../assets/Pics/ModalLogo.png";
import Confetti from "react-confetti";
import { CitySelectInput, ProvinceSelectInput } from "../Inputs/Input";
import { myStore } from "../../store/Store";

function CitySelectModal({ closeModal }) {
  const { setProvinceId, setCityId } = myStore();
  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState("");
  console.log(province);
  const [city, setCity] = useState("");
  console.log(city);
  return (
    <div className=" w-screen z-50 h-screen left-0 bottom-0 top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className=" relative w-1/3 h-1/3 min-w-[300px] min-h-[250px] bg-white flex flex-col justify-center gap-5 py-2 px-2 pb-5  items-center rounded-2xl">
        <div className=" w-full flex justify-end items-end">
          <RxCross2
            onClick={closeModal}
            className=" cursor-pointer  absolute top-2 left-2  text-xl text-[#717171] "
          />
        </div>
        <img
          className=" absolute top-2"
          src={ModalLogo}
          alt="logo"
          width={67}
        />
        <div className=" flex justify-around items-center mt-5  w-full">
          <ProvinceSelectInput
            setProvince={setProvince}
            setCities={setCities}
          />

          <CitySelectInput fromFilter setCityId={setCity} cities={cities} />
        </div>
        <button
          onClick={() => {
            if (city) {
              setCityId(city);
              console.log("first");
            } else {
              console.log(province);
              setProvinceId(province);
            }
            closeModal();
          }}
          className=" w-[80%] p-2 rounded-lg bg-[#005DAD] text-white"
        >
          ثبت
        </button>
      </div>
    </div>
  );
}

export default CitySelectModal;

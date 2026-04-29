"use client";

import React from "react";
import layer from "../assets/Pics/Layer_1.png";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
function Baner({ pic, text }) {
  return (
    <div className="rounded-3xl  relative flex flex-col pointer-events-none">
      <img
        width={592}
        src={pic}
        alt="banner1"
        className=" w-full rounded-3xl object-cover"
      />
      <button className=" text-xs sm:text-base bottom-1 left-1 flex justify-center items-center gap-1 absolute z-10  px-4 bg-[#B0DAFF] p-2 rounded-full">
        کلینیک زیبایی
        <MdOutlineArrowCircleLeft />
      </button>
      <img
        className=" sm:block hidden absolute -bottom-1 -left-1"
        alt="layer"
        src={layer}
      />
    </div>
  );
}

export default Baner;

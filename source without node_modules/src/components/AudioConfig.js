"use client";
import React, { useRef, useState } from "react";
import snoop from "../assets/Snoop-Article---Image-1---Digital-Horizon.jpg";
import { RxCross2 } from "react-icons/rx";

function AudioConfig({ src }) {
  const audioRef = useRef(null);
  const [isshowmessage, setisshowmessage] = useState(false);

  return (
    <div
      onClick={() => {
        audioRef.current.play();
        setisshowmessage(!isshowmessage);
      }}
      className=" relative w-full h-screen flex justify-center items-center"
    >
      <RxCross2 className=" absolute left-3 top-3 text-3xl text-white" />
      <img alt="" className=" w-full h-screen" src={snoop} width={5000} />
      <div
        className={` flex-col absolute text-5xl bg-slate-500 bg-opacity-80 w-[80%] p-5 rounded-xl flex justify-center items-center bottom-10 transition-opacity duration-1000 ${
          isshowmessage ? "opacity-100" : "opacity-0"
        }`}
      >
        <h5 className=" text-base">developed by MAHAN</h5>
      </div>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={src} type="audio/mpeg" />
        مرورگر شما از تگ audio پشتیبانی نمی‌کند.
      </audio>
    </div>
  );
}

export default AudioConfig;

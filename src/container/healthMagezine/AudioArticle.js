import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import AudioPlayer from "./AudioPlayer";
import audiofile from "../../assets/testaudio.mp3";
import backache from "../../assets/Pics/healthmagezine-pics/backache.png";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

function AudioArticle() {
  return (
    <div className=" mb-20 w-full flex gap-5 flex-col">
      <div className=" text-lg w-full  flex justify-between items-center">
        <h5>مقالات صوتی دکتر رزرو</h5>
        <button className=" text-sm text-[#005DAD] flex justify-center items-center gap-1">
          مشاهده همه
          <IoIosArrowBack />
        </button>
      </div>
      <div className=" mb-10 w-full flex items-center justify-between">
        <div className=" shadow-md flex bg-white rounded-2xl">
          <img
            src={backache}
            alt="image"
            width={215}
            className=" rounded-xl"
          />
          <div className=" p-5 gap-8 flex flex-col items-start justify-center">
            <h5 className=" text-lg">درد کمر ناشی از نشستن های طولانی مدت</h5>
            <AudioPlayer audiofile={audiofile} width={350} />
            <div className=" w-full flex justify-end">
              <button className=" text-[#005DAD] flex justify-center items-center gap-1">
                صوت کامل مقاله
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </div>
        <div className=" shadow-md flex bg-white rounded-2xl">
          <img
            src={backache}
            alt="image"
            width={215}
            className=" rounded-xl"
          />
          <div className=" p-5 gap-8 flex flex-col items-start justify-center">
            <h5 className=" text-lg">درد کمر ناشی از نشستن های طولانی مدت</h5>
            <AudioPlayer audiofile={audiofile} width={350} />
            <div className=" w-full flex justify-end">
              <button className=" text-[#005DAD] flex justify-center items-center gap-1">
                صوت کامل مقاله
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className=" text-[#005DAD] flex gap-1 justify-center items-center">
        مشاهده بیشتر مقالات
        <IoIosArrowDown />
      </button>
    </div>
  );
}

export default AudioArticle;

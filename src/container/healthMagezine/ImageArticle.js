import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import earache from "../../assets/Pics/healthmagezine-pics/earache.png";
import { FaPlay } from "react-icons/fa";

function ImageArticle() {
  const posters = [
    {
      id: 1,
      image: "https://example.com/image1.jpg",
    },
    {
      id: 2,
      image: "https://example.com/image2.jpg",
    },
    {
      id: 3,
      image: "https://example.com/image3.jpg",
    },
  ];
  return (
    <div className=" w-full flex gap-5 flex-col">
      <div className=" text-lg w-full flex justify-between items-center">
        <h5>مقالات تصویری دکتر رزرو</h5>
        <button className=" text-sm text-[#005DAD] flex justify-center items-center gap-1">
          مشاهده همه
          <IoIosArrowBack />
        </button>
      </div>
      <div className=" w-full justify-between flex items-center">
        {posters.map((item) => {
          return (
            <div
              className=" relative flex justify-center items-center flex-col"
              key={item.id}
            >
              <img
                className=" rounded-xl"
                width={400}
                alt="image"
                src={earache}
              />
              <span className=" p-7 rounded-full bg-[rgba(255,255,255,0.75)] absolute">
                <FaPlay className=" text-4xl text-[#005DAD]" />
              </span>
              <div className=" mx-2 bottom-1 absolute bg-[rgba(255,255,255,0.75)] flex flex-col gap-2 rounded-xl p-1">
                <h5 className=" font-semibold">گوش درد های بعد استخر</h5>
                <p>
                  خیلی از افراد به این مشکل دچار هستند که بعد از شنا در استخر
                  دچار گوش درد می شوند این مشکل به چند دلیل پیش میاد با دیدن این
                  مقاله می توانید راهکار مشکلات را پیدا کنید.{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageArticle;

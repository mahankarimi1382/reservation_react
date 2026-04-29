import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import articleImg from "../../assets/Pics/healthmagezine-pics/articleImage.png";
import secondImg from "../../assets/Pics/healthmagezine-pics/articleSecondImage.png";
import { CiBookmark } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";

function ArticleSection() {
  const articles = [
    {
      id: 1,
      title: "سر درد های مزمن",
      caption:
        "سردرد ها تابستانی نشات گرفته از اشعات خورشید هستند به دلیل طولانی ماندن در زیر خورشید که این مشکل......",
      doctor: "دکتر فریبا هندسی",
      skill: "متخصص مغز و اعصاب",
      date: "1403/6/25",
      img1: "",
      img2: "",
    },
    {
      id: 2,
      title: "سر درد های مزمن",
      caption:
        "سردرد ها تابستانی نشات گرفته از اشعات خورشید هستند به دلیل طولانی ماندن در زیر خورشید که این مشکل......",
      doctor: "دکتر فریبا هندسی",
      skill: "متخصص مغز و اعصاب",
      date: "1403/6/25",
      img1: "",
      img2: "",
    },
    {
      id: 3,
      title: "سر درد های مزمن",
      caption:
        "سردرد ها تابستانی نشات گرفته از اشعات خورشید هستند به دلیل طولانی ماندن در زیر خورشید که این مشکل......",
      doctor: "دکتر فریبا هندسی",
      skill: "متخصص مغز و اعصاب",
      date: "1403/6/25",
      img1: "",
      img2: "",
    },
    {
      id: 4,
      title: "سر درد های مزمن",
      caption:
        "سردرد ها تابستانی نشات گرفته از اشعات خورشید هستند به دلیل طولانی ماندن در زیر خورشید که این مشکل......",
      doctor: "دکتر فریبا هندسی",
      skill: "متخصص مغز و اعصاب",
      date: "1403/6/25",
      img1: "",
      img2: "",
    },
  ];
  return (
    <div className=" gap-5 w-full flex flex-col">
      <div className=" text-lg w-full flex justify-between items-center">
        <h5>جدیدترین مقالات</h5>
        <button className=" text-sm text-[#005DAD] flex justify-center items-center gap-1">
          مشاهده همه
          <IoIosArrowBack />
        </button>
      </div>
      <div className=" flex justify-between gap-4 flex-wrap">
        {articles.map((item) => {
          return (
            <div
              className=" p-3 gap-3  w-[49%] rounded-xl bg-white flex"
              key={item.id}
            >
              <img
                className=" rounded-xl"
                src={articleImg}
                alt="img"
                width={211}
              />
              <div className=" flex flex-col">
                <h5 className=" font-semibold">{item.title}</h5>
                <p className=" text-[rgba(62,50,50,0.75)]">{item.caption}</p>
                <div className=" flex w-full justify-end">
                  <button className=" text-[#005DAD] font-semibold">
                    مشاهده مقاله
                  </button>
                </div>
                <div className=" gap-2 rounded-xl bg-[rgba(219,215,215,0.43)] w-full items-start p-2 flex">
                  <img
                    className=" rounded-xl"
                    src={secondImg}
                    alt="img"
                    width={51}
                  />
                  <div className=" w-full flex justify-between items-center">
                    <div className=" flex flex-col items-start justify-center gap-1">
                      <h5 className=" font-semibold">{item.doctor}</h5>
                      <p className=" text-sm text-[#4E4E4E]">{item.skill}</p>
                      <p className=" text-sm text-[#4E4E4E]">
                        تاریخ انتشار {item.date}
                      </p>
                    </div>
                    <div className=" text-2xl flex justify-center items-center gap-1">
                      <CiShare2 />
                      |
                      <CiBookmark />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArticleSection;

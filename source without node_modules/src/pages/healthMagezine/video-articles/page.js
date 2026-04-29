import Navbar from "../../../components/Navbar";
import TopSwipper from "../../../container/healthMagezine/healthTopSwipper";
import React from "react";
import Img from "../../../assets/Pics/healthmagezine-pics/downsyndrom.png";
import audiofile from "../../../assets/testaudio.mp3";
import { CiBookmark } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import secondImg from "../../../assets/Pics/healthmagezine-pics/articleSecondImage.png";
import { FaPlay } from "react-icons/fa";

import { CiSearch } from "react-icons/ci";
import toothPoster from "../../../assets/Pics/healthmagezine-pics/toothposter.png";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { ImTelegram } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import guysMessage from "../../../assets/Pics/healthmagezine-pics/messagetwoguys.png";
import toothArticleImage from "../../../assets/Pics/healthmagezine-pics/tooothArticleImage.png";
import videocover from "../../../assets/Pics/healthmagezine-pics/videoArticleCover.png";
import AudioPlayer from "../../../container/healthMagezine/AudioPlayer";
function page() {
  const articles = [
    {
      id: 1,
      title: "محدوده قند خون نرمال",
      caption:
        "راه های کنترل قند خون و پیشگیری از دیابت برای پیشگیری از بیماری دیابت (Diabetes) و جلوگیری از ظهور عوارض…",
      img: videocover,
    },
    {
      id: 2,
      title: "محدوده قند خون نرمال",
      caption:
        "راه های کنترل قند خون و پیشگیری از دیابت برای پیشگیری از بیماری دیابت (Diabetes) و جلوگیری از ظهور عوارض…",
      img: videocover,
    },
    {
      id: 3,
      title: "محدوده قند خون نرمال",
      caption:
        "راه های کنترل قند خون و پیشگیری از دیابت برای پیشگیری از بیماری دیابت (Diabetes) و جلوگیری از ظهور عوارض…",
      img: videocover,
    },
    {
      id: 4,
      title: "محدوده قند خون نرمال",
      caption:
        "راه های کنترل قند خون و پیشگیری از دیابت برای پیشگیری از بیماری دیابت (Diabetes) و جلوگیری از ظهور عوارض…",
      img: videocover,
    },
    {
      id: 5,
      title: "محدوده قند خون نرمال",
      caption:
        "راه های کنترل قند خون و پیشگیری از دیابت برای پیشگیری از بیماری دیابت (Diabetes) و جلوگیری از ظهور عوارض…",
      img: videocover,
    },
    {
      id: 6,
      title: "محدوده قند خون نرمال",
      caption:
        "راه های کنترل قند خون و پیشگیری از دیابت برای پیشگیری از بیماری دیابت (Diabetes) و جلوگیری از ظهور عوارض…",
      img: videocover,
    },
  ];
  return (
    <div
      dir="rtl"
      className=" gap-5  bg-[#F5F5F5] items-center justify-center w-full flex flex-col"
    >
      <Navbar />
      <TopSwipper />
      <div className="flex mt-5 mb-20 w-[90%] justify-between">
        <div className=" w-2/3 items-start flex flex-col gap-5">
          <div className=" items-end flex gap-10">
            <div className=" flex flex-col items-start justify-center gap-3">
              <h5 className=" font-semibold">دسته بندی</h5>
              <select className=" p-3 px-5 rounded-lg shadow-md">
                <option>دهان و دندان</option>
              </select>
            </div>
            <div className=" flex flex-col items-start justify-center gap-5">
              <h5 className=" font-semibold">مرتب سازی</h5>
              <select className=" p-3 px-5 rounded-lg shadow-md">
                <option>مقالات صوتی</option>
              </select>
            </div>
            <label className=" h-10 px-3 rounded-xl flex justify-between items-center bg-white w-full">
              <input
                placeholder="جستجو مقاله ، نویسنده"
                className=" w-full h-full"
              />
              <CiSearch className=" text-3xl text-[#7D7D7D]" />
            </label>
          </div>
          <div className=" flex flex-col relative justify-center items-center">
            <img
              src={toothPoster}
              alt="poster"
              width={870}
              className=" rounded-xl"
            />
            <div className=" absolute right-24 gap-3 mt-10 items-start flex flex-col">
              <h2 className=" text-2xl text-white">دهان و دندان</h2>
              <h4 className=" bg-white text-[#0387F4] p-3 rounded-xl">
                دریافت نوبت حضوری از بهترین متخصصان دهان و دندان
              </h4>
              <h4 className=" bg-white text-[#0387F4] p-3 rounded-xl">
                ویزیت آنلاین دندانپزشکی
              </h4>
            </div>
          </div>
          <div className=" flex flex-wrap items-center gap-6">
            {articles.map((item) => {
              return (
                <div
                  key={item.id}
                  className=" bg-white rounded-xl w-[30%] flex flex-col"
                >
                  <div className=" flex flex-col justify-center items-center relative">
                    <img alt="image" className=" rounded-xl" src={item.img} />
                    <span className=" p-4 rounded-full bg-[rgba(255,255,255,0.75)] absolute">
                      <FaPlay className=" text-3xl text-[#005DAD]" />
                    </span>
                  </div>
                  <div className=" w-full gap-2 flex flex-col p-3">
                    <div className=" text-xl flex justify-end items-center gap-1">
                      <AiOutlineHeart />
                      |
                      <CiShare2 />
                      |
                      <CiBookmark />
                    </div>
                    <p className=" text-[#7D7D7D]">{item.caption}</p>
                    <div className=" flex w-full justify-end items-center">
                      <button className=" text-[#005DAD]">
                        مشاهده کامل مقاله
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" w-[30%] flex flex-col gap-5 items-center">
          <div className="shadow-lg gap-5 w-full bg-white rounded-xl flex justify-center items-center p-5 flex-col">
            <h5>دکتر رزرو را در پلتفرم های مختلف دنبال کنید</h5>
            <div className=" flex flex-wrap gap-5 justify-center">
              <div className=" flex justify-center px-4 p-2 items-center gap-3 rounded-lg bg-[rgba(196,226,255,0.33)] text-[#005DAD]">
                LinkedIn
                <FaLinkedin className=" text-3xl" />
              </div>
              <div className=" flex justify-center px-4 p-2 items-center gap-3 rounded-lg bg-[rgba(196,226,255,0.33)] text-[#005DAD]">
                Telegram
                <ImTelegram className=" text-3xl" />
              </div>
              <div className=" flex justify-center px-4 p-2 items-center gap-3 rounded-lg bg-[rgba(196,226,255,0.33)] text-[#005DAD]">
                youtube
                <FaYoutube className=" text-3xl" />
              </div>
              <div className=" flex justify-center px-4 p-2 items-center gap-3 rounded-lg bg-[rgba(196,226,255,0.33)] text-[#005DAD]">
                instagram
                <BiLogoInstagramAlt className=" text-3xl" />
              </div>
            </div>
          </div>
          <div className=" relative flex flex-col w-full justify-center items-center">
            <div className="  w-full bg-[rgba(199,227,254,0.8)] h-[216px] rounded-xl" />
            <div className=" absolute top-5 gap-3 bg-white rounded-xl p-5 justify-center items-center w-[90%] flex flex-col">
              <img src={guysMessage} alt="image" width={160} />
              <h3 className=" text-center">
                آیا می خواهید زودتر از مقالات جدید دکتر رزرو باخبر شوید؟
              </h3>
              <p className=" text-sm text-[#4E4E4E]">
                پس لطفا ایمیل خود را وارد کنید تا از مقالات جدید مطلع شوید
              </p>
              <input
                className=" text-center w-[90%] h-[38px] rounded-lg text-lg border-[#005DAD] border"
                placeholder="ایمیل خود را وارد کنید"
              />
              <button className=" p-3 w-[90%] bg-[#005DAD] rounded-lg text-white">
                ارسال
              </button>
              <div className=" w-[90%] justify-start flex items-center gap-2">
                <input type="checkbox" />
                <h5 className=" text-[#7E7E7E]">با شرایط و ضوابط موافقم</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

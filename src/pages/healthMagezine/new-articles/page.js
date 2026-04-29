import Navbar from "../../../components/Navbar";
import TopSwipper from "../../../container/healthMagezine/healthTopSwipper";
import React from "react";
import { CiSearch } from "react-icons/ci";
import Img from "../../../assets/Pics/healthmagezine-pics/downsyndrom.png";
import secondImg from "../../../assets/Pics/healthmagezine-pics/articleSecondImage.png";
import { CiBookmark } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { ImTelegram } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import guysMessage from "../../../assets/Pics/healthmagezine-pics/messagetwoguys.png";
function page() {
  const articles = [
    {
      id: 1,
      title: "سندرم داون یا نشانگان داون",
      caption:
        "بیماری ژنتیکی است که به دلیل حضور تمام یا بخشی از یک کروموزوم اضافی در جفت کروموزوم ۲۱ به وجود می‌آید که در اصطلاح علمی تریزومی ۲۱ نامیده می‌شود. این بیماری دارای علائم مختلف از جمله ناهنجاری‌های عمده یا خفیف در ساختار یا عملکرد ارگان‌ها می‌باشد. از جمله علائم عمده و زودرس که تقریباً در همه بیماران مشاهده می‌شود وجود....",
      doctor: "دکتر فریبا هندسی",
      skill: "متخصص مغز و اعصاب",
      date: "1403/6/25",
      Category: "دارو",
      img1: Img,
      img2: secondImg,
    },
    {
      id: 2,
      title: "سندرم داون یا نشانگان داون",
      caption:
        "بیماری ژنتیکی است که به دلیل حضور تمام یا بخشی از یک کروموزوم اضافی در جفت کروموزوم ۲۱ به وجود می‌آید که در اصطلاح علمی تریزومی ۲۱ نامیده می‌شود. این بیماری دارای علائم مختلف از جمله ناهنجاری‌های عمده یا خفیف در ساختار یا عملکرد ارگان‌ها می‌باشد. از جمله علائم عمده و زودرس که تقریباً در همه بیماران مشاهده می‌شود وجود....",
      doctor: "دکتر فریبا هندسی",
      skill: "متخصص مغز و اعصاب",
      date: "1403/6/25",
      Category: "دارو",
      img1: Img,
      img2: secondImg,
    },
    {
      id: 3,
      title: "سندرم داون یا نشانگان داون",
      caption:
        "بیماری ژنتیکی است که به دلیل حضور تمام یا بخشی از یک کروموزوم اضافی در جفت کروموزوم ۲۱ به وجود می‌آید که در اصطلاح علمی تریزومی ۲۱ نامیده می‌شود. این بیماری دارای علائم مختلف از جمله ناهنجاری‌های عمده یا خفیف در ساختار یا عملکرد ارگان‌ها می‌باشد. از جمله علائم عمده و زودرس که تقریباً در همه بیماران مشاهده می‌شود وجود....",
      doctor: "دکتر فریبا هندسی",
      skill: "متخصص مغز و اعصاب",
      date: "1403/6/25",
      Category: "دارو",
      img1: Img,
      img2: secondImg,
    },
    {
      id: 4,
      title: "سندرم داون یا نشانگان داون",
      caption:
        "بیماری ژنتیکی است که به دلیل حضور تمام یا بخشی از یک کروموزوم اضافی در جفت کروموزوم ۲۱ به وجود می‌آید که در اصطلاح علمی تریزومی ۲۱ نامیده می‌شود. این بیماری دارای علائم مختلف از جمله ناهنجاری‌های عمده یا خفیف در ساختار یا عملکرد ارگان‌ها می‌باشد. از جمله علائم عمده و زودرس که تقریباً در همه بیماران مشاهده می‌شود وجود....",
      doctor: "دکتر فریبا هندسی",
      skill: "متخصص مغز و اعصاب",
      date: "1403/6/25",
      Category: "دارو",
      img1: Img,
      img2: secondImg,
    },
  ];
  return (
    <div
      dir="rtl"
      className=" gap-5  bg-[#F5F5F5] items-center justify-center w-full flex flex-col"
    >
      <Navbar />
      <TopSwipper />
      <div className="flex mb-20 w-[90%] justify-between">
        <div className=" w-2/3 flex flex-col gap-5 justify-center items-center">
          <label className=" shadow-lg px-3  items-center h-[64px] flex justify-between w-full bg-white rounded-lg">
            <input
              className=" w-full outline-none"
              placeholder="جستجو مطالب یا مقاله جدید"
            />
            <CiSearch className=" text-xl p-2 rounded-lg h-12 w-12 text-white bg-[#005DAD]" />
          </label>
          <div className=" flex flex-col gap-5">
            {articles.map((item) => {
              return (
                <div
                  key={item.id}
                  className=" shadow-lg p-3 w-full gap-3 bg-white rounded-xl flex"
                >
                  <img
                    src={Img}
                    width={220}
                    alt="imge"
                    className=" rounded-xl"
                  />
                  <div className=" flex flex-col gap-2">
                    <h3 className=" text-lg font-semibold">{item.title}</h3>
                    <p className=" text-[#4E4E4E]">{item.caption}</p>
                    <div className=" flex w-full justify-between items-end">
                      <div className=" w-[60%] gap-2 rounded-xl bg-[rgba(219,215,215,0.43)] items-start p-2 flex">
                        <img
                          className=" rounded-xl"
                          src={secondImg}
                          alt="img"
                          width={51}
                        />
                        <div className=" w-full flex justify-between items-center">
                          <div className=" flex flex-col items-start justify-center gap-1">
                            <h5 className=" font-semibold">{item.doctor}</h5>
                            <p className=" text-sm text-[#4E4E4E]">
                              {item.skill}
                            </p>
                            <p className=" text-sm text-[#4E4E4E]">
                              تاریخ انتشار {item.date}
                            </p>
                          </div>
                          <div className=" flex flex-col justify-center items-end">
                            <div className=" flex justify-center items-center gap-1">
                              <h5>دسته بندی مقاله: </h5>
                              <p>{item.Category}</p>
                            </div>
                            <div className=" text-2xl flex justify-center items-center gap-1">
                              <AiOutlineHeart />
                              |
                              <CiShare2 />
                              |
                              <CiBookmark />
                            </div>
                          </div>
                        </div>
                      </div>
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

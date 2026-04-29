import Navbar from "../../components/Navbar";
import React from "react";
import doctorAvatar from "../../assets/Pics/doctorLoginAvatar.png";
import { IoIosArrowBack } from "react-icons/io";
import peopleIcon from "../../assets/Pics/people-blue.png";
import trendDownIcon from "../../assets/Pics/volume-high-icon.png";
import volumeIcon from "../../assets/Pics/trend-down-icon.png";
import monitorIcon from "../../assets/Pics/monitor-mobbile.png";
import Footer from "../../components/Footer";
import {
  DoctorLoginButt,
  DoctorsSignUpButt,
} from "../../components/Buttons/Button";
const cards = [
  {
    id: 1,
    title: "کاهش نرخ کنسلی",
    icon: trendDownIcon,
    caption:
      "پرداخت حق ویزیت به صورت آنلاین باعث شده تا تنها بیمارانی اقدام به دریافت نوبت کنند که واقعا قصد مراجعه به مطب را دارند. این موضوع شما را در بهبود مدیریت مطب و کاهش عدم مراجعه یاری می دهد.",
  },
  {
    id: 2,
    title: "تبلیغات",
    icon: volumeIcon,
    caption:
      "میلیون ها بیماری که ماهانه به وبسایت دکتر رزرو مراجعه می کنند می توانند شما را در جایگاه های تبلیغاتی متنوع آن مشاهده کرده و با شما ارتباط بگیرند.",
  },
  {
    id: 3,
    title: "مشاوره حضوری",
    icon: peopleIcon,
    caption:
      "روزها و ساعاتی که تمایل به ویزیت بیمار دارید بر روی صفحه اختصاصی شما در دکتر رزرو قرار میگیرد. بیماران بعد از رزرو نوبت و پرداخت مبلغ ویزیت در مطب حاضر خواهند شد.",
  },
  {
    id: 4,
    title: "مشاوره آنلاین",
    icon: monitorIcon,
    caption:
      "بدون حضور در مطب و در هر زمان و مکانی با بیماران بصورت غیرحضوری در ارتباط باشید.اتاق مشاوره دکتر رزرو امکان مشاوره تلفنی، ویدئویی و متنی را در بستری امن و بدون مشخص شدن شماره شما فراهم می کند",
  },
];
function page() {
  return (
    <div
      dir="rtl"
      className=" w-full flex flex-col justify-center items-center"
    >
      <Navbar />
      <div className=" w-[90%] gap-3 lg:gap-10 flex flex-col items-center">
        <div className=" w-full rounded-xl lg:gap-10  px-3 pt-1 lg:pt-0 lg:p-0 bg-[#DBEDFF] items-end flex lg:px-5">
          <img
            className=" lg:w-[305px] w-[75px] lg:h-full h-[111px]"
            src={doctorAvatar}
            alt="doctor-avatar"
            width={305}
          />
          <div className=" pb-1  flex flex-col justify-center items-start gap-1 lg:gap-10 w-[80%]">
            <h2 className=" lg:text-2xl">عضویت پزشک در دکتر رزرو</h2>
            <p className=" text-[11px] lg:text-lg">
              دکتر رزرو پلتفرم رزرو آنلاین پزشک به صورت حضوری و مشاوره آنلاین.
              با ثبت درخواست برای عضویت در دکتر رزرو، صفحه نوبت دهی اختصاصی شما
              ساخته می شود و بیماران میتوانند در زمان جست و جوی نام شما نوبت خود
              را نیز خریداری کنند.
            </p>
            <div className=" w-full flex items-center gap-3 lg:gap-10">
              {/* <Link
                href="doctor-login/signup-form"
                className=" text-lg flex justify-center items-center gap-3 px-16 p-2 text-white bg-[#005DAD] rounded-lg"
              >
                عضویت پزشکان
                <IoIosArrowBack />
              </Link> */}
              <DoctorsSignUpButt />
              <DoctorLoginButt />
            </div>
          </div>
        </div>
        <h2 className=" lg:text-2xl ">خدمات دکتر رزرو برای پزشکان</h2>
        <div className=" flex lg:flex-row gap-5 lg:gap-0 flex-col justify-between w-full items-center ">
          {cards.map((item) => {
            return (
              <div
                key={item.id}
                className=" border-[#BAD6FB] border-2 shadow-md lg:w-[302px] lg:aspect-square rounded-xl flex flex-col items-center justify-start gap-2 lg:gap-5 p-2 lg:p-4"
              >
                <img className=" w-[32px] lg:w-[56px]" src={item.icon} width={56} alt="icon" />
                <h4 className=" lg:text-xl text-[#005DAD]">{item.title}</h4>
                <p className=" lg:text-base text-sm text-[#7D7D7D]">{item.caption}</p>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default page;

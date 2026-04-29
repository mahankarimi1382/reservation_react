import Navbar from "../../components/Navbar";
import React from "react";
import rightPhone from "../../assets/Pics/about-us/Iphone 14 - 2.png";
import leftPhone from "../../assets/Pics/about-us/Iphone 14 - 1.png";
import BackPoster from "../../assets/Pics/about-us/Frame 1006.png";
import walletImg from "../../assets/Pics/about-us/Rectangle.png";
import blueCard from "../../assets/Pics/about-us/Illustration.png";
import arrow from "../../assets/Pics/about-us/Vector 19.png";
import coins from "../../assets/Pics/about-us/realistic-gold-coins-background_485157-8-removebg-preview 1.png";
import handCoin from "../../assets/Pics/about-us/3d-illustration-hand-with-money-white-removebg-preview 1.png";
import arrow2 from "../../assets/Pics/about-us/Vector 20.png";
import giftImg from "../../assets/Pics/about-us/istockphoto-2181311397-612x612-removebg-preview 1.png";
import disCountImg from "../../assets/Pics/about-us/istockphoto-1470735091-612x612-removebg-preview 1.png";
import Footer from "../../components/Footer";
function page() {
  return (
    <div className=" lg:gap-14 gap-4 flex flex-col" dir="rtl">
      <Navbar />
      <h5 className=" mx-auto text-[#005DAD] lg:hidden lg:text-3xl">
        درباره دکتر رزرو
      </h5>
      <div className=" mt-2 lg:hidden flex justify-end">
        <p className="flex w-[60%] lg:tracking-wide text-[8px] lg:text-lg lg:leading-[3]">
          لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و
          بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح
          گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و
          ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا
          از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا
          طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی
          استفاده می‌کنند{" "}
        </p>
        <div className=" flex items-end justify-end ">
          <img
            alt="phone"
            width={138}
            className=" w-[50px]"
            src={rightPhone}
          />
          <img alt="phone" width={164} className="w-[65px]" src={leftPhone} />
        </div>
      </div>
      <div className=" w-full flex justify-start">
        <div className=" relative w-[90%] flex lg:p-4 lg:px-12 bg-[#C4E2FF] rounded-l-full">
          <div className=" lg:gap-4 lg:w-[70%] flex flex-col">
            <h5 className=" text-[#005DAD] hidden lg:text-3xl">
              درباره دکتر رزرو
            </h5>
            <p className=" hidden lg:flex lg:tracking-wide text-xs lg:text-lg lg:leading-[3]">
              لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و
              بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح
              گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و
              ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید،
              تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.
              معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و
              بی‌معنی استفاده می‌کنند{" "}
            </p>
          </div>
          <div className=" hidden absolute lg:flex items-end justify-center left-20 top-0 ">
            <img alt="phone" width={138} src={rightPhone} />
            <img alt="phone" className="" width={164} src={leftPhone} />
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center">
        <h5 className=" lg:text-3xl">
          ویژگی های خاص <span className=" text-[#005DAD]">دکتر رزرو</span>
        </h5>
      </div>
      <div className=" w-full justify-center  flex relative">
        <img
          className=" -z-10 absolute left-0"
          width={608}
          src={BackPoster}
          alt="poster"
        />
        <div className=" flex flex-col lg:mt-20 lg:gap-10 items-center lg:w-[60%] ">
          <img
            className=" hidden lg:flex absolute top-0 -mr-24"
            src={arrow}
            alt="arrow"
            width={631}
          />
          <div className=" w-full">
            <h5 className=" hidden lg:flex text-[#005DAD] text-xl">دکتر رزرو</h5>
          </div>
          <div className=" w-full flex items-center justify-between">
            <img src={walletImg} className=" w-[120px] lg:w-[368px]" alt="iimg" width={368} />
            <div className=" relative rounded-xl lg:p-3 p-2 lg:w-[35%] lg:gap-4 gap-2 bg-[#DFE6FF] bg-opacity-70 shadow-lg flex flex-col">
              <img
                className=" absolute w-[100px] lg:w-[205px] lg:-left-20 left-2 lg:bottom-10 bottom-14 -z-10"
                src={blueCard}
                alt="img"
                width={205}
              />
              <h5 className=" text-[#005DAD]">کیف پول</h5>
              <p className=" lg:text-base text-[10px]">
                کاربر عزیز دکتر رزرو این امکان را به شما می دهد که با گذاشتن پول
                خود در کیف پول دکتر رزرو سود دریافت کنید پس چی از این بهتر همیت
                حالا کیف پول خود را شارژ کنید و در ازای آن سود دریافت کنید
              </p>
              <button className=" text-white bg-[#005DAD] lg:text-base text-sm rounded-lg p-1 lg:p-2">
                شارژ کیف پول
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full lg:mt-40 justify-center  flex relative">
        <img
          className=" -z-10 absolute right-5 rotate-90"
          width={608}
          src={BackPoster}
          alt="poster"
        />
        <div className=" flex flex-col lg:mt-20 gap-10 items-center w-full lg:w-[60%] ">
          <img
            className=" hidden lg:flex absolute top-0 -mr-24"
            src={arrow2}
            alt="arrow"
            width={631}
          />
          <div className=" w-full">
            <h5 className=" hidden lg:flex justify-end gap-1  text-xl">
              امتیاز <span className="text-[#005DAD]">دکتر رزرو</span>
            </h5>
          </div>
          <div className=" w-full flex items-center justify-between">
            <div className=" relative rounded-xl p-2 lg:p-3 lg:w-[35%] gap-2 lg:gap-4 bg-[#DFE6FF] bg-opacity-70 shadow-lg flex flex-col">
              <img
                className=" lg:flex hidden absolute -right-20 -top-32 top -z-10"
                src={coins}
                alt="img"
                width={562}
              />

              <h5 className=" text-[#005DAD]">امتیاز</h5>
              <p className=" lg:text-base text-[10px]">
                کاربر عزیز شما در دکتر رزرو می توانید با هربار رزرو خود امتیاز
                کسب کنید و از امتیاز های خود استفاده کنید پس اگر هنوز عضو دکتر
                رزرو نشده اید همین الان عضو شوید تا از خدمات ویژه ما بهره مند
                شوید.{" "}
              </p>
              <button className=" text-white bg-[#005DAD] rounded-lg lg:text-base text-sm p-1 lg:p-2">
                عضویت
              </button>
            </div>
            <img src={handCoin} className=" lg:w-[368px] w-[150px]" alt="iimg" width={368} />
          </div>
        </div>
      </div>
      <div className=" w-full justify-center lg:mt-20  flex relative">
        <img
          className=" -z-10 absolute left-0"
          width={608}
          src={BackPoster}
          alt="poster"
        />
        <div className=" flex flex-col lg:mt-20 mt-10 lg:gap-10 items-center w-full lg:w-[60%] ">
          <img
            className=" hidden lg:flex absolute top-0 -mr-24"
            src={arrow}
            alt="arrow"
            width={631}
          />
          <div className=" w-full">
            <h5 className=" hidden lg:flex gap-1  text-xl">
              کد تخفیف <span className="text-[#005DAD]">دکتر رزرو</span>
            </h5>{" "}
          </div>
          <div className=" w-full flex items-center justify-between">
            <img src={giftImg} className=" w-[120px] lg:w-[368px]" alt="iimg" width={368} />
            <div className=" relative rounded-xl p-2 lg:p-3 lg:w-[35%] gap-2 lg:gap-4 bg-[#DFE6FF] bg-opacity-70 shadow-lg flex flex-col">
              <img
                className=" absolute -left-20 bottom-10 -z-10"
                src={disCountImg}
                alt="img"
                
                width={205}
              />
              <h5 className=" text-[#005DAD]">کد تخفیف</h5>
              <p className=" text-[10px]">
                کاربر عزیز، در دکتر رزرو در پنل شما کد تخفیف های مختلف قرار داده
                می شود که شما با توجه به امتیاز هایی که دارید می توانید از کد
                تخفیف ها استفاده کنید که این تخفیف ها شامل تمام تخصص ها می باشد.
              </p>
              <button className=" text-white bg-[#005DAD] rounded-lg p-1 text-sm lg:text-base lg:p-2">
                کد تخفیف ها
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;

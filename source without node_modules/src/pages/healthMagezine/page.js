import Navbar from "../../components/Navbar";
import TopSwipper from "../../container/healthMagezine/healthTopSwipper";
import React from "react";

import HealthPosterSwipper from "../../container/healthMagezine/HealthPosterSwipper";
import arayesho from "../../assets/Pics/healthmagezine-pics/arayeshi.png";
import bardar from "../../assets/Pics/healthmagezine-pics/bardar.png";
import poost from "../../assets/Pics/healthmagezine-pics/poost.png";
import CategorySection from "../../container/healthMagezine/CategorySection";
import ArticleSection from "../../container/healthMagezine/ArticleSection";
import FourPosterSection from "../../container/healthMagezine/FourPosterSection";
import ImageArticle from "../../container/healthMagezine/ImageArticle";
import AudioArticle from "../../container/healthMagezine/AudioArticle";

function page() {
  return (
    <div dir="rtl" className=" bg-[#F5F5F5] w-full flex items-center flex-col">
      <Navbar />
      <TopSwipper />

      <div className=" mt-5 gap-10 w-[90%] flex flex-col justify-center items-center">
        <h3 className=" text-xl font-medium">مجله های پر طرفدار</h3>
        <div className=" w-full flex justify-between items-center">
          <HealthPosterSwipper />
          <div className=" relative">
            <img width={268} alt="img" src={arayesho} />
            <div className=" rounded-xl gap-1 mx-2 bg-[rgba(255,255,255,0.75)] bottom-2 flex flex-col justify-center items-start p-2 absolute">
              <h3 className=" text-md font-semibold">
                پوست سالم ، اعتماد به نفس بالا
              </h3>
              <p className=" text-sm text-[#757575]">
                آیا می‌خواهید پوست و مویی سالم و زیبا داشته باشید؟و همچنین در
                کنارش اعتماد به نفس بالایی داشته باشید پس ما را بخوانید
              </p>
            </div>
          </div>
          <div className=" flex flex-col justify-between gap-3">
            <div className=" relative">
              <img width={268} alt="img" src={bardar} />
              <div className=" rounded-xl gap-1 mx-2 bg-[rgba(255,255,255,0.75)] bottom-2 flex flex-col justify-center items-start p-2 absolute">
                <h3 className=" text-md font-semibold">
                  بارداری سالم ، نوزاد بالا{" "}
                </h3>
                <p className=" text-sm text-[#757575]">
                  با مطالعه مقالات ما به مادری بهتری دست پیدا کنید و نوزادی سالم
                  داشته باشید.
                </p>
              </div>
            </div>
            <div className=" relative">
              <img width={268} alt="img" src={poost} />
              <div className=" rounded-xl gap-1 mx-2 bg-[rgba(255,255,255,0.75)] bottom-2 flex flex-col justify-center items-start p-2 absolute">
                <h3 className=" text-md font-semibold">پوست سالم </h3>
                <p className=" text-sm text-[#757575]">
                  با مطالعه مقالات ما پوست سالم و شاداب داشته باشید.
                </p>
              </div>
            </div>
          </div>
        </div>
        <CategorySection />
        <ArticleSection />
        <FourPosterSection />
        <ImageArticle />
        <AudioArticle />
      </div>
    </div>
  );
}

export default page;

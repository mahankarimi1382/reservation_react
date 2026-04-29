import Navbar from "../../components/Navbar";
import React from "react";
import avatar from "../../assets/Pics/contact-us/contact-us-page-avatar.png";
import Footer from "../../components/Footer";
import instagram from "../../assets/Pics/contact us icons/instagram.png";
import youtube from "../../assets/Pics/contact us icons/youtube.png";
import telegram from "../../assets/Pics/contact us icons/send-2.png";
import whatsapp from "../../assets/Pics/contact us icons/whatsapp.png";
import support from "../../assets/Pics/contact us icons/costumer-service 1.png";
import call from "../../assets/Pics/contact us icons/call-calling.png";
import Email from "../../assets/Pics/contact us icons/sms.png";

function page() {
  return (
    <div className=" lg:gap-14 gap-4 flex flex-col bg-[#F7F8F9]" dir="rtl">
      <Navbar />
      <div className=" w-full flex flex-col items-center gap-10">
        <div className=" w-[97%] flex flex-col gap-8">
          <h5 className=" text-[#005DAD] lg:text-5xl">تماس با ما</h5>
          <div className=" relative w-full flex lg:flex-row flex-col">
            <div className=" lg:w-1/2 flex flex-col gap-4">
              <h5 className=" text-center lg:text-start text-3xl text-[#414141] font-light">
                اگر انتقاد و پیشنهادی دارید میتونید با ما درمیان بزارید
              </h5>
              <p className=" text-center lg:text-start text-lg text-[#919191]">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان لازم است،{" "}
              </p>
            </div>
            <div className=" lg:w-1/2 p-10 w-[90%] mx-auto lg:mx-0 rounded-3xl bg-[#005DADF2] flex flex-col justify-center items-center">
              <img
                width={330}
                className=" lg:w-[330px] w-[200px]"
                src={avatar}
                alt="img"
              />
            </div>
            <div className=" bottom-0 p-2 lg:p-0 flex-col gap-10 lg:absolute lg:w-[800px] rounded-3xl items-center justify-center flex lg:mt-0 -mt-10 lg:h-[588px] bg-white">
              <div className=" w-full flex flex-wrap items-center gap-7 justify-center">
                <div className=" flex w-[90%]  lg:w-[40%] flex-col text-xl gap-2">
                  <h5 className=" text-[#919191]">نام</h5>
                  <input className=" p-2 w-full border-[#898989] bg-[#F1F1F1] border rounded-lg" />
                </div>
                <div className=" flex flex-col w-[90%]  lg:w-[40%] text-xl gap-2">
                  <h5 className=" text-[#919191]">نام خانوادگی</h5>
                  <input className=" p-2 w-full border-[#898989] bg-[#F1F1F1] border rounded-lg" />
                </div>
                <div className=" flex w-[90%]  lg:w-[40%] flex-col text-xl gap-2">
                  <h5 className=" text-[#919191]">ایمیل</h5>
                  <input className=" p-2 w-full border-[#898989] bg-[#F1F1F1] border rounded-lg" />
                </div>
                <div className=" flex w-[90%]  lg:w-[40%] flex-col text-xl gap-2">
                  <h5 className=" text-[#919191]">شماره تلفن</h5>
                  <input className=" p-2 w-full border-[#898989] bg-[#F1F1F1] border rounded-lg" />
                </div>
                <div className=" w-[90%] lg:w-[84%] flex flex-col text-xl gap-2">
                  <h5 className=" text-[#919191]">توضیحات</h5>
                  <textarea className="resize-none w-full p-2 border-[#898989] bg-[#F1F1F1] border rounded-lg" />
                </div>
              </div>
              <button className=" lg:p-5 p-2 lg:w-1/5 bg-[#005DADF2] text-white rounded-lg">
                ارسال پیغام
              </button>
            </div>
          </div>
        </div>
        <h5 className=" text-xl lg:text-3xl">ما را در شبکه ها اجتماعی دنبال کنید...</h5>
        <div className=" flex gap-5 lg:gap-36 items-center">
          <img src={instagram} width={40} alt="icon" />
          <img src={whatsapp} width={60} alt="icon" />
          <img src={telegram} width={40} alt="icon" />
          <img src={youtube} width={40} alt="icon" />
        </div>
        <div className=" gap-3 lg:gap-0 lg:flex-row flex-col flex w-[80%] items-center justify-between">
          <div className=" justify-center items-center gap-2 w-full lg:w-[30%] p-5 flex flex-col bg-white rounded-2xl border shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.1)]">
            <img src={support} alt="icon" width={48} />
            <h5>ساعات پشتیبانی</h5>
            <h5>از ساعت 8:00 تا 15:00</h5>
          </div>
          <div className=" justify-center items-center gap-2 w-full lg:w-[30%] p-5 flex flex-col bg-white rounded-2xl border shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.1)]">
            <img src={Email} alt="icon" width={48} />
            <h5>نشانی پست الکترونیک </h5>
            <h5> example@yahoo.com</h5>
          </div>
          <div className=" justify-center items-center gap-2 w-full lg:w-[30%] p-5 flex flex-col bg-white rounded-2xl border shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.1)]">
            <img src={call} alt="icon" width={48} />
            <h5>تماس با ما</h5>
            <h5>021 _ 223454 | 021 _ 223454</h5>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;

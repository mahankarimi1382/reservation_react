"use client";
import React, { useState } from "react";
import person from "../../../assets/Pics/doctorPanel/fakeperson.png";
import reply from "../../../assets/Pics/doctorPanel/reply.png";
import { CiFaceSmile } from "react-icons/ci";
import { RateCounter } from "../../../utils/RateCounter";

function AnswerOpinions() {
  const [isAnswer, setIsAnswer] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const fakeData = [
    {
      id: 1,
      name: "ایمان سالارکیا",
      visit: "ویزیت شده در مطب ونک",
      suggest: "این پزشک را پیشنهاد می‌کنم ",
      time: " نظر داده شده در 1402/10/12",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
      answer: {
        date: " جواب داده شده در 1402/10/18",
        caption:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
      },
    },
    {
      id: 2,
      name: "ایمان سالارکیا",
      visit: "ویزیت شده در مطب ونک",
      suggest: "این پزشک را پیشنهاد می‌کنم ",
      time: " نظر داده شده در 1402/10/12",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
    },
    {
      id: 3,
      name: "ایمان سالارکیا",
      visit: "ویزیت شده در مطب ونک",
      suggest: "این پزشک را پیشنهاد می‌کنم ",
      time: " نظر داده شده در 1402/10/12",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
    },
    {
      id: 4,
      name: "ایمان سالارکیا",
      visit: "ویزیت شده در مطب ونک",
      suggest: "این پزشک را پیشنهاد می‌کنم ",
      time: " نظر داده شده در 1402/10/12",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
    },
  ];
  return (
    <div className=" w-full flex flex-col gap-5">
      {fakeData.map((item) => {
        return (
          <div
            key={item.id}
            className={` ${selectedCardId === item.id && " h-[410px]"} ${
              item.answer && " h-[330px]"
            } transition-all  duration-500 h-52  bg-white gap-2 rounded-xl shadow border p-4 flex flex-col`}
          >
            <div className=" flex justify-between items-center">
              <div className=" flex items-center gap-5">
                <img
                  src={person}
                  alt="profile"
                  width={94}
                  className=" rounded-full border"
                />
                <div className=" flex flex-col gap-2">
                  <h5>{item.name}</h5>
                  <p className=" text-xs text-[#757575]">{item.time}</p>
                  <h5 className=" flex items-center gap-1 text-sm text-[#005DAD]">
                    <CiFaceSmile className=" text-lg" />
                    {item.suggest}
                  </h5>
                </div>
              </div>
              <div className=" flex-col flex items-end gap-4">
                <RateCounter rate={5} width={20} />
                <h5 className=" text-sm text-[#005DAD]">
                  ویزیت شده در مطب ونک
                </h5>
              </div>
            </div>
            <p className=" text-sm">{item.caption}</p>
            <button
              disabled={item.answer}
              onClick={() => {
                setSelectedCardId(item.id);
              }}
              className=" flex text-[#005DAD] items-center gap-1"
            >
              <img src={reply} alt="icon" width={24} />
              پاسخ
            </button>
            {item.answer && (
              <div className=" w-full bg-[#EBF6FF] p-3 rounded-xl flex items-center gap-3">
                <img src={person} alt="profile" width={94} />
                <div className=" flex flex-col ">
                  <div className=" flex gap-8 items-center ">
                    <h5>شما</h5>
                    <p className=" text-[#757575] text-sm">
                      {item.answer.date}
                    </p>
                  </div>
                  <p className=" text-sm text-[#6B6B6B]">
                    {item.answer.caption}
                  </p>
                </div>
              </div>
            )}
            {selectedCardId === item.id && (
              <div className=" flex flex-col gap-3 items-end">
                <textarea
                  placeholder="لطفا جواب خود را بنویسید"
                  className=" w-full p-5 resize-none rounded-3xl h-40 border "
                />
                <button className=" text-white bg-[#005DAD] rounded-xl p-1 px-10">
                  ارسال
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AnswerOpinions;

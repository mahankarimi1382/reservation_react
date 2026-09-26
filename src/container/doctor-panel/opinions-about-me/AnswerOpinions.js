"use client";
import React, { useEffect, useState } from "react";
import person from "../../../assets/Pics/doctorPanel/fakeperson.png";
import reply from "../../../assets/Pics/doctorPanel/reply.png";
import { CiFaceSmile } from "react-icons/ci";
import { RateCounter } from "../../../utils/RateCounter";
import { read_doctor_Comment } from "../../../api/ApiCalling";
import { userDoctorStorage } from "../../../store/Store";
import { SyncLoader } from "react-spinners";

function AnswerOpinions() {
  const [isAnswer, setIsAnswer] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const { doctorid } = userDoctorStorage();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // نظرات ثبت‌شده درباره پزشک از بک‌اند خوانده می‌شود
  useEffect(() => {
    if (!doctorid) {
      setIsLoading(false);
      return;
    }
    read_doctor_Comment(doctorid)
      .then((list) => {
        setComments(list ?? []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [doctorid]);

  const fakeData = comments.map((item) => ({
    id: item.id,
    name: item.smeProfile?.smeName ?? "کاربر دکتر رزرو",
    visit: item.isAccept ? "نظر تایید شده" : "در انتظار تایید",
    suggest: item.isSuggest
      ? "این پزشک را پیشنهاد می‌کنم "
      : "این پزشک را پیشنهاد نمی‌کنم",
    time: ` نظر داده شده در ${item.commentDate ?? ""}`,
    caption: item.desc,
  }));
  return (
    <div className=" w-full flex flex-col gap-5">
      {isLoading && (
        <div className=" flex justify-center items-center py-10">
          <SyncLoader color="#005DAD" size={9} />
        </div>
      )}
      {!isLoading && fakeData.length === 0 && (
        <div className=" flex justify-center items-center py-10 text-[#757575] bg-white rounded-xl shadow border">
          هنوز نظری برای شما ثبت نشده است
        </div>
      )}
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
                  {item.visit}
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

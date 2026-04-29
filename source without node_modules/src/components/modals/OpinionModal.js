import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import doctorProfileImg from "../../assets/Pics/user-profile.png";
import RatingStars from "../../container/Doctors/RatingStars";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { smeIdStorage } from "../../store/Store";
import moment from "moment-jalaali";
import { Eror } from "../ToastAlerts";
import { create_Comment } from "../../api/ApiCalling";
import { SyncLoader } from "react-spinners";
import doctorIcon from "../../assets/Pics/doctor-icon.jpg";

function OpinionModal({ setIsNazarModal, setIsSuccessModal, doctorDetails }) {
  const { smeId } = smeIdStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [isSuggest, setIsSuggest] = useState(true);
  const [likeNumber, setLikeNumber] = useState(0);
    const imgFN = (img) => {
      console.log(img);
      if (img == "string") {
        return doctorIcon.src;
      } else {
        return img;
      }
    };
  console.log(likeNumber);
  const data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
      smeProfileId: smeId,
    },
    desc,
    doctorId: doctorDetails.id,
    commentDate: moment().format("jYYYY/jMM/jDD"),
    isAccept: false,
    isSuggest,
    likeNumber,
    smeProfileId: smeId,
  };
  console.log(smeId);
  console.log(doctorDetails);
  const handleSuccessModal = () => {
    console.log(desc);
    if (likeNumber && desc) {
      console.log(data);
      create_Comment(data, setIsNazarModal, setIsSuccessModal, setIsLoading);
      setIsLoading(true);
    } else {
      Eror("لطفا اطلاعات را کامل وارد کنید");
    }
  };
  const closeModal = () => {
    setIsNazarModal(false);
  };
  return (
    <div className="   w-screen h-screen top-0 justify-center items-center flex z-[60] right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className=" relative  lg:w-[700px] w-full h-screen lg:h-[70%] lg:min-h-[75%] pb-6 p-3 rounded-xl bg-white border flex justify-center gap-3 items-center flex-col shadow-md">
        <RxCross2
          onClick={closeModal}
          className=" top-5 left-5 absolute cursor-pointer text-2xl text-[#353535]"
        />
        <img
          width={80}
          className=" -mt-3 border border-[#005DAD] rounded-full"
          src={
            doctorDetails ? imgFN(doctorDetails.docInstaLink) : doctorIcon.src
          }
          alt="profile"
        />
        <h2 className=" text-[20px]">
          {doctorDetails.doctorName} {doctorDetails.doctorFamily}
        </h2>
        <h5 className=" text-sm text-[#757575] ">
          {doctorDetails.smeProfile.doctors[0].specialist.name}
        </h5>
        <h5 className=" text-sm text-[#757575] ">
          کاربر گرامی ضمن آرزوی سلامتی برای شما ؛ لطفا امتیاز خود را نسبت به
          خدمات دکتر {doctorDetails.doctorName} {doctorDetails.doctorFamily} ثبت
          کنید
        </h5>
        <RatingStars onChange={setLikeNumber} />
        <div className=" flex-col flex  lg:flex-row gap-3 lg:gap-8">
          <div
            onClick={() => setIsSuggest(true)}
            className={`${
              isSuggest && " bg-green-400"
            } cursor-pointer border-2  rounded-xl text-[12px] p-3 py-5 justify-center items-center gap-1 flex text-[#757575]`}
          >
            <BiSolidLike className=" text-[#757575] text-2xl" />
            <h2>این پزشک را به دیگران پیشنهاد می کنم</h2>
          </div>
          <div
            onClick={() => setIsSuggest(false)}
            className={`${
              !isSuggest && " bg-red-400"
            } border-2 cursor-pointer  rounded-xl text-[12px] p-3 py-5 flex justify-center items-center text-[#757575]`}
          >
            <BiDislike className=" text-[#757575] text-2xl" />
            <h2>این پزشک را به دیگران پیشنهاد نمی کنم</h2>
          </div>{" "}
        </div>
        <h5 className=" text-sm text-[#757575]">
          شما با ثبت نظر صادقانه خود به کاربران دیگر در انتخاب این پزشک کمک
          بسیاری خواهید کرد.
        </h5>
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          placeholder="لطفا نظر خود را وارد کنید ..."
          className=" p-2 rounded-xl w-[90%] lg:w-[600px] h-[80px] resize-none border-2 "
        />
        <button
          onClick={handleSuccessModal}
          className=" -mb-4 px-10 lg:px-32 text-white p-1 bg-[#005DAD] rounded-lg"
        >
          {isLoading ? <SyncLoader color="white" size={10} /> : "ثبت نظر"}
        </button>
      </div>
    </div>
  );
}

export default OpinionModal;

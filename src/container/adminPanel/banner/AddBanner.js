"use client";
import React, { useEffect, useState } from "react";
import { FcHighPriority } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import UploadingInputContainer from "../../../container/doctor-panel/doctor-info/UploadingInputContainer";
import { create_ads, read_files } from "../../../api/ApiCalling";
import { SyncLoader } from "react-spinners";

import DatePickerComponent from "../../../components/DatePickerComponent";
import { Switch } from "@mui/material";
import { Eror } from "../../../components/ToastAlerts";
import { myStore } from "../../../store/Store";
function AddBanner() {
  // useEffect(() => {
  //   const url = `FileManagement/read-file?Id=3cbe8a72-bcbb-437e-8ed1-16171dd529a5`;

  //   const fetchData = async () => {
  //     const data = await read_files(url);
  //     if (data) {
  //       setPrevPreviw(data);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const { selectedBaner } = myStore();
  console.log(selectedBaner);
  // const [prevPreviw, setPrevPreviw] = useState(null);
  const [banerPosition, setBanerPosition] = useState(4);
  const [bannerFileId, setBannerFileId] = useState("");
  console.log(bannerFileId);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [authors, setAuthors] = useState("");
  const data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
    },
    title,
    headLine: "string",
    description: desc,
    photo: bannerFileId,
    smeProfileId: banerPosition,
  };
  return (
    <div className=" w-full gap-4 flex flex-col">
      <div className=" flex  items-center gap-2">
        <h5 className=" font-semibold">بنر</h5>
        <div>{bannerFileId ? <FcOk /> : <FcHighPriority />}</div>
      </div>
      {/* {prevPreviw && <Image src={prevPreviw} width={100} height={100} alt="" />} */}
      <UploadingInputContainer
        fileId={bannerFileId}
        setFileId={setBannerFileId}
      />

      <h5 className=" font-semibold">عنوان بنر</h5>
      <textarea
        onChange={(e) => setTitle(e.target.value)}
        className=" h-32 p-4 resize-none border rounded-2xl"
      />
      <h5 className=" font-semibold">توضیحات بنر</h5>
      <textarea
        // value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className=" h-52 bg-[#F5F5F5] p-4 resize-none border rounded-2xl"
      />
      <h5 className=" font-semibold">لینک مقصد</h5>
      <input
        value={authors}
        onChange={(e) => setAuthors(e.target.value)}
        placeholder="نام و نام خانوادگی نویسنده"
        className=" w-[270px] p-2 border rounded-lg"
      />
      <h5 className=" font-semibold">تاریخ شروع و پایان </h5>
      <div className=" flex items-center gap-5">
        <DatePickerComponent title="از تاریخ" />
        <DatePickerComponent title="تا تاریخ" />
      </div>

      <div className=" flex  items-center gap-10">
        <h5 className=" font-semibold"> وضعیت بنر</h5>
        <Switch defaultChecked />
      </div>
      <div className=" w-full flex justify-between items-center">
        <div className=" w-[48%] flex flex-col  gap-2">
          <h5 className=" font-semibold"> اولویت نمایش</h5>
          <select className=" w-full  p-2 rounded-lg border">
            <option></option>
          </select>
        </div>
        <div className=" w-[48%] flex flex-col  gap-2">
          <h5 className=" font-semibold"> جایگاه بنر</h5>
          <select
            onChange={(e) => setBanerPosition(e.target.value)}
            className=" w-full  p-2 rounded-lg border"
          >
            <option value={4}>صفحه لندینگ اصلی</option>
            <option value={5}>صفحه لندینگ دندانپزشک</option>
            <option value={6}>صفحه اول روانپزشک</option>
          </select>
        </div>
      </div>
      <button
        disabled={loading}
        onClick={() => {
          if (!bannerFileId) {
            Eror("لطفا فایل بنر را آپلود کنید");
          } else if (!title) {
            Eror("وارد کردن عنوان بنر الزامیست");
          } else {
            create_ads(data, setLoading);
            setLoading(true);
          }
        }}
        className=" mt-5 m-auto bg-[#005DAD] text-white w-1/2 p-2 rounded-lg"
      >
        {loading ? <SyncLoader color="white" size={10} /> : "ثبت بنر"}
      </button>
    </div>
  );
}

export default AddBanner;

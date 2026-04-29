"use client";
import React, { useState } from "react";
import { FcHighPriority } from "react-icons/fc";
import { FcOk } from "react-icons/fc";

import UploadingInputContainer from "../../../container/doctor-panel/doctor-info/UploadingInputContainer";
import { smeIdStorage } from "../../../store/Store";
import { add_article, upload_file } from "../../../api/ApiCalling";
import { SyncLoader } from "react-spinners";
import Cookies from "js-cookie";
import FileUploaderInput from "../doctor-info/FileUploaderInput";
function AddArticle() {

  const [coverFileId, setCoverFileFileId] = useState("");
  const [articleFileId, setArticleFileId] = useState("");
  const [loading, setLoading] = useState(false);
  const { smeId } = smeIdStorage();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [articleTypeId, setArticleTypeId] = useState("");
  const [link, setLink] = useState("");
  const [authors, setAuthors] = useState("");
  const data = {
    metadata: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userName: "string",
    },
    title,
    desc,
    shortDesc,
    articleTypeId,
    link,
    drrFileId: articleFileId,
    authors,
    smeProfileId: smeId,
  };
  return (
    <div className=" w-full gap-4 flex flex-col">
      <h5 className=" font-semibold">1 ) عنوان مقاله</h5>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className=" p-4 resize-none border rounded-2xl"
        placeholder="لطفا عنوان مقاله  خود را بنویسید"
      />
      <h5 className=" font-semibold">2 ) توضیحات مختصر</h5>
      <textarea
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
        className=" h-32 p-4 resize-none border rounded-2xl"
        placeholder="خلاصه یا چکیده‌ای از مقاله که محتوای اصلی و نکات مهم مقاله را در چند خط توضیح دهید."
      />
      <h5 className=" font-semibold">3 ) دسته بندی مقاله</h5>
      <select
        onChange={(e) => setArticleTypeId(e.target.value)}
        className=" text-[#C1C0C0] w-[270px] p-2 border rounded-lg"
      >
        <option value={1}>صوتی</option>
        <option value={1}>تصویری</option>
        <option value={2}>متنی</option>
        <option value={3}>فایلی</option>
      </select>
      <h5 className=" font-semibold">4 ) نویسندگان مقاله</h5>
      <input
        value={authors}
        onChange={(e) => setAuthors(e.target.value)}
        placeholder="نام و نام خانوادگی نویسنده"
        className=" w-[270px] p-2 border rounded-lg"
      />
      <div className=" flex  items-center gap-2">
        <h5 className=" font-semibold">6 ) بارگذاری فایل</h5>
        {articleTypeId == 3 && (
          <div>{articleFileId ? <FcOk /> : <FcHighPriority />}</div>
        )}
      </div>
      {articleTypeId == 3 ? (
        <FileUploaderInput
          fileId={articleFileId}
          setFileId={setArticleFileId}
        />
      ) : (
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className=" h-52 bg-[#F5F5F5] p-4 resize-none border rounded-2xl"
          placeholder="پزشک گرامی لطفا مقاله را اینجا بگذارید ( کپی کنید سپس اینجا پیست کنید )"
        />
      )}
      <div className=" flex  items-center gap-2">
        <h5 className=" font-semibold">7 ) آپلود عکس کاور مقاله</h5>

        <div>{coverFileId ? <FcOk /> : <FcHighPriority />}</div>
      </div>
      <UploadingInputContainer
        fileId={coverFileId}
        setFileId={setCoverFileFileId}
      />
      <div className=" w-full justify-center items-center flex text-white">
        <button
          onClick={() => {
            setLoading(true);
            add_article(data, setLoading);
            setTitle("");
            setDesc("");
            setAuthors("");
            setShortDesc("");
          }}
          className=" bg-[#005DAD] w-1/2 p-2 rounded-lg"
        >
          {loading ? <SyncLoader color="white" size={10} /> : "ثبت مقاله"}
        </button>
      </div>
    </div>
  );
}

export default AddArticle;

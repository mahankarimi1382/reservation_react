"use client";
import { upload_file } from "../../../api/ApiCalling";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

function UploadingInputContainer({ setFileId, fileId, }) {
  const [preview, setPreview] = useState(null );

  const token = Cookies.get("token");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className=" w-full flex flex-col gap-5">
      <label className=" relative flex-col cursor-pointer border gap-2 bg-[rgba(211,233,253,0.24)] h-[300px] rounded-md border-dashed border-[#005DAD] flex justify-center items-center">
        {preview && (
          <img
            className=" max-w-full max-h-full absolute"
            width={500}
            height={100}
            src={preview}
            alt="image"
          />
        )}
        <input
          onChange={(e) => {
            setFileId(null);
            const file = e.target.files[0];
            setFile(file);
            setPreview(null);
            if (file) {
              setPreview(URL.createObjectURL(file));
            } else {
              setFile(null);
            }
          }}
          multiple
          type="file"
          className=" w-full h-full file-input cursor-pointer bg-opacity-0 absolute "
        />
        <div className=" z-20 w-full h-full  rounded-md items-center justify-center flex text-xl">
          {file ? (
            <div className=" w-full h-full rounded-md items-center justify-center flex bg-[rgba(211,233,253,0.24)] text-xl border border-[#005DAD] p-5 text-[#005DAD]">
              <h5 className=" w-[30%]  h-16 rounded-md text-center text-xl border bg-[rgba(211,233,253,0.4)] border-[#005DAD] p-5 text-[#005DAD]">
                تغییر فایل
              </h5>
            </div>
          ) : (
            <h5 className=" w-[30%]  h-16 rounded-md text-center text-xl border border-[#005DAD] p-5 text-[#005DAD]">
              آپلود
            </h5>
          )}
        </div>
        {!file && (
          <h5 className=" text-[#9B9B9B] text-lg">یا میتوانید درگ کنید</h5>
        )}
      </label>
      <div className=" min-h-5  relative flex justify-center">
        <p className=" absolute right-0 top-0  text-[#707070]">
          توجه داشته باشید که حجم فریم ها بیشتر از 1mb نباشد
        </p>
        {file && !fileId && (
          <button
            onClick={() => {
              upload_file(file, token, setFileId, setIsLoading);
              setIsLoading(true);
            }}
            disabled={isLoading}
            className=" w-[30%]  h-16 rounded-md text-center text-xl border bg-[#005DAD] p-5 text-white"
          >
            {isLoading ? (
              <div className=" flex justify-center items-center gap-3">
                <h5>درحال آپلود</h5>
                <ClipLoader size={20} speedMultiplier={0.5} color="white" />
              </div>
            ) : (
              "ثبت نهایی فایل"
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadingInputContainer;

import React from "react";
import UploadingInputContainer from "./UploadingInputContainer";

function UploadLicensesForm() {
  return (
    <div className=" gap-10 pt-10 flex w-full flex-col">
      <h5>پزشک گرامی لطفا عکس پرسنلی خود را بارگذاری کنید</h5>
      <UploadingInputContainer title=" 1) عکس پرسنلی" />
      <UploadingInputContainer title="2) عکس مدرک تحصیلی" />
      <UploadingInputContainer title=" 3) عکس پروانه پزشکی" />
      <div className=" flex justify-center items-center">
        <button className=" w-[35%] text-white bg-[#005DAD] p-3 rounded-lg">
          تایید و ادامه
        </button>
      </div>
    </div>
  );
}

export default UploadLicensesForm;

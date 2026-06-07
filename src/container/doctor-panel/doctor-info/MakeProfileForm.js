"use client";

import React, { useEffect, useState, useRef } from "react";
import { edit_doctors } from "../../../api/ApiCalling";

function MakeProfileForm({ doctorProfile, setDoctorProfile }) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    id: 0,
    doctorName: "",
    doctorFamily: "",
    nationalId: "",
    codeNezam: "",
    specialistId: "",
    specialistName: "",
    docExperiance: "",
    docInstaLink: "", // اینجا عکس Base64 ذخیره می‌شود
    mobile: "",
    desc: "",
    gender: true,
    uniqueSSR: "",
  });

  useEffect(() => {
    if (!doctorProfile) return;

    const specialtyFromNested =
      doctorProfile?.smeProfile?.doctors?.[0]?.specialist?.name;

    setFormData({
      id: doctorProfile.id || 0,
      doctorName: doctorProfile.doctorName || "",
      doctorFamily: doctorProfile.doctorFamily || "",
      nationalId: doctorProfile.nationalId || "",
      codeNezam: doctorProfile.codeNezam || "",
      specialistId: doctorProfile.specialistId || "",
      specialistName:
        doctorProfile.specialist?.name || specialtyFromNested || "",
      docExperiance: doctorProfile.docExperiance || "",
      docInstaLink: doctorProfile.docInstaLink || "",
      mobile: doctorProfile.mobile || "",
      desc: doctorProfile.desc || "",
      gender: doctorProfile.gender ?? true,
      uniqueSSR:
        doctorProfile.uniqueSSR ||
        `${doctorProfile.doctorName || ""} ${doctorProfile.doctorFamily || ""}`.trim(),
    });
  }, [doctorProfile]);

  // هندلر برای تبدیل فایل به Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          docInstaLink: reader.result, // ذخیره رشته base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value === "true",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      metadata: {
        userId: doctorProfile?.createdBy || "00000000-0000-0000-0000-000000000000",
        userName: formData.uniqueSSR || `${formData.doctorName} ${formData.doctorFamily}`,
        smeProfileId: doctorProfile?.smeProfile?.id || doctorProfile?.smeProfileId || 0,
      },
      id: Number(formData.id),
      doctorName: formData.doctorName,
      doctorFamily: formData.doctorFamily,
      nationalId: formData.nationalId,
      codeNezam: Number(formData.codeNezam),
      specialistId: Number(formData.specialistId),
      docExperiance: formData.docExperiance,
      docInstaLink: formData.docInstaLink, // ارسال Base64 به سرور
      mobile: formData.mobile,
      desc: formData.desc,
      gender: formData.gender,
      uniqueSSR:
        formData.uniqueSSR ||
        `${formData.doctorName} ${formData.doctorFamily}`.trim(),
    };

    edit_doctors(payload, setIsLoading, () => {});

    setDoctorProfile?.((prev) => ({
      ...prev,
      ...payload,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] gap-10 flex flex-col justify-center items-center"
    >
      <div className="w-full gap-7 flex justify-between flex-wrap">
        <div className="w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className="text-lg">نام :</h5>
          <input
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            className="w-full h-14 px-3 border-[#6B6B6B] border rounded-lg outline-none"
          />
        </div>

        <div className="w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className="text-lg">نام خانوادگی :</h5>
          <input
            name="doctorFamily"
            value={formData.doctorFamily}
            onChange={handleChange}
            className="w-full h-14 px-3 border-[#6B6B6B] border rounded-lg outline-none"
          />
        </div>

        <div className="w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className="text-lg">کد ملی :</h5>
          <input
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            className="w-full h-14 px-3 border-[#6B6B6B] border rounded-lg outline-none"
          />
        </div>

        <div className="w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className="text-lg">کد نظام پزشکی :</h5>
          <input
            name="codeNezam"
            value={formData.codeNezam}
            onChange={handleChange}
            className="w-full h-14 px-3 border-[#6B6B6B] border rounded-lg outline-none"
          />
        </div>

        <div className="w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className="text-lg">تخصص :</h5>
          <select
            name="specialistId"
            value={formData.specialistId}
            onChange={handleChange}
            className="w-full h-14 px-3 border-[#6B6B6B] border rounded-lg outline-none"
          >
            <option value="">انتخاب تخصص</option>
            {formData.specialistId && (
              <option value={formData.specialistId}>
                {formData.specialistName || "تخصص فعلی"}
              </option>
            )}
          </select>
        </div>

        <div className="w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className="text-lg">سابقه فعالیت :</h5>
          <input
            name="docExperiance"
            value={formData.docExperiance}
            onChange={handleChange}
            className="w-full h-14 px-3 border-[#6B6B6B] border rounded-lg outline-none"
          />
        </div>

        {/* فیلد جدید: آپلود عکس پروفایل */}
{/* تصویر پروفایل */}
<div className="w-full flex flex-col items-center gap-4 mb-6">
  <h5 className="text-lg self-start">تصویر پروفایل:</h5>

  <input
    type="file"
    ref={fileInputRef}
    onChange={handleImageChange}
    className="hidden"
    accept="image/*"
  />

  <div className="relative group">
    <img
      src={
        formData.docInstaLink
          ? formData.docInstaLink
          : "/images/doctor-placeholder.png"
      }
      alt="doctor"
      className="w-32 h-32 rounded-full object-cover border-4 border-[#E6F2FF] shadow-md"
    />

    {/* hover overlay */}
    <div
      onClick={() => fileInputRef.current.click()}
      className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition"
    >
      <span className="text-white text-sm">تغییر عکس</span>
    </div>
  </div>

  <button
    type="button"
    onClick={() => fileInputRef.current.click()}
    className="text-sm text-[#005DAD] border border-[#005DAD] px-4 py-1 rounded-lg hover:bg-[#005DAD] hover:text-white transition"
  >
    انتخاب تصویر
  </button>
</div>


        <div className="w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className="text-lg">شماره موبایل :</h5>
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full h-14 px-3 border-[#6B6B6B] border rounded-lg outline-none"
          />
        </div>

        <div className="w-[46%] flex flex-col items-start justify-center gap-3">
          <h5 className="text-lg">جنسیت :</h5>
          <select
            value={String(formData.gender)}
            onChange={handleGenderChange}
            className="w-full h-14 px-3 border-[#6B6B6B] border rounded-lg outline-none"
          >
            <option value="true">آقا</option>
            <option value="false">خانم</option>
          </select>
        </div>

        <div className="w-full flex flex-col items-start justify-center gap-3">
          <h5 className="text-lg">توضیحات :</h5>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="w-full min-h-32 p-3 border-[#6B6B6B] border rounded-lg outline-none resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="text-white bg-[#005DAD] rounded-xl w-1/3 p-4 disabled:opacity-60"
      >
        {isLoading ? "در حال ثبت..." : "تایید و ادامه"}
      </button>
    </form>
  );
}

export default MakeProfileForm;

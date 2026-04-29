"use client";
import React, { useState } from "react";
import LoginFormImage from "../../assets/Pics/doctorLoginFormImg.png";
import { Link } from "react-router-dom";
const DoctorForm = ({ type }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    medicalCode: "",
    siamCode: "",
    contactNumber: "",
    nationalCode: "",
    city: "",
    specialty: "",
    clinicAddress: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div dir="rtl" className=" w-full flex min-h-screen">
      <div className=" w-2/3 flex py-5 flex-col items-center h-full">
        <div className=" w-[80%] gap-4 flex flex-col">
          <h3 className=" flex text-2xl items-center gap-2">
            {type === "doctor"
              ? "درخواست عضویت پزشکان در "
              : "درخواست عضویت مرکز درمانی در "}
            <span className=" text-[#005DAD]">دکتر رزرو</span>
          </h3>
          <h4 className=" text-xl">
            لطفا فرم زیر را پر کنید همکاران ما در اسرع وقت با شما تماس خواهند
            گرفت.
          </h4>
          <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className=" flex gap-8 ">
              <div className=" w-1/2 flex flex-col ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  {type === "doctor" ? "نام" : "نام مرکز درمانی "}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full px-3 py-2 border-[#636972] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2 flex flex-col ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  {type === "doctor" ? "نام خانوادگی" : "نوع مرکز درمانی "}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full px-3 py-2 border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className=" flex gap-8 ">
              <div className=" w-1/2 flex flex-col ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  {type === "doctor" ? "جنسیت" : "کد سیام "}
                </label>
                {type === "doctor" ? (
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-3 py-[10px] border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                ) : (
                  <input
                    id="siamCode"
                    name="siamCode"
                    type="text"
                    className="w-full px-3 py-2 border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.siamCode}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
              <div className="w-1/2 flex flex-col ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="medicalCode"
                >
                  {type === "doctor" ? "کد نظام پزشکی" : "استان"}
                </label>
                {type === "doctor" ? (
                  <input
                    id="medicalCode"
                    name="medicalCode"
                    type="text"
                    className="w-full px-3 py-2 border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.medicalCode}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-3 py-[10px] border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                )}
              </div>
            </div>
            {type === "doctor" && (
              <div className=" flex gap-8 ">
                <div className=" w-1/2 flex flex-col ">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="gender"
                  >
                    کد ملی
                  </label>
                  <input
                    id="clinicAddress"
                    name="clinicAddress"
                    type="text"
                    className="w-full px-3 py-2 border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.clinicAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-1/2 flex flex-col ">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="clinicAddress"
                  >
                    شماره همراه
                  </label>
                  <input
                    id="clinicAddress"
                    name="clinicAddress"
                    type="text"
                    className="w-full px-3 py-2 border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.clinicAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
            <div className=" flex gap-8 ">
              <div className=" w-1/2 flex flex-col ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  {type === "doctor" ? "استان" : "شهر"}
                </label>
                {type ===
                (
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-3 py-[10px] border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                ) ? (
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-3 py-[10px] border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                ) : (
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-3 py-[10px] border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                )}
              </div>
              <div className="w-1/2 flex flex-col ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  {type === "doctor" ? "شهر" : "شماره همراه"}
                </label>
                {type === "doctor" ? (
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-3 py-[10px] border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                ) : (
                  <input
                    id="clinicAddress"
                    name="clinicAddress"
                    type="text"
                    className="w-full px-3 py-2 border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.clinicAddress}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            </div>
            {type === "doctor" ? (
              <div className=" flex gap-8 ">
                <div className=" w-1/2 flex flex-col ">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="gender"
                  >
                    تخصص
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-3 py-[10px] border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                </div>
                <div className="w-1/2 flex flex-col ">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="clinicAddress"
                  >
                    آدرس مطب
                  </label>
                  <input
                    id="clinicAddress"
                    name="clinicAddress"
                    type="text"
                    className="w-full px-3 py-2 border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.clinicAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className=" w-full flex flex-col ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="clinicAddress"
                >
                  آدرس مرکز درمانی
                </label>
                <input
                  id="clinicAddress"
                  name="clinicAddress"
                  type="text"
                  className="w-full px-3 py-2 border border-[#636972] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="comments"
              >
                توضیحات
              </label>
              <textarea
                id="comments"
                name="comments"
                className="w-full  px-3 resize-none h-14 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.comments}
                onChange={handleChange}
                rows="4"
              />
            </div>
            <button
              className=" w-1/3 bg-[#005DAD] hover:bg-blue-700 text-white py-3 px-4 rounded-lg"
              type="submit"
            >
              ثبت درخواست
            </button>
            <p className=" -mt-3 ">
              قبلا ثبت نام کرده اید؟
              <Link
                to={type == "doctor" && "/doctor-login"}
                className=" text-[#005DAD] cursor-pointer"
              >
                ورود
              </Link>
            </p>
          </form>
        </div>
      </div>
      <img
        alt="image"
        className=" w-[570px] max-h-screen"
        src={LoginFormImage}
      />
    </div>
  );
};

export default DoctorForm;

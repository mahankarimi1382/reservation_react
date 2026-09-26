"use client";
import React, { useEffect, useState } from "react";
import LoginFormImage from "../../assets/Pics/doctorLoginFormImg.png";
import { Link } from "react-router-dom";
import {
  get_province,
  read_city,
  request_doctor_membership,
  add_medical_center,
  get_specialties,
  Read_ClinicTypes,
} from "../../api/ApiCalling";
import { SyncLoader } from "react-spinners";
import { Eror } from "../../components/ToastAlerts";

const DoctorForm = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    medicalCode: "",
    siamCode: "",
    contactNumber: "",
    nationalCode: "",
    specialty: "",
    clinicType: "",
    clinicAddress: "",
    comments: "",
  });

  // استان/شهر برای ارسال به بک‌اند
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  // تخصص‌ها و انواع مرکز درمانی از سرور خوانده می‌شوند
  const [specialties, setSpecialties] = useState([]);
  const [clinicTypes, setClinicTypes] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    get_province().then((list) => setProvinces(list ?? []));
    get_specialties("Specialist/read-specialists")
      .then((list) => setSpecialties(list ?? []))
      .catch(() => setSpecialties([]));
    Read_ClinicTypes()
      .then((list) => setClinicTypes(list ?? []))
      .catch(() => setClinicTypes([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (type === "doctor") {
      if (!formData.nationalCode) {
        setIsLoading(false);
        Eror("کد ملی را وارد کنید");
        return;
      }
      const payload = {
        metadata: {
          userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          userName: "string",
        },
        doctorName: formData.firstName,
        doctorFamily: formData.lastName,
        nationalId: formData.nationalCode,
        codeNezam: formData.medicalCode,
        specialistId: Number(formData.specialty) || 0,
        docExperiance: formData.comments,
        docInstaLink: "",
        mobile: formData.contactNumber,
        desc: formData.clinicAddress
          ? `آدرس مطب: ${formData.clinicAddress}`
          : "",
        smeProfileId: 0,
        gender: formData.gender !== "female",
        // شناسه عمومی پروفایل پزشک؛ از نام + زمان برای یکتا بودن ساخته می‌شود
        uniqueSSR: `${formData.firstName}-${formData.lastName}-${Date.now()}`,
      };
      const res = await request_doctor_membership(payload, setIsLoading);
      if (res) {
        setFormData({
          firstName: "",
          lastName: "",
          gender: "",
          medicalCode: "",
          siamCode: "",
          contactNumber: "",
          nationalCode: "",
          specialty: "",
          clinicType: "",
          clinicAddress: "",
          comments: "",
        });
      }
      return;
    }

    // درخواست عضویت مرکز درمانی
    if (!formData.clinicType) {
      setIsLoading(false);
      Eror("نوع مرکز درمانی را انتخاب کنید");
      return;
    }
    const clinicPayload = {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
      },
      name: formData.firstName,
      address: formData.clinicAddress,
      geolon: 0,
      geolat: 0,
      phone: formData.contactNumber,
      cityId: Number(cityId) || 0,
      siamCode: formData.siamCode,
      desc: formData.comments,
      clinicTypeId: Number(formData.clinicType) || 0,
    };
    await add_medical_center(clinicPayload, setIsLoading, () => {});
    setIsLoading(false);
  };

  const inputClass =
    "w-full px-3 py-2 border-[#636972] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

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
                  className={inputClass}
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
                {type === "doctor" ? (
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={inputClass}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <select
                    id="lastName"
                    name="clinicType"
                    className={inputClass}
                    value={formData.clinicType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    {clinicTypes.map((ct) => (
                      <option key={ct.id} value={ct.id}>
                        {ct.clinicTypeName ?? ct.name}
                      </option>
                    ))}
                  </select>
                )}
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
                    className={inputClass}
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
                    className={inputClass}
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
                    className={inputClass}
                    value={formData.medicalCode}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <select
                    id="provinceSelect"
                    name="province"
                    className={inputClass}
                    value={provinceId}
                    onChange={(e) => {
                      setProvinceId(e.target.value);
                      setCityId("");
                      read_city(e.target.value, setCities);
                    }}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    {provinces.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            {type === "doctor" && (
              <div className=" flex gap-8 ">
                <div className=" w-1/2 flex flex-col ">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nationalCode"
                  >
                    کد ملی
                  </label>
                  <input
                    id="nationalCode"
                    name="nationalCode"
                    type="text"
                    className={inputClass}
                    value={formData.nationalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-1/2 flex flex-col ">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="contactNumber"
                  >
                    شماره همراه
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    className={inputClass}
                    value={formData.contactNumber}
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
                  htmlFor="citySelect"
                >
                  {type === "doctor" ? "استان" : "شهر"}
                </label>
                {type === "doctor" ? (
                  <select
                    id="provinceSelectDoctor"
                    className={inputClass}
                    value={provinceId}
                    onChange={(e) => {
                      setProvinceId(e.target.value);
                      setCityId("");
                      read_city(e.target.value, setCities);
                    }}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    {provinces.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    id="citySelect"
                    className={inputClass}
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.cityName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="w-1/2 flex flex-col ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="contactNumberCenter"
                >
                  {type === "doctor" ? "شهر" : "شماره همراه"}
                </label>
                {type === "doctor" ? (
                  <select
                    id="citySelectDoctor"
                    className={inputClass}
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.cityName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="contactNumberCenter"
                    name="contactNumber"
                    type="text"
                    className={inputClass}
                    value={formData.contactNumber}
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
                    htmlFor="specialty"
                  >
                    تخصص
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    className={inputClass}
                    value={formData.specialty}
                    onChange={handleChange}
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    {specialties.map((sp) => (
                      <option key={sp.id} value={sp.id}>
                        {sp.name}
                      </option>
                    ))}
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
                    className={inputClass}
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
                  className={inputClass}
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
              className=" w-1/3 bg-[#005DAD] hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex justify-center items-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <SyncLoader color="white" size={9} />
              ) : (
                "ثبت درخواست"
              )}
            </button>
            <p className=" -mt-3 ">
              قبلا ثبت نام کرده اید؟
              <Link
                to={type == "doctor" ? "/doctor-login" : "/"}
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

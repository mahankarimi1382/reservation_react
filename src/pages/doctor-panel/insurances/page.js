"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { PiWarningCircle } from "react-icons/pi";
import { BsPlusLg } from "react-icons/bs";

import DoctorProfIcon from "../../../assets/Pics/doctor-profile-icon.png";
import DoctorPanelMenu from "../../../container/doctor-panel/DoctorPanelMenu";

import {
  create_doctor_insurance,
  read_all_insirances,
  read_doctor_insurances_by_doctor_id,
} from "../../../api/ApiCalling";

import { fullNameStorage, userDoctorStorage } from "../../../store/Store";
import ProfileDropdown from "../../../components/ProfileDropdown";

function InsurancePage() {
  const { fullName } = fullNameStorage();
  const { doctors, doctorid } = userDoctorStorage();

  const currentDoctorId = doctorid || doctors?.id;

  const [insurances, setInsurances] = useState([]);
  const [doctorInsurances, setDoctorInsurances] = useState([]);
  const [isLoadingInsurances, setIsLoadingInsurances] = useState(true);
  const [isLoadingDoctorInsurances, setIsLoadingDoctorInsurances] =
    useState(true);
  const [insurancesError, setInsurancesError] = useState("");

  const [formData, setFormData] = useState({
    insuranceId: "",
    contractStatus: "",
    coveragePercent: "",
    visitPrice: "",
  });

  const fetchAllData = async () => {
    try {
      setIsLoadingInsurances(true);
      setInsurancesError("");

      const list = await read_all_insirances();
      setInsurances(Array.isArray(list) ? list : []);
    } catch (e) {
      setInsurances([]);
      setInsurancesError("خطا در دریافت لیست بیمه‌ها");
    } finally {
      setIsLoadingInsurances(false);
    }

    try {
      if (!currentDoctorId) {
        setDoctorInsurances([]);
        return;
      }

      setIsLoadingDoctorInsurances(true);
      const list = await read_doctor_insurances_by_doctor_id(currentDoctorId);
      setDoctorInsurances(Array.isArray(list) ? list : []);
    } finally {
      setIsLoadingDoctorInsurances(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [currentDoctorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectedInsurance = useMemo(() => {
    return insurances.find((x) => String(x.id) === String(formData.insuranceId));
  }, [insurances, formData.insuranceId]);

const handleSubmit = async () => {
  if (!currentDoctorId) {
    console.log("doctor id وجود ندارد");
    return;
  }

  if (!formData.insuranceId) {
    console.log("insurance id انتخاب نشده");
    return;
  }

  const payload = {
    doctorId: Number(currentDoctorId),
    insuranceId: Number(formData.insuranceId),
    contractSituation: formData.contractStatus || "فعال",
    insurancePercent: Number(formData.coveragePercent || 0),
    visitCostId: 1004,
    isActive: true,
  };

  console.log("final create doctor insurance payload:", payload);

  const res = await create_doctor_insurance(payload);
console.log(res)
  if (res) {
    setFormData({
      insuranceId: "",
      contractStatus: "",
      coveragePercent: "",
      visitPrice: "",
    });

    await fetchAllData();
  }
};


  return (
    <div dir="rtl" className="flex min-h-screen bg-[#F6FBFF]">
      <DoctorPanelMenu />

      <main className="mt-10 flex w-full flex-col items-center gap-7 pb-20">
        <header className="flex w-[80%] items-center justify-between">
         <ProfileDropdown
            fullName={fullName}
            title="دکتر"

          />
        </header>

        <section className="flex w-[80%] flex-col gap-7">
          <div className="flex items-center gap-2 rounded-xl border border-[#C30505] bg-[rgba(195,5,5,0.1)] p-3 text-[#C30505]">
            <PiWarningCircle className="text-xl" />
            <h4>
              پزشک گرامی لطفا بیمه‌هایی که با آن‌ها طرف قرارداد هستید را انتخاب
              کنید.
            </h4>
          </div>

          <div className="flex items-center justify-between">
            <h5 className="text-lg font-bold">بیمه‌ها</h5>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h6 className="mb-3 text-base font-semibold text-[#005DAD]">
                بیمه‌های ثبت‌شده برای این پزشک
              </h6>

              {isLoadingDoctorInsurances ? (
                <p className="text-sm text-gray-500">در حال دریافت اطلاعات...</p>
              ) : doctorInsurances.length === 0 ? (
                <p className="text-sm text-gray-500">هنوز بیمه‌ای ثبت نشده است.</p>
              ) : (
<div className="grid gap-3">
  {doctorInsurances.map((item, index) =>
    item.doctorInsurances?.map((docIns, i) => (
      <div
        key={docIns.id || `${index}-${i}`}
        className="rounded-lg border border-gray-200 p-3 text-sm"
      >
        <div className="font-semibold">
          {item.name || "بیمه نامشخص"}
        </div>

        <div className="mt-1 text-gray-600">
          وضعیت قرارداد: {docIns.contractSituation || "-"} | درصد پوشش:{" "}
          {docIns.insurancePercent ?? "-"} | هزینه ویزیت:{" "}
          {docIns.visitCostId ?? "-"}
        </div>
      </div>
    ))
  )}
</div>

              )}
            </div>

            <div className="w-full border-t pt-6">
              <div className="w-[92%]">
                {isLoadingInsurances && (
                  <p className="text-sm text-gray-500">
                    در حال دریافت لیست بیمه‌ها...
                  </p>
                )}

                {!isLoadingInsurances && !!insurancesError && (
                  <p className="text-sm text-red-600">{insurancesError}</p>
                )}

                {!isLoadingInsurances &&
                  !insurancesError &&
                  insurances.length === 0 && (
                    <p className="text-sm text-gray-500">
                      بیمه‌ای برای نمایش وجود ندارد.
                    </p>
                  )}
              </div>

              <div className="mt-6 grid w-[92%] grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <FieldSelect
                    label="نام بیمه"
                    name="insuranceId"
                    value={formData.insuranceId}
                    onChange={handleInputChange}
                    disabled={isLoadingInsurances || insurances.length === 0}
                    placeholder={
                      isLoadingInsurances
                        ? "در حال بارگذاری..."
                        : insurances.length === 0
                        ? "لیست بیمه خالی است"
                        : "انتخاب کنید"
                    }
                    options={insurances.map((ins) => ({
                      value: ins.id,
                      label: `${ins.name} (${ins.insuranceType?.type ?? "-"})`,
                    }))}
                  />

                  <Field
                    label="وضعیت قرارداد"
                    name="contractStatus"
                    value={formData.contractStatus}
                    onChange={handleInputChange}
                    placeholder="مثلاً: فعال"
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <Field
                    label="درصد پوشش بیمه"
                    name="coveragePercent"
                    value={formData.coveragePercent}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="مثلاً 70"
                  />
                  <Field
                    label="مبلغ ویزیت"
                    name="visitPrice"
                    value={formData.visitPrice}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="به تومان"
                  />
                </div>
              </div>

              {selectedInsurance && (
                <div className="mt-6 w-[92%] rounded-lg bg-[#F6FBFF] p-4 text-sm text-gray-700">
                  <span className="font-semibold">انتخاب شما:</span>{" "}
                  {selectedInsurance.name} —{" "}
                  {selectedInsurance.insuranceType?.type ?? "-"}
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-6 rounded-lg bg-[#005DAD] px-24 py-3 text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                disabled={!formData.insuranceId || !currentDoctorId}
              >
                ثبت
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const Field = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">{label} :</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-[#6B6B6B] bg-[#F7F7F7] p-2 outline-none focus:border-[#005DAD]"
    />
  </div>
);

const FieldSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">{label} :</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-lg border border-[#6B6B6B] bg-[#F7F7F7] p-2 outline-none focus:border-[#005DAD] disabled:opacity-60"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default InsurancePage;

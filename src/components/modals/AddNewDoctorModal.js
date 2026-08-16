import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { SyncLoader } from "react-spinners";

import logo from "../../assets/Pics/logo-doctor.png";

import { SpecialtiesSelectInput } from "../Inputs/Input";
import {
  add_doctor,
  edit_doctors,
  get_doctor_profile_by_id,
} from "../../api/ApiCalling";
import { fullNameStorage, smeIdStorage } from "../../store/Store";
import { Eror, success } from "../ToastAlerts";

function AddNewDoctorModal({ setIsAddDoctorModal, doctorItems }) {
    const { fullName, setFullName } = fullNameStorage();
  
  const { smeId } = smeIdStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // برای لودینگ هنگام ویرایش

  const [formData, setFormData] = useState({
    doctorName: "",
    doctorFamily: "",
    nationalId: "",
    codeNezam: "",
    mobile: "",
    gender: "",
    desc: "",
    photoBase64: "",
  });

  const [specialistId, setSpecialistId] = useState("");
  console.log(specialistId);
  // ==================== Fetch Doctor Data when Editing ====================
  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorItems?.id) return; // اگر id نبود یعنی حالت افزودن است

      setIsFetching(true);
      const data = await get_doctor_profile_by_id(doctorItems.id);
      console.log(data);
      if (data) {
        const doctor = data; // یا data.result اگر ساختار متفاوت بود

        setFormData({
          doctorName: doctor.doctorName || "",
          doctorFamily: doctor.doctorFamily || "",
          nationalId: doctor.nationalId || "",
          codeNezam: doctor.codeNezam || "",
          mobile: doctor.mobile || "",
          gender: doctor.gender?.toString() || "",
          desc: doctor.desc || "",
          photoBase64: doctor.docInstaLink || "",
        });

        setSpecialistId(doctor.specialistId || doctor.specialist?.id || "");
      } else {
        Eror("خطا در دریافت اطلاعات پزشک");
      }
      setIsFetching(false);
    };

    fetchDoctor();
  }, [doctorItems?.id]);

  // ==================== Handlers ====================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Eror("لطفاً فقط فایل تصویر انتخاب کنید");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, photoBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    // ۱. اعتبارسنجی فیلدهای ضروری
    if (
      !formData.doctorName ||
      !formData.doctorFamily ||
      !formData.codeNezam ||
      !specialistId
    ) {
      Eror("لطفا فیلدهای ضروری را پر کنید");
      return;
    }

    // ۲. ساخت آبجکت نهایی مطابق با مستندات بک‌اند
    const data = {
      // اضافه کردن ID که برای متد PUT الزامی است
      id: doctorItems?.id || 0,

      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        smeProfileId: smeId || 0,
      },
      doctorName: formData.doctorName,
      doctorFamily: formData.doctorFamily,
      nationalId: formData.nationalId,
      // تبدیل به عدد برای رعایت نوع داده (Integer)
      codeNezam: parseInt(formData.codeNezam) || 0,
      specialistId: specialistId,
      mobile: formData.mobile,
      desc: formData.desc || "string",
      gender: formData.gender === "" ? null : formData.gender === "true",
      docExperiance: "string",
      docInstaLink: formData.photoBase64 || "string",
      uniqueSSR: `${formData.doctorName} ${formData.doctorFamily}`,
      smeProfileId: smeId || 0,
    };

    setIsLoading(true);

    // ۳. ارسال درخواست
    if (doctorItems?.id) {
      edit_doctors(data, setIsLoading, setIsAddDoctorModal);
    } else {
      // در حالت افزودن، معمولاً فیلد id نباید فرستاده شود یا باید 0 باشد
      // اگر بک‌اند در حالت افزودن به فیلد id ایراد گرفت، آن را از آبجکت ارسالی در اینجا حذف کنید
      add_doctor(data, setIsLoading, setIsAddDoctorModal);
      console.log(data);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" width={55} />
            <h2 className="text-2xl font-bold text-gray-800">
              {doctorItems?.id ? "ویرایش پزشک" : "افزودن پزشک جدید"}
            </h2>
          </div>
          <RxCross2
            onClick={() => setIsAddDoctorModal(false)}
            className="w-8 h-8 cursor-pointer text-gray-500 hover:text-gray-700"
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {isFetching ? (
            <div className="flex justify-center items-center h-64">
              <SyncLoader color="#005DAD" size={12} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">نام</label>
                  <input
                    value={formData.doctorName}
                    onChange={handleChange}
                    name="doctorName"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    نام خانوادگی
                  </label>
                  <input
                    value={formData.doctorFamily}
                    onChange={handleChange}
                    name="doctorFamily"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    جنسیت
                  </label>
                  <select
                    value={formData.gender}
                    onChange={handleChange}
                    name="gender"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] outline-none"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="true">مرد</option>
                    <option value="false">زن</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    کد نظام پزشکی
                  </label>
                  <input
                    value={formData.codeNezam}
                    onChange={handleChange}
                    name="codeNezam"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    کد ملی
                  </label>
                  <input
                    value={formData.nationalId}
                    onChange={handleChange}
                    name="nationalId"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    شماره همراه
                  </label>
                  <input
                    value={formData.mobile}
                    onChange={handleChange}
                    name="mobile"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] outline-none"
                  />
                </div>
              </div>

              {/* تخصص */}
              <div>
                <SpecialtiesSelectInput
                  all={false}
                  specialistId={specialistId}
                  setSpecialistId={setSpecialistId}
                />
              </div>

              {/* عکس و توضیحات */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    عکس پروفایل
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full border border-dashed border-gray-400 rounded-xl p-4 cursor-pointer hover:border-[#005DAD]"
                  />
                  {formData.photoBase64 && (
                    <div className="mt-3 relative w-24 h-24 mx-auto">
                      <img
                        src={formData.photoBase64}
                        alt="preview"
                        className="w-24 h-24 object-cover rounded-xl border"
                      />
                      <MdDeleteForever
                        onClick={() =>
                          setFormData((p) => ({ ...p, photoBase64: "" }))
                        }
                        className="absolute -top-2 -right-2 text-red-600 text-2xl cursor-pointer bg-white rounded-full shadow"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    توضیحات
                  </label>
                  <textarea
                    value={formData.desc}
                    onChange={handleChange}
                    name="desc"
                    rows={5}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#005DAD] outline-none resize-y"
                    placeholder="سوابق، مهارت‌ها، ساعات کاری و ..."
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-gray-50">
          <button
            onClick={handleSubmit}
            disabled={isLoading || isFetching}
            className="w-full bg-[#005DAD] hover:bg-[#00438a] disabled:bg-blue-400 text-white py-4 rounded-xl font-medium text-lg transition-all"
          >
            {isLoading ? (
              <SyncLoader color="white" size={9} />
            ) : doctorItems?.id ? (
              "ویرایش پزشک"
            ) : (
              "ثبت پزشک"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewDoctorModal;

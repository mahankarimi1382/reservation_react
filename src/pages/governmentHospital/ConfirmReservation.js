import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./ConfirmReservation.css";

const API_BASE_URL = "https://myapi.dadehavaran.com:8040/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const getApiMessage = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object") {
    if (typeof value.message === "string") {
      return value.message;
    }

    if (typeof value.Message === "string") {
      return value.Message;
    }

    return JSON.stringify(value);
  }

  return String(value);
};
const ConfirmReservation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    hospital,
    specialty,
    doctor,
    selectedSeat,
    reservationSelection,
    clinicId,
    specialtyId,
    doctorId,
  } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const hospitalName =
    hospital?.name ||
    hospital?.Name ||
    hospital?.title ||
    hospital?.Title ||
    "مرکز درمانی";

  const specialtyName =
    specialty?.name ||
    specialty?.title ||
    specialty?.Name ||
    specialty?.Title ||
    "تخصص";

  const doctorName = [
    doctor?.doctorName ||
      doctor?.DoctorName ||
      doctor?.name ||
      doctor?.Name ||
      "",
    doctor?.doctorFamily ||
      doctor?.DoctorFamily ||
      doctor?.family ||
      doctor?.Family ||
      "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const groupDate =
    reservationSelection?.groupDate ||
    selectedSeat?.groupDate ||
    "";

  const selectedTime =
    reservationSelection?.time ||
    selectedSeat?.time ||
    "";

  /*
   * شناسه تاریخ وزارت
   * طبق DTO بک‌اند باید در فیلد DateId ارسال شود.
   */
  const dateShowId =
    reservationSelection?.dateShowId ??
    selectedSeat?.dateShowId ??
    null;

  /*
   * کد سیام مرکز درمانی
   * طبق DTO بک‌اند باید در فیلد HospitalId ارسال شود.
   */
  const ministryHospitalId =
    reservationSelection?.ministryHospitalId ??
    hospital?.siamCode ??
    hospital?.SiamCode ??
    hospital?.siamcode ??
    null;

  /*
   * کد نظام پزشکی
   * طبق DTO بک‌اند باید در فیلد DoctorId ارسال شود.
   */
  const ministryDoctorId =
    reservationSelection?.ministryDoctorId ??
    doctor?.codeNezam ??
    doctor?.CodeNezam ??
    doctor?.codeNezamId ??
    null;

  /*
   * شماره نوبت انتخاب‌شده
   * طبق DTO بک‌اند باید در فیلد No ارسال شود.
   */
  const appointmentNumber =
    reservationSelection?.appointmentNumber ??
    selectedSeat?.appointmentNumber ??
    null;

  /*
   * تعداد بیمار در هر بازه زمانی
   * طبق DTO بک‌اند باید در فیلد PatientCountPerPeriod ارسال شود.
   */
  const patientCountPerPeriod =
    reservationSelection?.patientCountPerPeriod ??
    selectedSeat?.patientCountPerPeriod ??
    0;

  const formatPersianDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const months = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    const parts = String(dateString).split("/");

    if (parts.length !== 3) {
      return dateString;
    }

    const year = parts[0];
    const monthNumber = parseInt(parts[1], 10);
    const day = parts[2];

    return `${day} ${
      months[monthNumber - 1] || parts[1]
    } ${year}`;
  };

  const formatTime = (time) => {
    if (!time) {
      return "";
    }

    return String(time).substring(0, 5);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "نام بیمار را وارد کنید.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "نام خانوادگی بیمار را وارد کنید.";
    }

    if (!formData.nationalCode.trim()) {
      newErrors.nationalCode = "کد ملی را وارد کنید.";
    } else if (
      !/^\d{10}$/.test(formData.nationalCode.trim())
    ) {
      newErrors.nationalCode =
        "کد ملی باید ۱۰ رقم باشد.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "شماره موبایل را وارد کنید.";
    } else if (
      !/^09\d{9}$/.test(formData.mobile.trim())
    ) {
      newErrors.mobile =
        "شماره موبایل باید با 09 شروع شده و ۱۱ رقم باشد.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
     * جلوگیری از ارسال چندباره فرم
     */
    if (isSubmitting) {
      return;
    }

    setSubmitError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    /*
     * بررسی اطلاعات مورد نیاز رزرو
     */
    if (
      dateShowId === null ||
      dateShowId === undefined ||
      dateShowId === ""
    ) {
      setSubmitError(
        "شناسه تاریخ نوبت موجود نیست. لطفاً دوباره زمان نوبت را انتخاب کنید."
      );
      return;
    }

    if (
      ministryHospitalId === null ||
      ministryHospitalId === undefined ||
      ministryHospitalId === ""
    ) {
      setSubmitError(
        "کد سیام مرکز درمانی موجود نیست. لطفاً دوباره مرکز را انتخاب کنید."
      );
      return;
    }

    if (
      ministryDoctorId === null ||
      ministryDoctorId === undefined ||
      ministryDoctorId === ""
    ) {
      setSubmitError(
        "کد نظام پزشکی پزشک موجود نیست. لطفاً دوباره پزشک را انتخاب کنید."
      );
      return;
    }

    if (
      appointmentNumber === null ||
      appointmentNumber === undefined ||
      appointmentNumber === ""
    ) {
      setSubmitError(
        "شماره نوبت انتخاب‌شده موجود نیست. لطفاً دوباره زمان نوبت را انتخاب کنید."
      );
      return;
    }

    /*
     * DTO واقعی بک‌اند:
     *
     * public string FName { get; set; }
     * public string LName { get; set; }
     * public string Mobile { get; set; }
     * public string NationalCode { get; set; }
     * public int DateId { get; set; }
     * public int No { get; set; }
     * public int HospitalId { get; set; }
     * public string DoctorId { get; set; }
     * public int PatientCountPerPeriod { get; set; }
     * public bool IsReserved { get; set; }
     */

    const requestBody = {
      FName: formData.firstName.trim(),
      LName: formData.lastName.trim(),
      Mobile: formData.mobile.trim(),
      NationalCode: formData.nationalCode.trim(),

      DateId: Number(dateShowId),
      No: Number(appointmentNumber),
      HospitalId: Number(ministryHospitalId),
      DoctorId: String(ministryDoctorId),

      PatientCountPerPeriod: Number(patientCountPerPeriod),

      /*
       * طبق قرارداد فعلی بک‌اند، ثبت نوبت جدید
       * با IsReserved=true انجام می‌شود.
       */
      IsReserved: true,
    };

    console.log(
      "Ministry seat request body:",
      requestBody
    );

    setIsSubmitting(true);

    try {
      const response = await api.post(
        "/MinistryApiReserve/seat",
        requestBody
      );

console.log(
  "Ministry seat response:",
  JSON.stringify(response.data, null, 2)
);

      const responseData = response.data;

      /*
       * ساختار عمومی پاسخ API پروژه:
       * {
       *   hasError: false,
       *   message: "...",
       *   code: 1,
       *   result: ...
       * }
       *
       * اگر hasError=true باشد، ثبت ناموفق است.
       */
if (responseData?.hasError === true) {
  throw new Error(
    getApiMessage(responseData.message) ||
      "ثبت نوبت با خطا مواجه شد."
  );
}

setSuccessMessage(
  getApiMessage(responseData?.message) ||
    "نوبت شما با موفقیت ثبت شد."
);


      /*
       * فعلاً بعد از ثبت موفق در همین صفحه می‌مانیم
       * تا پاسخ واقعی endpoint را بررسی کنیم.
       *
       * بعداً می‌توانیم صفحه نتیجه رزرو را اضافه کنیم.
       */
    } catch (error) {
  console.error(
    "Submit reservation error:",
    error
  );

  console.error(
    "Backend error response:",
    error?.response?.data
  );

  const responseData = error?.response?.data;

  const backendMessage =
    getApiMessage(responseData?.message) ||
    getApiMessage(responseData?.Message) ||
    getApiMessage(responseData?.error) ||
    getApiMessage(responseData?.title) ||
    getApiMessage(error?.message);

  setSubmitError(
    backendMessage ||
      "در ثبت نوبت خطایی رخ داد. لطفاً دوباره تلاش کنید."
  );
} finally {
  setIsSubmitting(false);
}
  };

  if (!location.state) {
    return (
      <div
        className="confirm-reservation-page"
        dir="rtl"
      >
        <div className="confirm-container">
          <div className="confirm-error-box">
            <h3>اطلاعات رزرو پیدا نشد</h3>

            <p>
              لطفاً ابتدا پزشک و زمان نوبت را انتخاب کنید.
            </p>

            <Link
              to="/government-hospitals"
              className="back-to-hospitals-button"
            >
              بازگشت به بیمارستان‌های دولتی
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="confirm-reservation-page"
      dir="rtl"
    >
      <div className="confirm-container">
        <div className="confirm-breadcrumb">
          <Link to="/government-hospitals">
            بیمارستان‌های دولتی
          </Link>

          <span>/</span>

          <span>{hospitalName}</span>

          <span>/</span>

          <span>{specialtyName}</span>

          <span>/</span>

          <span>تأیید و ثبت اطلاعات بیمار</span>
        </div>

        <div className="confirm-page-header">
          <h2>تأیید نوبت و ثبت اطلاعات بیمار</h2>

          <p>
            اطلاعات نوبت را بررسی کرده و مشخصات بیمار را وارد کنید.
          </p>
        </div>

        <div className="reservation-summary-card">
          <div className="summary-card-header">
            <h3>خلاصه نوبت انتخاب‌شده</h3>
          </div>

          <div className="summary-card-body">
            <div className="summary-item">
              <span className="summary-label">
                مرکز درمانی
              </span>

              <strong>{hospitalName}</strong>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                تخصص
              </span>

              <strong>{specialtyName}</strong>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                پزشک
              </span>

              <strong>{doctorName || "پزشک"}</strong>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                تاریخ نوبت
              </span>

              <strong>
                {formatPersianDate(groupDate) ||
                  "مشخص نشده"}
              </strong>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                ساعت نوبت
              </span>

              <strong>
                {formatTime(selectedTime) ||
                  "مشخص نشده"}
              </strong>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                ظرفیت باقی‌مانده هنگام انتخاب
              </span>

              <strong>
                {selectedSeat?.availableAppointment ??
                  reservationSelection?.availableAppointment ??
                  "-"}
              </strong>
            </div>
          </div>
        </div>

        <form
          className="patient-form-card"
          onSubmit={handleSubmit}
        >
          <div className="form-card-header">
            <h3>اطلاعات بیمار</h3>

            <p>
              لطفاً اطلاعات را دقیق و مطابق مدارک بیمار وارد کنید.
            </p>
          </div>

          <div className="patient-form-grid">
            <div className="form-group">
              <label htmlFor="firstName">
                نام <span>*</span>
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="نام بیمار"
              />

              {errors.firstName && (
                <small className="field-error">
                  {errors.firstName}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                نام خانوادگی <span>*</span>
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="نام خانوادگی بیمار"
              />

              {errors.lastName && (
                <small className="field-error">
                  {errors.lastName}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="nationalCode">
                کد ملی <span>*</span>
              </label>

              <input
                id="nationalCode"
                name="nationalCode"
                type="text"
                inputMode="numeric"
                maxLength={10}
                value={formData.nationalCode}
                onChange={handleChange}
                placeholder="۱۰ رقم"
              />

              {errors.nationalCode && (
                <small className="field-error">
                  {errors.nationalCode}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mobile">
                شماره موبایل <span>*</span>
              </label>

              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                maxLength={11}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="09123456789"
              />

              {errors.mobile && (
                <small className="field-error">
                  {errors.mobile}
                </small>
              )}
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">
                توضیحات
              </label>

              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="در صورت نیاز توضیحات خود را وارد کنید."
              />
            </div>
          </div>

          {submitError && (
            <div className="submit-error">
              {submitError}
            </div>
          )}

          {successMessage && (
            <div className="submit-success">
              {successMessage}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              بازگشت
            </button>

            <button
              type="submit"
              className="submit-reservation-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "در حال ثبت..."
                : "ثبت نهایی نوبت"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmReservation;
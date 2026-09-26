import React, { useEffect, useMemo, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";

import "./Appointments.css";

const API_BASE_URL = "https://myapi.dadehavaran.com:8040/api/v1";

const Appointments = () => {
  const { clinicId, specialtyId, doctorId } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  /*
   * اطلاعاتی که از صفحات قبلی ارسال شده‌اند
   */
  const hospital = location.state?.hospital;
  const specialty = location.state?.specialty;
  const doctor = location.state?.doctor;

  const autoSelectFirstAvailable =
    location.state?.autoSelectFirstAvailable || false;

  /*
   * Stateها
   */
  const [seatGroups, setSeatGroups] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * جلوگیری از انتخاب چندباره یا ارسال اشتباه
   */
  const [isContinuing, setIsContinuing] = useState(false);

  /*
   * ---------------------------------------------------------
   * ابزارهای کمکی
   * ---------------------------------------------------------
   */

  const getApiErrorMessage = (data, status) => {
    if (data) {
      if (typeof data === "string") {
        return data;
      }

      if (data.detail) {
        return data.detail;
      }

      if (data.message) {
        return data.message;
      }

      if (data.title) {
        return data.title;
      }

      if (data.error) {
        if (typeof data.error === "string") {
          return data.error;
        }

        if (data.error.message) {
          return data.error.message;
        }
      }

      if (data.errors && typeof data.errors === "object") {
        const errorValues = Object.values(data.errors)
          .flat()
          .filter(Boolean);

        if (errorValues.length > 0) {
          return errorValues.join(" ");
        }
      }
    }

    if (status === 404 || status === 400) {
      return "برای این پزشک در این مرکز، در حال حاضر نوبتی یافت نشد.";
    }

    return "دریافت زمان‌های نوبت با خطا مواجه شد.";
  };

  /*
   * تبدیل تاریخ شمسی مثل:
   * 1405/06/24
   * به:
   * 24 شهریور 1405
   */
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

    const monthName =
      months[monthNumber - 1] || parts[1];

    return `${day} ${monthName} ${year}`;
  };

  /*
   * فرمت ساعت:
   * 14:00:00 => 14:00
   */
  const formatTime = (time) => {
    if (!time) {
      return "";
    }

    return String(time).substring(0, 5);
  };

  /*
   * تشخیص اینکه یک مقدار واقعاً ظرفیت دارد یا نه
   */
  const hasAvailableCapacity = (seat) => {
    if (!seat) {
      return false;
    }

    const isReserved = seat.isReserved === true;

    const availableAppointment = Number(
      seat.availableAppointment ?? 0
    );

    const hasTime = Boolean(seat.time);

    return (
      !isReserved &&
      availableAppointment > 0 &&
      hasTime
    );
  };

  /*
   * ---------------------------------------------------------
   * Normalize پاسخ API
   *
   * پاسخ مورد انتظار:
   *
   * {
   *   hasError: false,
   *   message: "...",
   *   code: 1,
   *   result: [
   *     {
   *       dateShowId: 351860,
   *       groupDate: "1405/06/24",
   *       seats: [...]
   *     }
   *   ]
   * }
   * ---------------------------------------------------------
   */
  const normalizeSeatResponse = (data) => {
    let rawGroups = [];

    /*
     * حالت اصلی پاسخ API
     */
    if (Array.isArray(data?.result)) {
      rawGroups = data.result;
    }

    /*
     * اگر result مستقیماً آرایه باشد
     */
    else if (Array.isArray(data)) {
      rawGroups = data;
    }

    /*
     * بعضی APIها ممکن است result را داخل data برگردانند
     */
    else if (Array.isArray(data?.data)) {
      rawGroups = data.data;
    }

    /*
     * تبدیل گروه‌های تاریخ و صندلی‌ها
     */
    const normalizedGroups = rawGroups
      .map((group, groupIndex) => {
        if (!group) {
          return null;
        }

        const groupDate =
          group.groupDate ||
          group.date ||
          group.reservationDate ||
          group.dateShow ||
          "";

        const dateShowId =
          group.dateShowId ??
          group.ministryDateId ??
          group.dateId ??
          null;

        const rawSeats =
          group.seats ||
          group.items ||
          group.appointments ||
          [];

        if (!Array.isArray(rawSeats)) {
          return null;
        }

        const availableSeats = rawSeats
          .map((seat, seatIndex) => {
            if (!seat) {
              return null;
            }

            const availableAppointment = Number(
              seat.availableAppointment ?? 0
            );

            const normalizedSeat = {
              ...seat,

              /*
               * شناسه تاریخ وزارت
               */
              dateShowId,

              /*
               * تاریخ گروه
               */
              groupDate,

              /*
               * اطلاعات ساعت
               */
              time: seat.time || seat.startTime || "",

              /*
               * ظرفیت
               */
              availableAppointment,

              /*
               * شماره نوبت وزارت؛ فقط به‌عنوان اطلاعات جانبی
               */
              appointmentNumber:
                seat.appointmentNumber ??
                seat.number ??
                seatIndex + 1,

              /*
               * وضعیت رزرو
               */
              isReserved: seat.isReserved === true,

              /*
               * شناسه داخلی برای React
               */
              internalKey: `${dateShowId ?? groupIndex}-${seat.time ?? seatIndex}-${seat.appointmentNumber ?? seatIndex}`,
            };

            return normalizedSeat;
          })
          .filter(hasAvailableCapacity);

        if (availableSeats.length === 0) {
          return null;
        }

        return {
          dateShowId,
          groupDate,
          seats: availableSeats,
        };
      })
      .filter(Boolean);

    return normalizedGroups;
  };

  /*
   * ---------------------------------------------------------
   * دریافت نوبت‌ها از API وزارت
   * ---------------------------------------------------------
   */
  const loadSeats = async () => {
    setLoading(true);
    setError("");
    setSelectedSeat(null);
    setSeatGroups([]);

    try {
      /*
       * مرکز وزارت:
       * siamCode
       */
      const ministryHospitalId =
        hospital?.siamCode ??
        hospital?.SiamCode ??
        hospital?.siamcode;

      /*
       * پزشک وزارت:
       * codeNezam
       */
      const ministryDoctorId =
        doctor?.codeNezam ??
        doctor?.CodeNezam ??
        doctor?.codeNezamId;

      console.log("Hospital object:", hospital);
      console.log("Doctor object:", doctor);
      console.log(
        "Ministry hospital ID:",
        ministryHospitalId
      );
      console.log(
        "Ministry doctor ID:",
        ministryDoctorId
      );

      if (!ministryHospitalId) {
        throw new Error(
          "کد سیام مرکز برای دریافت نوبت مشخص نیست."
        );
      }

      if (!ministryDoctorId) {
        throw new Error(
          "کد نظام پزشکی پزشک برای دریافت نوبت مشخص نیست."
        );
      }

      const url =
        `${API_BASE_URL}/MinistryApiReserve/hospital/` +
        `${encodeURIComponent(ministryHospitalId)}/doctor/` +
        `${encodeURIComponent(ministryDoctorId)}/all-seats`;

      console.log("Seats API URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      let data = null;

      try {
        data = await response.json();
      } catch (jsonError) {
        console.warn(
          "Response is not valid JSON:",
          jsonError
        );
      }

      console.log(
        "Seats API response:",
        JSON.stringify(data, null, 2)
      );

      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(data, response.status)
        );
      }

      /*
       * اگر API با hasError پاسخ خطادار داده باشد
       */
      if (data?.hasError === true) {
        throw new Error(
          getApiErrorMessage(data, response.status)
        );
      }

      const normalizedGroups =
        normalizeSeatResponse(data);

      console.log(
        "Normalized seat groups:",
        normalizedGroups
      );

      if (normalizedGroups.length === 0) {
        setSeatGroups([]);
        setError(
          "برای این پزشک در این مرکز، در حال حاضر نوبت فعالی وجود ندارد."
        );
        return;
      }

      setSeatGroups(normalizedGroups);

      /*
       * در صورت نیاز، اولین زمان آزاد به‌صورت خودکار انتخاب شود
       */
      if (autoSelectFirstAvailable) {
        const firstGroup = normalizedGroups[0];
        const firstSeat = firstGroup?.seats?.[0];

        if (firstSeat) {
          setSelectedSeat({
            ...firstSeat,
            groupDate:
              firstSeat.groupDate ||
              firstGroup.groupDate,
            dateShowId:
              firstSeat.dateShowId ??
              firstGroup.dateShowId,
          });
        }
      }
    } catch (error) {
      console.error("Load seats error:", error);

      setSeatGroups([]);

      setError(
        error?.message ||
          "برای این پزشک در این مرکز، در حال حاضر نوبتی پیدا نشد."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * با تغییر پزشک یا مرکز، زمان‌ها دوباره خوانده شوند
   */
  useEffect(() => {
    loadSeats();

  }, [
    hospital?.siamCode,
    hospital?.SiamCode,
    doctor?.codeNezam,
    doctor?.CodeNezam,
  ]);

  /*
   * تعداد کل زمان‌های آزاد
   */
  const totalAvailableSeats = useMemo(() => {
    return seatGroups.reduce(
      (total, group) => total + group.seats.length,
      0
    );
  }, [seatGroups]);

  /*
   * ---------------------------------------------------------
   * انتخاب زمان
   * ---------------------------------------------------------
   */
  const handleSelectSeat = (group, seat) => {
    const selected = {
      ...seat,

      dateShowId:
        seat.dateShowId ??
        group.dateShowId,

      groupDate:
        seat.groupDate ||
        group.groupDate,

      hospitalId:
        hospital?.siamCode ??
        hospital?.SiamCode,

      doctorId:
        doctor?.codeNezam ??
        doctor?.CodeNezam,
    };

    setSelectedSeat(selected);
    setError("");
  };

  /*
   * ---------------------------------------------------------
   * رفتن به صفحه تأیید رزرو
   * ---------------------------------------------------------
   */
  const handleContinue = () => {
    if (!selectedSeat) {
      setError("لطفاً ابتدا یک زمان نوبت را انتخاب کنید.");
      return;
    }

    if (!selectedSeat.dateShowId) {
      setError(
        "شناسه تاریخ نوبت دریافت نشده است. لطفاً دوباره تلاش کنید."
      );
      return;
    }

    setIsContinuing(true);

    const reservationSelection = {
      hospital,
      specialty,
      doctor,

      clinicId,
      specialtyId,
      doctorId,

      ministryHospitalId:
        hospital?.siamCode ??
        hospital?.SiamCode,

      ministryDoctorId:
        doctor?.codeNezam ??
        doctor?.CodeNezam,

      dateShowId: selectedSeat.dateShowId,
      groupDate: selectedSeat.groupDate,
      time: selectedSeat.time,

      appointmentNumber:
        selectedSeat.appointmentNumber,

      availableAppointment:
        selectedSeat.availableAppointment,

      patientCountPerPeriod:
        selectedSeat.patientCountPerPeriod,

      reservedSlotInfo:
        selectedSeat.reservedSlotInfo ?? null,
    };

    console.log(
      "Selected seat:",
      selectedSeat
    );

    console.log(
      "Reservation selection:",
      reservationSelection
    );

    /*
     * مسیر صفحه تأیید را در صورت تفاوت با پروژه خود تغییر دهید
     */
    navigate("/government-hospitals/confirm-reservation", {
      state: {
        hospital,
        specialty,
        doctor,

        selectedSeat,

        reservationSelection,

        clinicId,
        specialtyId,
        doctorId,
      },
    });
  };

  /*
   * ---------------------------------------------------------
   * نمایش اطلاعات
   * ---------------------------------------------------------
   */
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

  return (
    <div className="appointments-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb-wrapper">
          <Link to="/government-hospitals">
            بیمارستان‌های دولتی
          </Link>

          <span> / </span>

          <Link
            to={`/government-hospitals/${clinicId}/specialties`}
            state={{ hospital }}
          >
            {hospitalName}
          </Link>

          <span> / </span>

          <Link
            to={`/government-hospitals/${clinicId}/specialties/${specialtyId}/doctors`}
            state={{
              hospital,
              specialty,
            }}
          >
            {specialtyName}
          </Link>

          <span> / </span>

          <span>انتخاب زمان نوبت</span>
        </div>

        {/* عنوان صفحه */}
        <div className="page-header">
          <h2>انتخاب زمان نوبت</h2>

          <p>
            زمان موردنظر خود را برای دریافت نوبت انتخاب کنید.
          </p>
        </div>

        {/* اطلاعات پزشک و مرکز */}
        <div className="appointment-info-card">
          <div className="info-item">
            <span className="info-label">
              مرکز درمانی:
            </span>

            <span className="info-value">
              {hospitalName}
            </span>
          </div>

          <div className="info-item">
            <span className="info-label">
              تخصص:
            </span>

            <span className="info-value">
              {specialtyName}
            </span>
          </div>

          <div className="info-item">
            <span className="info-label">
              پزشک:
            </span>

            <span className="info-value">
              {doctorName || "پزشک"}
            </span>
          </div>
        </div>

        {/* وضعیت بارگذاری */}
        {loading && (
          <div className="appointments-loading">
            <div className="loading-spinner"></div>

            <p>
              در حال دریافت زمان‌های آزاد نوبت...
            </p>
          </div>
        )}

        {/* پیام خطا */}
        {!loading && error && (
          <div className="appointments-error">
            <div className="error-icon">!</div>

            <div className="error-content">
              <h4>نوبتی یافت نشد</h4>

              <p>{error}</p>

              <button
                type="button"
                className="retry-button"
                onClick={loadSeats}
              >
                تلاش مجدد
              </button>
            </div>
          </div>
        )}

        {/* زمان‌های آزاد */}
        {!loading &&
          !error &&
          seatGroups.length > 0 && (
            <div className="available-seats-section">
              <div className="section-title-row">
                <h3>زمان‌های آزاد نوبت</h3>

                <span className="available-count">
                  {totalAvailableSeats} زمان آزاد
                </span>
              </div>

              <div className="seat-groups">
                {seatGroups.map((group, groupIndex) => (
                  <div
                    className="seat-date-card"
                    key={
                      group.dateShowId ??
                      `${group.groupDate}-${groupIndex}`
                    }
                  >
                    {/* تاریخ */}
                    <div className="seat-date-header">
                      <div className="date-icon">
                        📅
                      </div>

                      <div className="date-content">
                        <span className="date-label">
                          تاریخ نوبت
                        </span>

                        <strong className="date-value">
                          {formatPersianDate(
                            group.groupDate
                          )}
                        </strong>
                      </div>
                    </div>

                    {/* ساعت‌ها */}
                    <div className="seat-times-grid">
                      {group.seats.map((seat) => {
                        const isSelected =
                          selectedSeat?.internalKey ===
                          seat.internalKey;

                        return (
                          <button
                            key={seat.internalKey}
                            type="button"
                            className={`seat-time-button ${
                              isSelected
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              handleSelectSeat(
                                group,
                                seat
                              )
                            }
                          >
                            <span className="seat-time">
                              {formatTime(seat.time)}
                            </span>

                            <span className="seat-capacity">
                              ظرفیت:{" "}
                              {seat.availableAppointment}
                            </span>

                            {isSelected && (
                              <span className="selected-mark">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* زمان انتخاب‌شده */}
              {selectedSeat && (
                <div className="selected-seat-summary">
                  <div className="summary-icon">
                    ✓
                  </div>

                  <div className="summary-content">
                    <span className="summary-title">
                      زمان انتخاب‌شده
                    </span>

                    <strong>
                      {formatPersianDate(
                        selectedSeat.groupDate
                      )}{" "}
                      - ساعت{" "}
                      {formatTime(
                        selectedSeat.time
                      )}
                    </strong>

                    <small>
                      ظرفیت باقی‌مانده:{" "}
                      {
                        selectedSeat.availableAppointment
                      }
                    </small>
                  </div>
                </div>
              )}

              {/* دکمه ادامه */}
              <div className="appointment-actions">
                <button
                  type="button"
                  className="continue-button"
                  disabled={
                    !selectedSeat || isContinuing
                  }
                  onClick={handleContinue}
                >
                  {isContinuing
                    ? "در حال انتقال..."
                    : "ادامه و ثبت اطلاعات بیمار"}
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Appointments;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  MdArrowBack,
  MdCheckCircle,
  MdEventAvailable,
  MdLocationOn,
  MdLocalHospital,
  MdPerson,
  MdPhone,
  MdBadge,
  MdNotes,
  MdSchedule,
} from "react-icons/md";

export default function ConfirmAppointment() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    hospital,
    specialty,
    doctor,
    selectedDay,
    selectedTime,
  } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    description: "",
  });

  const [acceptRules, setAcceptRules] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!acceptRules) {
      alert("لطفاً قوانین و مقررات را تأیید کنید.");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.nationalCode ||
      !formData.mobile
    ) {
      alert("لطفاً تمام فیلدهای الزامی را تکمیل کنید.");
      return;
    }

    // فعلاً ثبت واقعی در API انجام نمی‌شود.
    // در مرحله اتصال API، درخواست ثبت نوبت اینجا قرار می‌گیرد.

    setSubmitted(true);
  };

  if (!hospital || !specialty || !doctor || !selectedDay || !selectedTime) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          direction: "rtl",
          padding: "24px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "35px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h3>اطلاعات نوبت پیدا نشد</h3>
          <p style={{ color: "#64748b" }}>
            لطفاً مراحل انتخاب مرکز، تخصص، پزشک و زمان را دوباره انجام دهید.
          </p>

          <button
            onClick={() => navigate("/government-hospitals")}
            style={{
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "#fff",
              padding: "12px 24px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            بازگشت به مراکز دولتی
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          direction: "rtl",
          padding: "40px 20px",
          fontFamily: "inherit",
        }}
      >
        <div
          style={{
            maxWidth: "650px",
            margin: "50px auto",
            background: "#fff",
            borderRadius: "24px",
            padding: "45px 30px",
            textAlign: "center",
            boxShadow: "0 12px 35px rgba(15, 23, 42, 0.08)",
          }}
        >
          <MdCheckCircle
            style={{
              fontSize: "90px",
              color: "#16a34a",
              marginBottom: "15px",
            }}
          />

          <h2
            style={{
              color: "#166534",
              marginBottom: "15px",
            }}
          >
            نوبت شما با موفقیت ثبت شد
          </h2>

          <p
            style={{
              color: "#64748b",
              lineHeight: 2,
              marginBottom: "25px",
            }}
          >
            درخواست نوبت شما ثبت اولیه شد. پس از اتصال به سامانه اصلی،
            کد پیگیری و وضعیت نهایی نوبت نیز در همین بخش نمایش داده خواهد شد.
          </p>

          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "14px",
              padding: "18px",
              marginBottom: "25px",
              lineHeight: 2,
            }}
          >
            <div>
              <strong>مرکز:</strong> {hospital.name}
            </div>
            <div>
              <strong>پزشک:</strong> {doctor.name}
            </div>
            <div>
              <strong>تاریخ:</strong> {selectedDay.label}
            </div>
            <div>
              <strong>ساعت:</strong> {selectedTime}
            </div>
          </div>

          <button
            onClick={() => navigate("/government-hospitals")}
            style={{
              border: "none",
              borderRadius: "12px",
              background: "#2563eb",
              color: "#fff",
              padding: "13px 28px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "14px",
            }}
          >
            بازگشت به مراکز دولتی
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        direction: "rtl",
        padding: "30px 20px 50px",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#0f172a",
                fontSize: "27px",
              }}
            >
              تأیید و ثبت نوبت
            </h1>

            <p
              style={{
                marginTop: "10px",
                marginBottom: 0,
                color: "#64748b",
              }}
            >
              لطفاً اطلاعات خود را تکمیل و نوبت را تأیید کنید.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              border: "1px solid #dbe3ef",
              background: "#fff",
              color: "#334155",
              borderRadius: "10px",
              padding: "10px 16px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <MdArrowBack />
            بازگشت
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 0.85fr) minmax(320px, 1.15fr)",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Appointment summary */}
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 8px 25px rgba(15, 23, 42, 0.06)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "22px",
                color: "#0f172a",
              }}
            >
              خلاصه نوبت انتخاب‌شده
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: "#eff6ff",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MdLocalHospital style={{ fontSize: "27px" }} />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginBottom: "5px",
                  }}
                >
                  مرکز درمانی
                </div>

                <strong style={{ color: "#0f172a" }}>
                  {hospital.name}
                </strong>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "1px solid #eef2f7",
                paddingBottom: "15px",
                marginBottom: "15px",
              }}
            >
              <MdLocationOn
                style={{
                  color: "#64748b",
                  fontSize: "21px",
                }}
              />

              <span style={{ color: "#475569", fontSize: "14px" }}>
                {hospital.city || "تهران"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "1px solid #eef2f7",
                paddingBottom: "15px",
                marginBottom: "15px",
              }}
            >
              <MdPerson
                style={{
                  color: "#64748b",
                  fontSize: "21px",
                }}
              />

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginBottom: "4px",
                  }}
                >
                  پزشک
                </div>

                <strong style={{ color: "#334155" }}>
                  {doctor.name}
                </strong>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "1px solid #eef2f7",
                paddingBottom: "15px",
                marginBottom: "15px",
              }}
            >
              <MdBadge
                style={{
                  color: "#64748b",
                  fontSize: "21px",
                }}
              />

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginBottom: "4px",
                  }}
                >
                  تخصص
                </div>

                <strong style={{ color: "#334155" }}>
                  {specialty.name}
                </strong>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  padding: "15px",
                }}
              >
                <MdEventAvailable
                  style={{
                    color: "#2563eb",
                    fontSize: "23px",
                    marginBottom: "8px",
                  }}
                />

                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginBottom: "5px",
                  }}
                >
                  تاریخ نوبت
                </div>

                <strong style={{ color: "#0f172a" }}>
                  {selectedDay.label}
                </strong>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  padding: "15px",
                }}
              >
                <MdSchedule
                  style={{
                    color: "#2563eb",
                    fontSize: "23px",
                    marginBottom: "8px",
                  }}
                />

                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginBottom: "5px",
                  }}
                >
                  ساعت نوبت
                </div>

                <strong style={{ color: "#0f172a" }}>
                  {selectedTime}
                </strong>
              </div>
            </div>
          </div>

          {/* Patient form */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 8px 25px rgba(15, 23, 42, 0.06)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "8px",
                color: "#0f172a",
              }}
            >
              اطلاعات بیمار
            </h3>

            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginBottom: "24px",
              }}
            >
              فیلدهای ستاره‌دار الزامی هستند.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
              }}
            >
              <div>
                <label style={labelStyle}>
                  نام <span style={{ color: "#dc2626" }}>*</span>
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="نام بیمار"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  نام خانوادگی <span style={{ color: "#dc2626" }}>*</span>
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="نام خانوادگی بیمار"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  کد ملی <span style={{ color: "#dc2626" }}>*</span>
                </label>

                <div style={{ position: "relative" }}>
                  <MdBadge style={iconInputStyle} />

                  <input
                    type="text"
                    name="nationalCode"
                    value={formData.nationalCode}
                    onChange={handleChange}
                    placeholder="مثلاً ۰۰۱۲۳۴۵۶۷۸"
                    maxLength={10}
                    style={{
                      ...inputStyle,
                      paddingRight: "40px",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>
                  شماره موبایل <span style={{ color: "#dc2626" }}>*</span>
                </label>

                <div style={{ position: "relative" }}>
                  <MdPhone style={iconInputStyle} />

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"
                    style={{
                      ...inputStyle,
                      paddingRight: "40px",
                    }}
                  />
                </div>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>
                  توضیحات <span style={{ color: "#94a3b8" }}>(اختیاری)</span>
                </label>

                <div style={{ position: "relative" }}>
                  <MdNotes style={iconTextareaStyle} />

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="در صورت نیاز توضیحات خود را وارد کنید..."
                    rows={4}
                    style={{
                      ...inputStyle,
                      paddingRight: "40px",
                      resize: "vertical",
                    }}
                  />
                </div>
              </div>
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "9px",
                marginTop: "24px",
                cursor: "pointer",
                color: "#475569",
                fontSize: "13px",
                lineHeight: 1.8,
              }}
            >
              <input
                type="checkbox"
                checked={acceptRules}
                onChange={(event) => setAcceptRules(event.target.checked)}
                style={{
                  marginTop: "5px",
                  accentColor: "#2563eb",
                }}
              />

              <span>
                قوانین و مقررات ثبت نوبت را مطالعه کرده‌ام و با آن موافقم.
              </span>
            </label>

            <button
              type="submit"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "none",
                borderRadius: "12px",
                background: "#2563eb",
                color: "#fff",
                padding: "14px",
                marginTop: "24px",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              <MdCheckCircle style={{ fontSize: "21px" }} />
              تأیید و ثبت نوبت
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  color: "#334155",
  fontSize: "13px",
  fontWeight: 600,
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #dbe3ef",
  borderRadius: "10px",
  background: "#fff",
  color: "#0f172a",
  padding: "12px 14px",
  outline: "none",
  fontFamily: "inherit",
  fontSize: "14px",
};

const iconInputStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#94a3b8",
  fontSize: "20px",
  pointerEvents: "none",
};

const iconTextareaStyle = {
  position: "absolute",
  right: "12px",
  top: "14px",
  color: "#94a3b8",
  fontSize: "20px",
  pointerEvents: "none",
};
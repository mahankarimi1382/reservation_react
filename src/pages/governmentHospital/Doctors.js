import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  MdArrowBack,
  MdArrowForward,
  MdCalendarMonth,
  MdLocationOn,
  MdLocalHospital,
  MdPerson,
  MdSearch,
  MdVerified,
} from "react-icons/md";

const api = axios.create({
  baseURL: "https://myapi.dadehavaran.com:8040/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

function Doctors() {
  const navigate = useNavigate();
  const location = useLocation();

  const { clinicId, specialtyId } = useParams();

  const hospital = location.state?.hospital;
  const specialty = location.state?.specialty;

  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const hospitalName =
    hospital?.name || "مرکز درمانی دولتی";

  const hospitalCity =
    hospital?.city || "تهران";

  const hospitalProvince =
    hospital?.province || "تهران";

  const specialtyName =
    specialty?.title ||
    specialty?.name ||
    "تخصص انتخاب‌شده";

  // دریافت پزشکان بر اساس مرکز و تخصص
  useEffect(() => {
    const loadDoctors = async () => {
      if (!clinicId || !specialtyId) {
        setError("شناسه مرکز یا تخصص مشخص نیست.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log("Clinic ID:", clinicId);
        console.log("Specialty ID:", specialtyId);

        const response = await api.get(
          `MinistryApiReserve/read-doctors-by-clinic-and-specialist/${clinicId}/${specialtyId}`
        );

        console.log("Doctors API response:", response.data);

        const apiData = response.data;

        if (apiData?.hasError) {
          throw new Error(
            apiData.message || "دریافت پزشکان با خطا مواجه شد."
          );
        }

        const list = apiData?.result?.list ?? [];

        const mappedDoctors = list.map((doctor) => ({
          id: doctor.id,

          name:
            `${doctor.doctorName || ""} ${
              doctor.doctorFamily || ""
            }`.trim() || "پزشک بدون نام",

          specialty: specialtyName,

          experience:
            doctor.docExperiance ||
            "سابقه پزشکی ثبت نشده است",

          hospital: hospitalName,

          city: hospitalCity,

          province: hospitalProvince,

          address:
            hospital?.address ||
            "آدرس ثبت نشده است",

          image: null,

          availableDays:
            "اطلاعات روزهای حضور ثبت نشده است",

          tags: [specialtyName],

          codeNezam: doctor.codeNezam,
          nationalId: doctor.nationalId,
        }));

        setDoctors(mappedDoctors);
      } catch (err) {
        console.error("Error loading doctors:", err);

        setError(
          err?.message ||
            "دریافت پزشکان با خطا مواجه شد."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [
    clinicId,
    specialtyId,
    specialtyName,
    hospitalName,
    hospitalCity,
    hospitalProvince,
    hospital?.address,
  ]);

  // جستجوی پزشکان
  const filteredDoctors = useMemo(() => {
    if (!searchText.trim()) {
      return doctors;
    }

    const searchValue = searchText.trim().toLowerCase();

    return doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchValue)
    );
  }, [doctors, searchText]);

  // مشاهده همه زمان‌های نوبت
  const handleSelectDoctor = (doctor) => {
    navigate(
      `/government-hospitals/${clinicId}/specialties/${specialtyId}/doctors/${doctor.id}/appointments`,
      {
        state: {
          hospital,
          specialty,
          doctor,
        },
      }
    );
  };

  // اولین وقت خالی
  const handleFirstAvailable = (doctor) => {
    navigate(
      `/government-hospitals/${clinicId}/specialties/${specialtyId}/doctors/${doctor.id}/appointments`,
      {
        state: {
          hospital,
          specialty,
          doctor,
          autoSelectFirstAvailable: true,
        },
      }
    );
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F9FD] px-4 py-6 md:px-8"
    >
      <div className="mx-auto max-w-[1250px]">

        {/* مسیر راهنما */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <button
            type="button"
            onClick={() => navigate("/government-hospitals")}
            className="transition hover:text-[#005DAD]"
          >
            مراکز درمانی دولتی
          </button>

          <MdArrowBack className="text-gray-400" />

          <button
            type="button"
            onClick={() =>
              navigate(
                `/government-hospitals/${clinicId}/specialties`,
                {
                  state: {
                    hospital,
                  },
                }
              )
            }
            className="transition hover:text-[#005DAD]"
          >
            انتخاب تخصص
          </button>

          <MdArrowBack className="text-gray-400" />

          <span className="font-medium text-[#005DAD]">
            پزشکان
          </span>
        </div>

        {/* سربرگ مرکز و تخصص */}
        <div className="mb-6 rounded-3xl border border-[#DCEAF5] bg-white p-5 shadow-[0_8px_30px_rgba(0,93,173,0.07)] md:p-7">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#EAF5FF]">
                <MdLocalHospital className="text-4xl text-[#005DAD]" />
              </div>

              <div>
                <span className="mb-2 inline-block rounded-full bg-[#E8F7EE] px-3 py-1 text-xs font-bold text-green-700">
                  مرکز درمانی دولتی
                </span>

                <h1 className="text-xl font-bold text-[#164B73] md:text-2xl">
                  {hospitalName}
                </h1>

                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                  <MdLocationOn className="text-lg text-[#005DAD]" />

                  <span>
                    {hospitalCity}، {hospitalProvince}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F1F8FD] px-5 py-4">
              <div className="text-xs text-gray-500">
                تخصص انتخاب‌شده
              </div>

              <div className="mt-1 text-lg font-bold text-[#005DAD]">
                {specialtyName}
              </div>
            </div>

          </div>
        </div>

        {/* عنوان و جستجو */}
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-[#164B73]">
              انتخاب پزشک
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              پزشک موردنظر خود را برای مشاهده زمان‌های نوبت انتخاب کنید.
            </p>
          </div>

          <div className="relative w-full md:w-[320px]">
            <MdSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />

            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="جستجوی نام پزشک..."
              className="w-full rounded-xl border border-[#DCEAF5] bg-white py-3 pr-12 pl-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#73B7E8] focus:ring-2 focus:ring-[#EAF5FF]"
            />
          </div>
        </div>

        {/* تعداد نتایج */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-[#EAF5FF] px-4 py-2 text-sm font-bold text-[#005DAD]">
            <MdPerson className="text-lg" />
            {filteredDoctors.length} پزشک
          </div>

          <div className="text-sm text-gray-500">
            {hospitalName}
          </div>
        </div>

        {/* وضعیت دریافت و کارت پزشکان */}
        {loading ? (
          <div className="rounded-3xl border border-[#DCEAF5] bg-white px-5 py-16 text-center">
            <p className="text-gray-500">
              در حال دریافت فهرست پزشکان...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-white px-5 py-16 text-center">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="rounded-3xl border border-[#DCEAF5] bg-white p-5 shadow-[0_8px_25px_rgba(0,93,173,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#73B7E8] hover:shadow-[0_12px_30px_rgba(0,93,173,0.10)]"
              >
                {/* اطلاعات اصلی پزشک */}
                <div className="flex items-start gap-4">

                  {/* تصویر پزشک */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#EAF5FF]">
                    {doctor.image ? (
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <MdPerson className="text-5xl text-[#75B7E5]" />
                    )}
                  </div>

                  {/* نام و تخصص */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-[#164B73]">
                      {doctor.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-sm font-medium text-[#005DAD]">
                      <MdVerified className="text-lg" />
                      {doctor.specialty}
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {doctor.experience}
                    </p>
                  </div>
                </div>

                {/* محل فعالیت */}
                <div className="mt-5 rounded-2xl bg-[#F7FAFC] p-4">
                  <div className="flex items-start gap-2">
                    <MdLocalHospital className="mt-0.5 text-xl text-[#005DAD]" />

                    <div>
                      <div className="text-sm font-bold text-[#164B73]">
                        {doctor.hospital}
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <MdLocationOn className="text-base text-[#005DAD]" />
                        {doctor.city}
                      </div>

                      <div className="mt-1 text-xs text-gray-400">
                        {doctor.address}
                      </div>
                    </div>
                  </div>
                </div>

                {/* برچسب‌ها */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {doctor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-[#F0F5F9] px-3 py-1.5 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* روزهای حضور و دکمه‌ها */}
                <div className="mt-5 border-t border-gray-100 pt-4">

                  <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                    <MdCalendarMonth className="text-xl text-[#005DAD]" />

                    <span>
                      روزهای حضور:
                      <strong className="mr-1 text-gray-700">
                        {doctor.availableDays}
                      </strong>
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "18px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => handleFirstAvailable(doctor)}
                      style={{
                        flex: 1,
                        minWidth: "145px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#16a34a",
                        color: "#fff",
                        padding: "11px 14px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      ⭐ اولین وقت خالی
                    </button>

                    <button
                      onClick={() => handleSelectDoctor(doctor)}
                      style={{
                        flex: 1,
                        minWidth: "145px",
                        border: "1px solid #2563eb",
                        borderRadius: "10px",
                        background: "#fff",
                        color: "#2563eb",
                        padding: "11px 14px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      مشاهده همه زمان‌ها
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#B9DDF5] bg-white px-5 py-16 text-center">
            <MdPerson className="mx-auto text-6xl text-[#B9DDF5]" />

            <h3 className="mt-4 text-lg font-bold text-[#164B73]">
              پزشکی پیدا نشد
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              برای این مرکز و تخصص، پزشکی ثبت نشده است.
            </p>
          </div>
        )}

        {/* بازگشت */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() =>
              navigate(
                `/government-hospitals/${clinicId}/specialties`,
                {
                  state: {
                    hospital,
                  },
                }
              )
            }
            className="flex items-center gap-2 text-sm font-medium text-[#005DAD] transition hover:text-[#004A8A]"
          >
            <MdArrowForward className="text-xl" />
            بازگشت به فهرست تخصص‌ها
          </button>
        </div>

      </div>
    </div>
  );
}

export default Doctors;
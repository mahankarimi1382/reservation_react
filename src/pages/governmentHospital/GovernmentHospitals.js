import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  MdSearch,
  MdLocationOn,
  MdLocalHospital,
  MdMyLocation,
  MdFilterList,
  MdClose,
  MdArrowBack,
  MdRefresh,
} from "react-icons/md";

// --------------------------------------------------
// تنظیم آیکن پیش‌فرض Leaflet
// --------------------------------------------------

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// --------------------------------------------------
// آیکن اختصاصی مراکز درمانی
// --------------------------------------------------

const hospitalIcon = new L.DivIcon({
  className: "custom-hospital-marker",
  html: `
    <div style="
      width: 38px;
      height: 38px;
      border-radius: 50% 50% 50% 0;
      background: #005DAD;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid white;
      box-shadow: 0 3px 10px rgba(0,0,0,0.25);
    ">
      <span style="
        transform: rotate(45deg);
        color: white;
        font-size: 20px;
        font-weight: bold;
      ">✚</span>
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

// --------------------------------------------------
// Axios مخصوص این صفحه
// --------------------------------------------------

const clinicApi = axios.create({
  baseURL: "https://myapi.dadehavaran.com:8040/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// --------------------------------------------------
// دریافت تخصص‌های یک مرکز
// --------------------------------------------------

const getSpecialistsByClinic = async (clinicId) => {
  const response = await clinicApi.get(
    `MinistryApiReserve/read-specialists-by-clinic/${clinicId}`
  );

  const apiData = response.data;

  if (apiData?.hasError) {
    throw new Error(
      apiData.message || "دریافت تخصص‌های مرکز با خطا مواجه شد."
    );
  }

  return apiData?.result?.list ?? [];
};
// --------------------------------------------------
// تبدیل پاسخ API به مدل مورد نیاز صفحه
// --------------------------------------------------

const mapClinicToHospital = (clinic) => {
  const latitude = Number(clinic.geolat);
  const longitude = Number(clinic.geolon);

  const hasValidCoordinates =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= 25 &&
    latitude <= 40 &&
    longitude >= 44 &&
    longitude <= 64;

  return {
    id: clinic.id,
    name: clinic.clinicName || "مرکز درمانی بدون نام",
    city: clinic.cityName || "نامشخص",
    province: clinic.provinceName || "",
    address: clinic.address || "آدرس ثبت نشده است",
    lat: hasValidCoordinates ? latitude : null,
    lng: hasValidCoordinates ? longitude : null,
    phone: clinic.phone || "",
    siamCode: clinic.siamCode || "",
    clinicTypeName: clinic.clinicTypeName || "",
    doctorsCount: clinic.doctorsCount || 0,
    specialities: [],
  };
};

// --------------------------------------------------
// کنترل حرکت نقشه
// --------------------------------------------------

function MapController({ selectedHospital }) {
  const map = useMap();

  React.useEffect(() => {
    if (
      selectedHospital &&
      selectedHospital.lat !== null &&
      selectedHospital.lng !== null
    ) {
      map.flyTo(
        [selectedHospital.lat, selectedHospital.lng],
        13,
        {
          duration: 1.2,
        }
      );
    }
  }, [selectedHospital, map]);

  return null;
}

// --------------------------------------------------
// صفحه مراکز درمانی دولتی
// --------------------------------------------------

function GovernmentHospitals() {
  const navigate = useNavigate();

  const [hospitals, setHospitals] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState("همه شهرها");
  const [selectedHospital, setSelectedHospital] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [specialitiesLoading, setspecialitiesLoading] = useState(false);
  // --------------------------------------------------
  // دریافت مراکز از API
  // --------------------------------------------------

  const loadHospitals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await clinicApi.get("Clinic/read-Clinics");

      const apiData = response.data;

      if (apiData?.hasError) {
        throw new Error(
          apiData.message || "دریافت مراکز درمانی با خطا مواجه شد."
        );
      }

      const clinics = apiData?.result?.list ?? [];

      const mappedHospitals = clinics.map(mapClinicToHospital);

      setHospitals(mappedHospitals);
    } catch (err) {
      console.error("Error loading clinics:", err);

      if (err.response) {
        setError(
          `خطا در دریافت اطلاعات از سرور. کد خطا: ${err.response.status}`
        );
      } else if (err.request) {
        setError(
          "ارتباط با سرور برقرار نشد. لطفاً اجرای بک‌اند و آدرس API را بررسی کنید."
        );
      } else {
        setError(err.message || "خطایی در دریافت مراکز رخ داد.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  // --------------------------------------------------
  // ساخت لیست شهرها
  // --------------------------------------------------

  const cities = useMemo(() => {
    const uniqueCities = [
      ...new Set(
        hospitals
          .map((item) => item.city)
          .filter((city) => city && city !== "نامشخص")
      ),
    ].sort((a, b) => a.localeCompare(b, "fa"));

    return ["همه شهرها", ...uniqueCities];
  }, [hospitals]);

  // --------------------------------------------------
  // فیلتر مراکز
  // --------------------------------------------------

  const filteredHospitals = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return hospitals.filter((hospital) => {
      const matchesSearch =
        !normalizedSearch ||
        hospital.name.toLowerCase().includes(normalizedSearch) ||
        hospital.city.toLowerCase().includes(normalizedSearch) ||
        hospital.province.toLowerCase().includes(normalizedSearch);

      const matchesCity =
        selectedCity === "همه شهرها" ||
        hospital.city === selectedCity;

      return matchesSearch && matchesCity;
    });
  }, [hospitals, searchText, selectedCity]);

  const mappedHospitals = useMemo(() => {
    return filteredHospitals.filter(
      (hospital) =>
        hospital.lat !== null &&
        hospital.lng !== null
    );
  }, [filteredHospitals]);

const handleSelectHospital = async (hospital) => {
  // ابتدا اطلاعات مرکز را نمایش می‌دهیم
  setSelectedHospital({
    ...hospital,
    specialities: [],
  });

  try {
    setspecialitiesLoading(true);

    const specialists = await getSpecialistsByClinic(hospital.id);

    // تبدیل پاسخ API به نام تخصص‌ها
    const specialityNames = specialists
      .map((specialist) => specialist.name || specialist.maxaName)
      .filter(Boolean);

    setSelectedHospital({
      ...hospital,
      specialities: specialityNames,
    });
  } catch (err) {
    console.error("Error loading clinic specialities:", err);

    // در صورت خطا، خود مرکز همچنان نمایش داده شود
    setSelectedHospital({
      ...hospital,
      specialities: [],
    });
  } finally {
    setspecialitiesLoading(false);
  }
};

  const clearSearch = () => {
    setSearchText("");
    setSelectedCity("همه شهرها");
  };

  // --------------------------------------------------
  // وضعیت Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#F5F9FD]"
      >
        <div className="rounded-2xl bg-white px-8 py-6 text-center shadow-md">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#DCEAF5] border-t-[#005DAD]" />
          <p className="font-medium text-[#164B73]">
            در حال دریافت مراکز درمانی...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // وضعیت خطا
  // --------------------------------------------------

  if (error) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#F5F9FD] px-4"
      >
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-md">
          <MdLocalHospital className="mx-auto mb-4 text-5xl text-red-400" />

          <h2 className="mb-3 text-lg font-bold text-[#164B73]">
            دریافت اطلاعات ناموفق بود
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={loadHospitals}
            className="inline-flex items-center gap-2 rounded-xl bg-[#005DAD] px-5 py-3 text-sm font-bold text-white hover:bg-[#004A8A]"
          >
            <MdRefresh className="text-lg" />
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F9FD] px-4 py-5 md:px-8"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* عنوان صفحه */}
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <span>خانه</span>
            <MdArrowBack className="text-gray-400" />
            <span className="text-[#005DAD]">
              مراکز درمانی دولتی
            </span>
          </div>

          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#164B73] md:text-3xl">
                انتخاب مرکز درمانی دولتی
              </h1>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
              <MdLocalHospital className="text-xl text-[#005DAD]" />
              <span>
                تعداد مراکز:
                <strong className="mr-1 text-[#005DAD]">
                  {filteredHospitals.length}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* محتوای اصلی */}
        <div
          className="grid min-h-[650px] grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_390px]"
          style={{ direction: "ltr" }}
        >

          {/* نقشه */}
          <div className="relative order-1 min-h-[550px] overflow-hidden rounded-3xl border border-[#DCEAF5] bg-white shadow-[0_8px_30px_rgba(0,93,173,0.08)] lg:order-1">
            <MapContainer
              center={[32.4279, 53.688]}
              zoom={5}
              minZoom={4}
              maxZoom={18}
              scrollWheelZoom={true}
              className="h-full min-h-[550px] w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapController selectedHospital={selectedHospital} />

              {mappedHospitals.map((hospital) => (
                <Marker
                  key={hospital.id}
                  position={[hospital.lat, hospital.lng]}
                  icon={hospitalIcon}
                  eventHandlers={{
                    click: () => handleSelectHospital(hospital),
                  }}
                />
              ))}
            </MapContainer>

            {/* پنجره اطلاعات مرکز */}
            {selectedHospital && (
              <div
                dir="rtl"
                className="absolute left-1/2 top-1/2 z-[1000] w-[min(390px,calc(100%-40px))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#DCEAF5] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.18)]"
              >
                <button
                  type="button"
                  onClick={() => setSelectedHospital(null)}
                  className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                >
                  <MdClose className="text-lg" />
                </button>

                <div className="flex items-start gap-3 pl-7">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF5FF]">
                    <MdLocalHospital className="text-3xl text-[#005DAD]" />
                  </div>

                  <div>
                    <span className="text-xs font-medium text-green-600">
                      مرکز درمانی دولتی
                    </span>

                    <h3 className="mt-1 text-lg font-bold text-[#164B73]">
                      {selectedHospital.name}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MdLocationOn className="text-lg text-[#005DAD]" />
                    <span>
                      {selectedHospital.city}
                      {selectedHospital.province
                        ? `، ${selectedHospital.province}`
                        : ""}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400">
                    {selectedHospital.address}
                  </p>

                  {selectedHospital.phone && (
                    <p className="text-xs text-gray-400">
                      تلفن: {selectedHospital.phone}
                    </p>
                  )}

                  <p className="text-xs text-gray-400">
                    تعداد پزشکان: {selectedHospital.doctorsCount}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {specialitiesLoading ? (
                    <span className="text-xs text-gray-400">
                      در حال دریافت تخصص‌های این مرکز...
                    </span>
                  ) : selectedHospital.specialities.length > 0 ? (
                    selectedHospital.specialities
                      .slice(0, 3)
                      .map((speciality) => (
                        <span
                          key={speciality}
                          className="rounded-md bg-[#F1F6FA] px-2 py-1 text-xs text-gray-600"
                        >
                          {speciality}
                        </span>
                      ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      برای این مرکز تخصصی ثبت نشده است.
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigate(
                      `/government-hospitals/${selectedHospital.id}/specialities`,
                      {
                        state: {
                          hospital: selectedHospital,
                        },
                      }
                    );
                  }}
                  className="mt-5 w-full rounded-xl bg-[#005DAD] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#004A8A]"
                >
                  انتخاب این مرکز
                </button>
              </div>
            )}

            {/* برچسب روی نقشه */}
            <div className="pointer-events-none absolute left-4 top-4 z-[1000] rounded-xl bg-white/95 px-4 py-3 shadow-md backdrop-blur">
              <div className="flex items-center gap-2">
                <MdLocationOn className="text-xl text-[#005DAD]" />
                <span className="text-sm font-medium text-gray-700">
                  مراکز درمانی دولتی ایران
                </span>
              </div>
            </div>

            {/* دکمه موقعیت ایران */}
            <button
              type="button"
              onClick={() => setSelectedHospital(null)}
              className="absolute bottom-5 left-5 z-[1000] flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-[#005DAD] shadow-lg transition hover:bg-[#EAF5FF]"
            >
              <MdMyLocation className="text-xl" />
              نمایش کل ایران
            </button>
          </div>

          {/* پنل جستجو و نتایج */}
          <aside className="order-2 flex max-h-[680px] flex-col overflow-hidden rounded-3xl border border-[#DCEAF5] bg-white shadow-[0_8px_30px_rgba(0,93,173,0.08)] lg:order-2">

            {/* سربرگ پنل */}
            <div className="border-b border-gray-100 px-5 pb-4 pt-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5FF]">
                  <MdSearch className="text-2xl text-[#005DAD]" />
                </div>

                <div>
                  <h2 className="font-bold text-[#164B73]">
                    جستجوی مراکز
                  </h2>
                  <p className="text-xs text-gray-500">
                    بیمارستان یا شهر را جستجو کنید
                  </p>
                </div>
              </div>

              {/* باکس جستجو */}
              <div className="relative">
                <MdSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                <input
                  type="text"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="نام بیمارستان یا شهر..."
                  className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8FBFE] pr-11 pl-10 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#73B7E8] focus:ring-2 focus:ring-[#D9EEFF]"
                />

                {searchText && (
                  <button
                    type="button"
                    onClick={() => setSearchText("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <MdClose className="text-xl" />
                  </button>
                )}
              </div>

              {/* فیلتر شهر */}
              <div className="relative mt-3">
                <MdFilterList className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                <select
                  value={selectedCity}
                  onChange={(event) => setSelectedCity(event.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white pr-11 pl-4 text-sm text-gray-700 outline-none focus:border-[#73B7E8] focus:ring-2 focus:ring-[#D9EEFF]"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* عنوان نتایج */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2">
                <MdLocalHospital className="text-xl text-[#005DAD]" />
                <span className="font-bold text-gray-700">
                  نتایج جستجو
                </span>
              </div>

              <span className="rounded-full bg-[#EAF5FF] px-3 py-1 text-xs font-bold text-[#005DAD]">
                {filteredHospitals.length} مرکز
              </span>
            </div>

            {/* فهرست مراکز */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {filteredHospitals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <MdSearch className="mb-3 text-5xl text-gray-300" />

                  <h3 className="font-bold text-gray-600">
                    مرکزی پیدا نشد
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    عبارت جستجو یا شهر انتخابی را تغییر دهید.
                  </p>

                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mt-4 rounded-lg bg-[#EAF5FF] px-4 py-2 text-sm text-[#005DAD] hover:bg-[#D8EDFF]"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredHospitals.map((hospital) => {
                    const isSelected =
                      selectedHospital?.id === hospital.id;

                    return (
                      <button
                        type="button"
                        key={hospital.id}
                        onClick={() => handleSelectHospital(hospital)}
                        className={`w-full rounded-2xl border p-4 text-right transition-all ${
                          isSelected
                            ? "border-[#1685CC] bg-[#F0F8FF] shadow-md"
                            : "border-gray-100 bg-white hover:border-[#B9DDF5] hover:bg-[#F8FCFF]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              isSelected
                                ? "bg-[#005DAD] text-white"
                                : "bg-[#EAF5FF] text-[#005DAD]"
                            }`}
                          >
                            <MdLocalHospital className="text-2xl" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="line-clamp-2 font-bold leading-6 text-[#164B73]">
                              {hospital.name}
                            </h3>

                            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                              <MdLocationOn className="text-base text-[#1685CC]" />
                              <span>
                                {hospital.city}
                                {hospital.province
                                  ? `، ${hospital.province}`
                                  : ""}
                              </span>
                            </div>

                            <p className="mt-2 line-clamp-1 text-xs text-gray-400">
                              {hospital.address}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {hospital.doctorsCount} پزشک
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                          <span className="text-xs font-medium text-[#005DAD]">
                            {hospital.lat !== null
                              ? "نمایش روی نقشه"
                              : "مختصات ثبت نشده"}
                          </span>

                          <MdLocationOn className="text-lg text-[#005DAD]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default GovernmentHospitals;
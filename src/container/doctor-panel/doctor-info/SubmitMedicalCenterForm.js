import React, { useState, useEffect } from "react";
import { PiWarningCircleLight } from "react-icons/pi";
import { LuPlus } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// آیکون‌های leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

import {
  add_Office,
  read_office_type,
  create_doctor_treatment,
  extract_office_id,
} from "../../../api/ApiCalling"; // مسیر را چک کن
import { Eror } from "../../../components/ToastAlerts";
import { userProfileStore, userDoctorStorage } from "../../../store/Store"; // مسیر را چک کن
import {
  ProvinceSelectInput,
  CitySelectInput,
} from "../../../components/Inputs/Input"; // مسیر را چک کن

// تغییر مرکز نقشه
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 15);
    }
  }, [center, zoom, map]);
  return null;
}

// گرفتن کلیک روی نقشه
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
}

function SubmitMedicalCenterForm({ onCreated }) {
  const { phoneNum } = userProfileStore();
  const { doctorid } = userDoctorStorage(); // آیدی دکتر

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // نوع مطب
  const [officeTypes, setOfficeTypes] = useState([]);

  // استان و شهر
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    geolat: 0,
    geolon: 0,
    phone: phoneNum || "",
    PostalCode: "",
    officeTypeId: "",
    desc: "",
  });

  const [position, setPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState([35.6892, 51.389]);

  // تشخیص نوع مطب تصویری یا صوتی
  const selectedOfficeType = officeTypes.find(
    (item) => String(item.id) === String(formData.officeTypeId)
  )?.type;

  const isVirtualOffice =
    selectedOfficeType === "تصویری" || selectedOfficeType === "تلفی" || selectedOfficeType === "پیامرسان";

  // خواندن انواع مطب
  useEffect(() => {
    const fetchOfficeTypes = async () => {
      const data = await read_office_type();
      if (data) {
        setOfficeTypes(data);
      }
    };
    fetchOfficeTypes();
  }, []);

  // وقتی نوع مطب مجازی شد، فیلدهای مربوطه رو پاک کن
  useEffect(() => {
    if (isVirtualOffice) {
      setPosition(null);
      setFormData((prev) => ({
        ...prev,
        geolat: 0,
        geolon: 0,
        PostalCode: "",
        address: "",
      }));
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isVirtualOffice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMapSelect = (pos) => {
    setPosition(pos);
    setFormData((prev) => ({
      ...prev,
      geolat: pos.lat,
      geolon: pos.lng,
    }));
  };

  // جستجوی آدرس
  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    setSearchResults([]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&countrycodes=ir&limit=8`,
        {
          headers: {
            "Accept-Language": "fa",
          },
        }
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
        Eror("مکانی با این عبارت پیدا نشد");
      }
    } catch (error) {
      console.error("خطا در جستجو:", error);
      Eror("خطا در جستجوی آدرس");
    } finally {
      setSearching(false);
    }
  };

  // انتخاب یکی از نتایج جستجو
  const handleSelectResult = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    const newPos = { lat, lng };
    setPosition(newPos);
    setMapCenter([lat, lng]);
    setFormData((prev) => ({
      ...prev,
      geolat: lat,
      geolon: lng,
      address: prev.address || result.display_name,
    }));

    setSearchResults([]);
    setSearchQuery(result.display_name);
  };

  // ریست فرم
  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      geolat: 0,
      geolon: 0,
      phone: phoneNum || "",
      PostalCode: "",
      officeTypeId: "",
      desc: "",
    });
    setPosition(null);
    setSearchQuery("");
    setSearchResults([]);
    setCityId(null);
    setCities([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      Eror("لطفاً نام مطب را وارد کنید");
      return;
    }

    // فقط برای مطب فیزیکی آدرس و موقعیت اجباریه
    if (!isVirtualOffice) {
      if (!formData.address.trim()) {
        Eror("لطفاً آدرس مطب را وارد کنید");
        return;
      }
      if (!position) {
        Eror(
          "لطفاً موقعیت مطب را روی نقشه انتخاب کنید یا از نتایج جستجو انتخاب کنید"
        );
        return;
      }
    }

    if (!cityId || !cityId.id) {
      Eror("لطفاً شهر را انتخاب کنید");
      return;
    }

    if (!formData.officeTypeId) {
      Eror("لطفاً نوع مطب را انتخاب کنید");
      return;
    }

    if (!doctorid) {
      Eror("آیدی پزشک یافت نشد. لطفاً دوباره وارد شوید.");
      return;
    }

    const payload = {
      metadata: {
        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userName: "string",
        smeProfileId: 0,
      },
      name: formData.name.trim(),
      address: isVirtualOffice ? "" : formData.address.trim(),
      geolat: isVirtualOffice ? 0 : Number(formData.geolat),
      geolon: isVirtualOffice ? 0 : Number(formData.geolon),
      phone: phoneNum || formData.phone,
      cityId: Number(cityId.id),
      PostalCode: isVirtualOffice ? "" : formData.PostalCode,
      officeTypeId: Number(formData.officeTypeId),
    };

    console.log("Payload ایجاد مطب:", payload);

    setLoading(true);

    // ۱. اول مطب را می‌سازیم (setLoading را پاس نمی‌دهیم تا تا پایان تخصیص لودینگ بماند)
    const res = await add_Office(payload, null, null);

    if (!res) {
      // خطای ساخت مطب توسط اینترسپتور نمایش داده شده است
      setLoading(false);
      return;
    }

    // ۲. آیدی مطب را می‌گیریم و به پزشک تخصیص می‌دهیم
    const officeId = extract_office_id(res);

    if (!officeId) {
      console.error("آیدی مطب از پاسخ سرور دریافت نشد", res?.data);
      setLoading(false);
      Eror(
        "مطب ثبت شد اما تخصیص خودکار انجام نشد. لطفاً از «تنظیمات مرکز درمانی» تخصیص را انجام دهید."
      );
      resetForm();
      onCreated && onCreated();
      return;
    }

    const treatmentPayload = {
      doctorId: Number(doctorid),
      clinicId: "", // خالی
      officeId: officeId, // فقط این پر می‌شود
      desc: formData.desc?.trim() || "",
      cityId: Number(cityId.id),
    };

    console.log("Payload تخصیص مطب به دکتر:", treatmentPayload);

    // ۳. تخصیص مطب به پزشک
    const assignRes = await create_doctor_treatment(
      treatmentPayload,
      null,
      null,
      "مطب با موفقیت ثبت و به شما تخصیص داده شد"
    );

    setLoading(false);

    if (assignRes) {
      resetForm();
      onCreated && onCreated();
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Warning banner */}
      <div className="w-full flex items-center gap-3 text-[#005DAD] bg-[#ECF6FF] rounded-lg border border-[#005DAD] px-5 py-3">
        <PiWarningCircleLight className="text-xl shrink-0" />
        <h5 className="text-sm sm:text-base">
          پزشک گرامی لطفا اطلاعات مربوط به مطب خود را وارد نمایید.
        </h5>
      </div>

      {/* Add more clinics button */}


      {/* Main form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-md flex flex-col gap-6 p-5 sm:p-6"
      >
        {/* Section title */}
        <div className="flex flex-wrap items-center gap-1">
          <h5 className="text-lg font-semibold text-gray-800">اطلاعات مطب:</h5>
          <h5 className="text-sm text-[#7D7D7D]">
            ( لطفا اطلاعات مطب خود را وارد کنید )
          </h5>
        </div>

        {/* Row 1: نام مطب + نوع مطب */}
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          <div className="flex flex-col w-full sm:w-[48%] gap-2">
            <label className="text-base font-semibold text-gray-800">
              نام مطب
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="لطفا نام مطب را وارد کنید"
              className="w-full bg-[#F7F7F7] py-3.5 px-4 border border-[#6B6B6B] rounded-lg outline-none focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] transition"
              required
            />
          </div>

          <div className="flex flex-col w-full sm:w-[48%] gap-2">
            <label className="text-base font-semibold text-gray-800">
              نوع مطب
            </label>
            <select
              name="officeTypeId"
              value={formData.officeTypeId}
              onChange={handleChange}
              className="w-full bg-[#F7F7F7] py-3.5 px-4 border border-[#6B6B6B] rounded-lg outline-none focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] transition"
              required
            >
              <option value="">نوع مطب را انتخاب کنید</option>
              {officeTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* استان و شهر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-gray-800">
              استان
            </label>
            <ProvinceSelectInput hiddentitle setCities={setCities} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-gray-800">
              شهر <span className="text-red-500">*</span>
            </label>
            <CitySelectInput
              hiddentitle
              setCityId={setCityId}
              cities={cities}
              cityId={cityId}
            />
          </div>
        </div>

        {/* کد پستی + آدرس + نقشه - فقط برای مطب فیزیکی */}
        {!isVirtualOffice && (
          <div className="flex flex-col lg:flex-row justify-between gap-5 items-start">
            <div className="flex flex-col gap-5 w-full lg:w-[48%]">
              <div className="flex flex-col gap-2">
                <label className="text-base font-semibold text-gray-800">
                  کد پستی
                </label>
                <input
                  type="text"
                  name="PostalCode"
                  value={formData.PostalCode}
                  onChange={handleChange}
                  placeholder="لطفا کد پستی را وارد کنید"
                  className="w-full bg-[#F7F7F7] py-3.5 px-4 border border-[#6B6B6B] rounded-lg outline-none focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] transition"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-base font-semibold text-gray-800">
                  آدرس مطب
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="لطفا آدرس مطب را وارد کنید"
                  className="w-full resize-none px-4 h-[120px] bg-[#F7F7F7] py-3.5 border border-[#6B6B6B] rounded-lg outline-none focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] transition"
                  required
                />
              </div>
            </div>

            {/* نقشه + جستجو */}
            <div className="w-full lg:w-[48%] flex flex-col gap-2">
              <label className="text-base font-semibold text-gray-800">
                لوکیشن مطب
              </label>

              <div className="relative">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                    placeholder="جستجوی آدرس (مثال: تهران، ونک)"
                    className="flex-1 bg-[#F7F7F7] py-2.5 px-3 border border-[#6B6B6B] rounded-lg outline-none focus:border-[#005DAD] text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={searching}
                    className="bg-[#005DAD] text-white px-3 rounded-lg hover:bg-[#004a8f] transition flex items-center justify-center disabled:opacity-60"
                  >
                    {searching ? (
                      <span className="text-xs">...</span>
                    ) : (
                      <CiSearch className="text-xl" />
                    )}
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-52 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <button
                        key={result.place_id || index}
                        type="button"
                        onClick={() => handleSelectResult(result)}
                        className="w-full text-right px-3 py-2.5 text-sm hover:bg-[#ECF6FF] border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <span className="line-clamp-2">
                          {result.display_name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="h-60 rounded-xl border border-[#6B6B6B] overflow-hidden relative z-0">
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ChangeView center={mapCenter} zoom={15} />
                  <LocationMarker
                    position={position}
                    setPosition={handleMapSelect}
                  />
                </MapContainer>
              </div>

              {position && (
                <p className="text-xs text-gray-500">
                  موقعیت انتخاب‌شده: {position.lat.toFixed(5)} ,{" "}
                  {position.lng.toFixed(5)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* توضیحات */}
        <div className="flex flex-col w-full gap-2">
          <label className="text-base font-semibold text-gray-800">
            توضیحات{" "}
            <span className="text-sm font-normal text-[#7D7D7D]">
              (اختیاری — مثلا شرایط یا قوانین خاص مطب)
            </span>
          </label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            rows={3}
            placeholder="توضیحات مربوط به این مطب را وارد کنید"
            className="w-full resize-none bg-[#F7F7F7] py-3.5 px-4 border border-[#6B6B6B] rounded-lg outline-none focus:border-[#005DAD] focus:ring-1 focus:ring-[#005DAD] transition"
          />
        </div>

        {/* تلفن */}
        <div className="flex flex-col w-full gap-2">
          <label className="text-base font-semibold text-gray-800">
            شماره تلفن
          </label>
          <input
            type="text"
            value={phoneNum || "شماره ثبت نشده"}
            disabled
            className="w-full bg-gray-100 py-3.5 px-4 border border-[#6B6B6B] rounded-lg text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* دکمه ثبت */}
        <div className="w-full flex justify-center pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`text-white bg-[#005DAD] hover:bg-[#004a8f] py-3 px-6 w-full sm:w-[40%] rounded-lg font-medium transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "در حال ثبت..." : "ثبت اطلاعات"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubmitMedicalCenterForm;
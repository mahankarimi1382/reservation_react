import React, { useEffect, useState } from "react";
import bahramMirzayi from "../../../assets/Pics/bahramMirzayi.png";
import { get_doctor_profile_by_id } from "../../../api/ApiCalling";
import { userDoctorStorage } from "../../../store/Store";

// docInstaLink ممکن است base64، آدرس تصویر، رشته‌ی بی‌معنی "string"، آرایه یا
// خالی باشد. اگر خالی یا "string" یا "null" بود عکس پیش‌فرض را برمی‌گردانیم.
export const resolveDoctorImage = (docInstaLink) => {
  const fallback = bahramMirzayi;

  if (Array.isArray(docInstaLink)) {
    const firstValid = docInstaLink.find(
      (item) =>
        typeof item === "string" &&
        item.trim() !== "" &&
        item.trim() !== "string" &&
        item.trim() !== "null" &&
        item.trim() !== "undefined"
    );
    return firstValid || fallback;
  }

  if (!docInstaLink) return fallback;

  const value = String(docInstaLink).trim();
  if (
    value === "" ||
    value === "string" ||
    value === "null" ||
    value === "undefined"
  ) {
    return fallback;
  }

  return value;
};

function DoctorInfoHeader() {
  const { doctorid } = userDoctorStorage();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      if (!doctorid) {
        if (isMounted) setLoading(false);
        return;
      }

      setLoading(true);
      const data = await get_doctor_profile_by_id(doctorid);
      if (!isMounted) return;

      if (data) {
        setDoctorProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [doctorid]);

  const fullName = doctorProfile
    ? `${doctorProfile.doctorName || ""} ${doctorProfile.doctorFamily || ""}`.trim()
    : "";

  const displayName =
    loading
      ? "در حال دریافت اطلاعات..."
      : !fullName || fullName === "string"
      ? "کاربر مهمان"
      : fullName;

  return (
    <div className="text-white gap-3 p-5 w-[80%] flex flex-col justify-center items-center rounded-3xl shadow-md bg-[#78C0FD]">
      <img
        src={resolveDoctorImage(doctorProfile?.docInstaLink)}
        alt="doctor"
        width={113}
        height={113}
        className="rounded-full bg-white object-cover w-[113px] h-[113px]"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = bahramMirzayi;
        }}
      />
      <h5 className="text-xl font-semibold">{displayName}</h5>
      <h5 className="text-lg">
        کد نظام پزشکی:{" "}
        {doctorProfile?.codeNezam && doctorProfile.codeNezam !== "string"
          ? doctorProfile.codeNezam
          : "-"}
      </h5>
    </div>
  );
}

export default DoctorInfoHeader;

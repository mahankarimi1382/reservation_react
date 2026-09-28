import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { read_followed_profile } from "../../../api/ApiCalling";
import { smeIdStorage } from "../../../store/Store";

function SavedsSummarySection() {
  const { smeId } = smeIdStorage();
  const [followed, setFollowed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // پروفایل‌های نشان‌شده (فالوشده) کاربر از بک‌اند خوانده می‌شود
  useEffect(() => {
    if (!smeId) {
      setIsLoading(false);
      return;
    }
    read_followed_profile(smeId)
      .then((list) => {
        setFollowed(list ?? []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [smeId]);

  return (
    <div className=" xxl:w-[350px] flex flex-col">
      {isLoading && (
        <div className=" flex justify-center items-center py-8">
          <SyncLoader color="#005DAD" size={8} />
        </div>
      )}
      {!isLoading && followed.length === 0 && (
        <div className=" border-b p-6 mb-5 border-dashed border-[#D3E9FD] flex justify-center">
          <h5 className=" text-xs lg:text-sm text-[#757575]">
            پزشک نشان‌شده‌ای ندارید
          </h5>
        </div>
      )}
      {followed.slice(0, 3).map((item) => (
        <div
          key={item.id}
          className=" border-b p-2 mb-2 border-dashed border-[#D3E9FD] flex items-center gap-2"
        >
          <span className=" text-xs lg:text-sm text-[#005DAD]">
            {item.followProfileName || "پزشک نشان‌شده"}
          </span>
        </div>
      ))}
      {!isLoading && followed.length > 0 && (
        <h5 className=" text-xs text-[#757575]">
          مجموع نشان‌شده‌ها: {followed.length}
        </h5>
      )}
    </div>
  );
}

export default SavedsSummarySection;

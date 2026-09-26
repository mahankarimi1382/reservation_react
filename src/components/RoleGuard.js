import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { SyncLoader } from "react-spinners";
import { get_user_role_by_username } from "../api/ApiCalling";
import { userProfileStore } from "../store/Store";

/*
 * گارد دسترسی پنل ادمین (روند ۱۰):
 * - بدون توکن → هدایت به خانه
 * - نقش کاربر خوانده می‌شود؛ فقط نقش‌های ادمین اجازه ورود دارند
 * - اگر نقش قابل تشخیص نباشد، برای جلوگیری از قفل شدن ادمین، دسترسی باز می‌ماند
 */
const ADMIN_ROLES = [
  "superadmin",
  "dentistadmin",
  "psychiatristadmin",
  "supportadmin",
  "treatmentcentersadmin",
  "admin",
];

export function RequireAdmin() {
  const navigate = useNavigate();
  const { phoneNum } = userProfileStore();
  const [state, setState] = useState("checking"); // checking | allowed | denied

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const roles = await get_user_role_by_username(phoneNum ?? "");
        const roleName = (
          roles?.[0]?.roleName ||
          roles?.roleName ||
          ""
        )
          .toString()
          .trim()
          .toLowerCase();
        if (cancelled) return;
        // اگر نقشی برای کاربر ثبت نشده باشد، دسترسی بسته می‌شود
        if (!roleName) {
          setState("denied");
          return;
        }
        setState(
          ADMIN_ROLES.some((r) => roleName.includes(r)) ? "allowed" : "denied"
        );
      } catch (error) {
        console.log("role guard error", error);
        // خطای شبکه/سرویس نقش → دسترسی بسته نمی‌شود تا ادمین قفل نشود
        if (!cancelled) setState("allowed");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, phoneNum]);

  if (state === "checking") {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex justify-center items-center bg-[#F6FBFF]"
      >
        <SyncLoader color="#005DAD" size={12} />
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex flex-col gap-5 justify-center items-center bg-[#F6FBFF]"
      >
        <h2 className="text-2xl text-[#C30505]">دسترسی غیرمجاز</h2>
        <p className="text-[#757575]">
          شما اجازه دسترسی به پنل مدیریت را ندارید.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#005DAD] text-white px-10 py-3 rounded-lg"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    );
  }

  return <Outlet />;
}

/*
 * گارد ورود برای پنل‌های کاربر/پزشک: فقط وجود توکن بررسی می‌شود
 */
export function RequireAuth() {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex justify-center items-center bg-[#F6FBFF]"
      >
        <SyncLoader color="#005DAD" size={12} />
      </div>
    );
  }

  return <Outlet />;
}

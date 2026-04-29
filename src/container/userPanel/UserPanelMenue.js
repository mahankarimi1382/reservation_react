import React from "react";
import { Link } from "react-router-dom";
import { PanelLink } from "../../components/Links/Links";
import { useLocation } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { fullNameStorage } from "../../store/Store";

function UserPanelMenue() {
  const location = useLocation();
  const pathName = location.pathname;

  const { fullName } = fullNameStorage();

  return (
    <div className="hidden w-[250px] rounded-l-[60px] lg:flex flex-col items-center">

      <div
        className={`${
          pathName === "/userPanel/dashboard" && "rounded-l-[40px]"
        } p-5 rounded-tl-[40px] bg-[#DBEDFF] w-full flex flex-col justify-center items-center gap-2`}
      >
        <img 
          src="/Pics/userPanelProfile.png" 
          width={90} 
          alt="profile-photo" 
        />

        <h2 className="text-xl">
          {fullName === "string" ? "کاربر مهمان" : fullName}
        </h2>
      </div>

      <PanelLink
        href="/userPanel/dashboard"
        title="داشبورد"
        blueIcon="/Pics/UserPanel-Icons/dashboard-icon.png"
        blackIcon="/Pics/UserPanel-Icons/dashboard-icon-black.png"
      />

      <PanelLink
        href="/userPanel/acountInfo"
        title="اطلاعات اکانت"
        blueIcon="/Pics/UserPanel-Icons/acountInfo-icon.png"
        blackIcon="/Pics/UserPanel-Icons/acountInfo-icon-black.png"
      />

      <PanelLink
        href="/userPanel/history"
        title="سوابق"
        blueIcon="/Pics/UserPanel-Icons/history-icon.png"
        blackIcon="/Pics/UserPanel-Icons/history-icon-black.png"
      />

      <PanelLink
        href="/userPanel/messages"
        title="پیغام ها"
        blueIcon="/Pics/UserPanel-Icons/message-icon.png"
        blackIcon="/Pics/UserPanel-Icons/message-icon-black.png"
      />

      <PanelLink
        href="/userPanel/transactions"
        title="تراکنش ها"
        blueIcon="/Pics/UserPanel-Icons/transaction-icon.png"
        blackIcon="/Pics/UserPanel-Icons/transaction-icon-black.png"
      />

      <PanelLink
        href="/userPanel/wallet"
        title="کیف پول"
        blueIcon="/Pics/UserPanel-Icons/wallet-icon.png"
        blackIcon="/Pics/UserPanel-Icons/wallet-icon-black.png"
      />

      <PanelLink
        href="/userPanel/rewards"
        title="امتیاز ها"
        blueIcon="/Pics/UserPanel-Icons/rewards-icon.png"
        blackIcon="/Pics/UserPanel-Icons/rewards-icon-black.png"
      />

      <PanelLink
        href="/userPanel/opinions"
        title="نظرات"
        blueIcon="/Pics/UserPanel-Icons/opinions-icon.png"
        blackIcon="/Pics/UserPanel-Icons/opinions-icon-black.png"
      />

      <PanelLink
        href="/userPanel/saves"
        title="ذخیره شده ها"
        blueIcon="/Pics/UserPanel-Icons/saves-icon.png"
        blackIcon="/Pics/UserPanel-Icons/saves-icon-black.png"
      />

      <PanelLink
        href="/userPanel/favorites"
        title="علاقه مندی ها"
        blueIcon="/Pics/UserPanel-Icons/heart-blue.png"
        blackIcon="/Pics/UserPanel-Icons/heart-black.png"
      />

      <PanelLink
        href="/userPanel/subsetedusers"
        title="کاربران زیرمجموعه"
        blueIcon="/Pics/UserPanel-Icons/subsetedUsers-icon.png"
        blackIcon="/Pics/UserPanel-Icons/subsetedUsers-icon-black.png"
      />

      <div
        className={
          pathName === "/userPanel/subsetedusers"
            ? "bg-[#DBEDFF] pr-6 rounded-l-[60px] w-full"
            : "bg-[#DBEDFF] pr-6 rounded-bl-[60px] w-full"
        }
      >
        <Link
          className="justify-start gap-2 p-5 flex items-center w-full"
          to="/"
        >
          <IoLogOutOutline className="text-2xl text-red-600" />
          خروج
        </Link>
      </div>
    </div>
  );
}

export default UserPanelMenue;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PanelLink } from "../../components/Links/Links";
import { IoLogOutOutline } from "react-icons/io5";
import { fullNameStorage } from "../../store/Store";

import profileImg from "../../assets/Pics/userPanelProfile.png";

import dashboardBlueIcon from "../../assets/Pics/UserPanel-Icons/dashboard-icon.png";
import dashboardBlackIcon from "../../assets/Pics/UserPanel-Icons/dashboard-icon-black.png";

import accountBlueIcon from "../../assets/Pics/UserPanel-Icons/acountInfo-icon.png";
import accountBlackIcon from "../../assets/Pics/UserPanel-Icons/acountInfo-icon-black.png";

import historyBlueIcon from "../../assets/Pics/UserPanel-Icons/history-icon.png";
import historyBlackIcon from "../../assets/Pics/UserPanel-Icons/history-icon-black.png";

import messageBlueIcon from "../../assets/Pics/UserPanel-Icons/message-icon.png";
import messageBlackIcon from "../../assets/Pics/UserPanel-Icons/message-icon-black.png";

import transactionBlueIcon from "../../assets/Pics/UserPanel-Icons/transaction-icon.png";
import transactionBlackIcon from "../../assets/Pics/UserPanel-Icons/transaction-icon-black.png";

import walletBlueIcon from "../../assets/Pics/UserPanel-Icons/wallet-icon.png";
import walletBlackIcon from "../../assets/Pics/UserPanel-Icons/wallet-icon-black.png";

import rewardsBlueIcon from "../../assets/Pics/UserPanel-Icons/rewards-icon.png";
import rewardsBlackIcon from "../../assets/Pics/UserPanel-Icons/rewards-icon-black.png";

import opinionsBlueIcon from "../../assets/Pics/UserPanel-Icons/opinions-icon.png";
import opinionsBlackIcon from "../../assets/Pics/UserPanel-Icons/opinions-icon-black.png";

import savesBlueIcon from "../../assets/Pics/UserPanel-Icons/saves-icon.png";
import savesBlackIcon from "../../assets/Pics/UserPanel-Icons/saves-icon-black.png";

import heartBlueIcon from "../../assets/Pics/UserPanel-Icons/heart-blue.png";
import heartBlackIcon from "../../assets/Pics/UserPanel-Icons/heart-black.png";

import subsetUsersBlueIcon from "../../assets/Pics/UserPanel-Icons/subsetedUsers-icon.png";
import subsetUsersBlackIcon from "../../assets/Pics/UserPanel-Icons/subsetedUsers-icon-black.png";

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
          src={profileImg}
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
        blueIcon={dashboardBlueIcon}
        blackIcon={dashboardBlackIcon}
      />

      <PanelLink
        href="/userPanel/acountInfo"
        title="اطلاعات اکانت"
        blueIcon={accountBlueIcon}
        blackIcon={accountBlackIcon}
      />

      <PanelLink
        href="/userPanel/history"
        title="سوابق"
        blueIcon={historyBlueIcon}
        blackIcon={historyBlackIcon}
      />

      <PanelLink
        href="/userPanel/messages"
        title="پیغام ها"
        blueIcon={messageBlueIcon}
        blackIcon={messageBlackIcon}
      />

      <PanelLink
        href="/userPanel/transactions"
        title="تراکنش ها"
        blueIcon={transactionBlueIcon}
        blackIcon={transactionBlackIcon}
      />

      <PanelLink
        href="/userPanel/wallet"
        title="کیف پول"
        blueIcon={walletBlueIcon}
        blackIcon={walletBlackIcon}
      />

      <PanelLink
        href="/userPanel/rewards"
        title="امتیاز ها"
        blueIcon={rewardsBlueIcon}
        blackIcon={rewardsBlackIcon}
      />

      <PanelLink
        href="/userPanel/opinions"
        title="نظرات"
        blueIcon={opinionsBlueIcon}
        blackIcon={opinionsBlackIcon}
      />

      <PanelLink
        href="/userPanel/saves"
        title="ذخیره شده ها"
        blueIcon={savesBlueIcon}
        blackIcon={savesBlackIcon}
      />

      <PanelLink
        href="/userPanel/favorites"
        title="علاقه مندی ها"
        blueIcon={heartBlueIcon}
        blackIcon={heartBlackIcon}
      />

      <PanelLink
        href="/userPanel/subsetedusers"
        title="کاربران زیرمجموعه"
        blueIcon={subsetUsersBlueIcon}
        blackIcon={subsetUsersBlackIcon}
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

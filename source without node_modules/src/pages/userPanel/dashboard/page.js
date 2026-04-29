import Navbar from "../../../components/Navbar";
import DashboardBox from "../../../container/userPanel/dashboard/DashboardBox";
import HistorySummarySection from "../../../container/userPanel/dashboard/HistorySummarySection";
import UserPanelMenue from "../../../container/userPanel/UserPanelMenue";
import React from "react";

import historyIcon from "../../../assets/Pics/history-icon.png";
import RewardsSummarySection from "../../../container/userPanel/dashboard/RewardsSummarySection";
import rewardsIcon from "../../../assets/Pics/UserPanel-Icons/rewards-icon.png";
import messageIcon from "../../../assets/Pics/UserPanel-Icons/message-icon.png";
import profile from "../../../assets/Pics/userPanelProfile.png";
import MessageSummarySection from "../../../container/userPanel/dashboard/MessageSummarySection";
import opinnionsIcon from "../../../assets/Pics/UserPanel-Icons/opinions-icon.png";
import OpinnionsSummarySection from "../../../container/userPanel/dashboard/OpinnionsSummarySection";
import WalletSummarySection from "../../../container/userPanel/dashboard/WalletSummarySection";
import walletIcon from "../../../assets/Pics/UserPanel-Icons/wallet-icon.png";
import savedsIcon from "../../../assets/Pics/UserPanel-Icons/saves-icon.png";
import SavedsSummarySection from "../../../container/userPanel/dashboard/SavedsSummarySection";
import { fullNameStorage } from "../../../store/Store";

import { useLocation } from "react-router-dom";

// Blue icons
import dashboardIcon_blue from "../../../assets/Pics/UserPanel-Icons/dashboard-icon.png";
import acountInfoIcon_blue from "../../../assets/Pics/UserPanel-Icons/acountInfo-icon.png";
import historyIcon_blue from "../../../assets/Pics/UserPanel-Icons/history-icon.png";
import messageIcon_blue from "../../../assets/Pics/UserPanel-Icons/message-icon.png";
import rewardsIcon_blue from "../../../assets/Pics/UserPanel-Icons/rewards-icon.png";
import transactionsIcon_blue from "../../../assets/Pics/UserPanel-Icons/transaction-icon.png";
import walletIcon_blue from "../../../assets/Pics/UserPanel-Icons/wallet-icon.png";
import opinions_blue from "../../../assets/Pics/UserPanel-Icons/opinions-icon.png";
import saves_blue from "../../../assets/Pics/UserPanel-Icons/saves-icon.png";
import heart_blue from "../../../assets/Pics/UserPanel-Icons/heart-blue.png";


// -------- Phone Title Component ----------
export const UserPanel_PhoneTitle = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const map = {
    "/userPanel/dashboard": {
      title: "داشبورد",
      icon: dashboardIcon_blue,
    },
    "/userPanel/acountInfo": {
      title: "اطلاعات حساب کاربری",
      icon: acountInfoIcon_blue,
    },
    "/userPanel/history": {
      title: "سوابق",
      icon: historyIcon_blue,
    },
    "/userPanel/messages": {
      title: "پیغام ها",
      icon: messageIcon_blue,
    },
    "/userPanel/transactions": {
      title: "تراکنش ها",
      icon: transactionsIcon_blue,
    },
    "/userPanel/wallet": {
      title: "کیف پول",
      icon: walletIcon_blue,
    },
    "/userPanel/rewards": {
      title: "امتیاز ها",
      icon: rewardsIcon_blue,
    },
    "/userPanel/opinions": {
      title: "نظرات",
      icon: opinions_blue,
    },
    "/userPanel/saves": {
      title: "ذخیره شده ها",
      icon: saves_blue,
    },
    "/userPanel/favorites": {
      title: "علاقه‌مندی",
      icon: heart_blue,
    },
  };

  const selected = map[pathName];

  if (!selected) return null;

  return (
    <div className=" my-3 text-[#005DAD] flex items-center gap-1 lg:hidden w-[90%] mx-auto">
      <img width={24} alt="icon" src={selected.icon} />
      {selected.title}
    </div>
  );
};


// ---------- Main Page Component ----------
function Page() {
  const { fullName } = fullNameStorage();

  return (
    <div dir="rtl" className=" pb-20 lg:pb-0 bg-[#F6FBFF] w-full">
      <Navbar />
      <UserPanel_PhoneTitle />

      <div className=" flex w-full">
        <UserPanelMenue />

        <div className=" lg:w-[82%] flex justify-center ">
          <div className=" gap-2 p-2 lg:p-0  bg-white w-[90%]  rounded-xl shadow-md flex flex-col lg:gap-4 xl:gap-10 lg:w-[97%] xl:w-[90%]">
            
            {/* Welcome */}
            <div className=" flex lg:flex-row flex-col xl:gap-3 lg:gap-1 lg:p-2 xl:p-5 items-center">
              <img src={profile} width={67} alt="profile" />
              <h2 className=" text-lg">
                {fullName === "string" ? "کاربر مهمان" : fullName} خوش آمدید
              </h2>
            </div>

            {/* First Row */}
            <div className=" gap-y-2 xl:-mt-10 flex lg:flex-row flex-wrap justify-between lg:px-2 xl:px-10">
              <DashboardBox title="سوابق" icon={historyIcon}>
                <HistorySummarySection />
              </DashboardBox>

              <DashboardBox is45 title="امتیاز ها" icon={rewardsIcon}>
                <RewardsSummarySection />
              </DashboardBox>

              <DashboardBox title="پیغام ها" icon={messageIcon}>
                <MessageSummarySection />
              </DashboardBox>
            </div>

            {/* Second Row */}
            <div className=" flex justify-between gap-y-2 flex-wrap lg:px-2 xl:px-10">
              <DashboardBox Wfull title="نظرات" icon={opinnionsIcon}>
                <OpinnionsSummarySection />
              </DashboardBox>

              <DashboardBox Wfull title="کیف پول" icon={walletIcon}>
                <WalletSummarySection />
              </DashboardBox>

              <DashboardBox Wfull title="ذخیره شده ها" icon={savedsIcon}>
                <SavedsSummarySection />
              </DashboardBox>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

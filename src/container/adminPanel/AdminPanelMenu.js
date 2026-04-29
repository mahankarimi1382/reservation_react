"use client";
import React from "react";
import logo from "../../assets/Pics/logo-doctor.png";
import dashboard_icon_black from "../../assets/Pics/Adminpanelmenu-icon/dashboard-icon-black.png";
import dashboard_icon from "../../assets/Pics/Adminpanelmenu-icon/dashboard-icon.png";
import {
  AdminPanelimageSetting_action,
  AdminPanelLink,
  AdminPanelMeeicalcenters_action,
  AdminPanelreport_action,
  AdminPanelsupport_action,
} from "../../components/Links/Links";
import turns_icon from "../../assets/Pics/Adminpanelmenu-icon/turns-icon.png";
import turns_icon_black from "../../assets/Pics/Adminpanelmenu-icon/turns-icon-black.png";
import skills_icon from "../../assets/Pics/Adminpanelmenu-icon/skills-icon.png";
import skills_icon_black from "../../assets/Pics/Adminpanelmenu-icon/skills-icon-black.png";
import doctors_icon from "../../assets/Pics/Adminpanelmenu-icon/doctors-icon.png";
import doctors_icon_black from "../../assets/Pics/Adminpanelmenu-icon/doctors-icon-black.png";
import patients_icon from "../../assets/Pics/Adminpanelmenu-icon/patients-icon.png";
import patients_icon_black from "../../assets/Pics/Adminpanelmenu-icon/patients-icon-black.png";
import transactions_icon from "../../assets/Pics/Adminpanelmenu-icon/transaction-icon.png";
import transactions_icon_black from "../../assets/Pics/Adminpanelmenu-icon/transaction-icon-black.png";
import opinions_icon from "../../assets/Pics/Adminpanelmenu-icon/opinions-icon.png";
import opinions_icon_black from "../../assets/Pics/Adminpanelmenu-icon/opinions-icon-black.png";
import blacklist_icon from "../../assets/Pics/Adminpanelmenu-icon/blacklist-icon.png";
import blacklist_icon_black from "../../assets/Pics/Adminpanelmenu-icon/blacklist-icon-black.png";
import reports_icon from "../../assets/Pics/Adminpanelmenu-icon/reports-icon.png";
import reports_icon_black from "../../assets/Pics/Adminpanelmenu-icon/reports-icon-black.png";
import support_icon from "../../assets/Pics/Adminpanelmenu-icon/support-icon.png";
import support_icon_black from "../../assets/Pics/Adminpanelmenu-icon/support-icon-black.png";
import imagesetting_icon_black from "../../assets/Pics/Adminpanelmenu-icon/imagesetting-icon-black.png";
import imagesetting_icon from "../../assets/Pics/Adminpanelmenu-icon/imagesetting-icon.png";
import usersaccess_icon_black from "../../assets/Pics/Adminpanelmenu-icon/usersAccess-icon-black.png";
import usersaccess_icon from "../../assets/Pics/Adminpanelmenu-icon/usersAccess-icon.png";
import medicalcenters_icon_black from "../../assets/Pics/Adminpanelmenu-icon/hospital-black.png";
import medicalcenters_icon from "../../assets/Pics/Adminpanelmenu-icon/hospital.png";
function AdminPanelMenu() {
  return (
    <div className=" min-w-[250px] bg-[#DBEDFF] gap-5 flex flex-col items-center ">
      <img className=" pb-8 pt-14" src={logo} width={150} alt="logo" />
      <AdminPanelLink
        title="داشبورد"
        icon={dashboard_icon}
        blackIcon={dashboard_icon_black}
        href="/adminPanel/dashboard"
      />
      <AdminPanelLink
        title="نوبت ها"
        icon={turns_icon}
        blackIcon={turns_icon_black}
        href="/adminPanel/turns"
      />
      <AdminPanelLink
        title="تخصص ها"
        icon={skills_icon}
        blackIcon={skills_icon_black}
        href="/adminPanel/specialties"
      />
      <AdminPanelLink
        title="پزشکان"
        icon={doctors_icon}
        blackIcon={doctors_icon_black}
        href="/adminPanel/doctors"
      />
      <AdminPanelLink
        title="بیماران"
        icon={patients_icon}
        blackIcon={patients_icon_black}
        href="/adminPanel/patients"
      />
      <AdminPanelLink
        title="نظرات"
        icon={opinions_icon}
        blackIcon={opinions_icon_black}
        href="/adminPanel/opinions"
      />{" "}
      <AdminPanelLink
        title="بیمه ها"
        icon={skills_icon}
        blackIcon={skills_icon_black}
        href="/adminPanel/insurances"
      />
      <AdminPanelLink
        title="تراکنش ها"
        icon={transactions_icon}
        blackIcon={transactions_icon_black}
        href="/adminPanel/transactions"
      />{" "}
      <AdminPanelLink
        title="لیست سیاه"
        icon={blacklist_icon}
        blackIcon={blacklist_icon_black}
        href="/adminPanel/blacklist"
      />{" "}
      <AdminPanelreport_action
        title="گزارش ها"
        icon={reports_icon}
        blackIcon={reports_icon_black}
        href="/adminPanel/reports"
      />{" "}
      <AdminPanelsupport_action
        title="پشتیبانی"
        icon={support_icon}
        blackIcon={support_icon_black}
      />
      <AdminPanelimageSetting_action
        title="تنظیمات عکس"
        icon={imagesetting_icon}
        blackIcon={imagesetting_icon_black}
      />
      <AdminPanelLink
        title="دسترسی کاربران"
        icon={usersaccess_icon}
        blackIcon={usersaccess_icon_black}
        href="/adminPanel/useraccess"
      />{" "}
      <AdminPanelMeeicalcenters_action
        title="مراکز درمانی"
        icon={medicalcenters_icon}
        blackIcon={medicalcenters_icon_black}
      />{" "}
    </div>
  );
}

export default AdminPanelMenu;

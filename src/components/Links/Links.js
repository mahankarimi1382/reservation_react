import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

export const NavLinks = (props) => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="flex flex-col justify-center items-center whitespace-nowrap shrink-0">
      <Link
        to={props.href}
        className={
          pathName === props.href
            ? "text-[#004D8F]"
            : "text-black hover:text-[#004D8F] transition-all"
        }
      >
        {props.title}
      </Link>

      {pathName === props.href && (
        <hr className="w-4 rounded-2xl text-2xl h-1 bg-[#004D8F]" />
      )}
    </div>
  );
};

export const PanelLink = (props) => {
  const location = useLocation();
  const pathName = location.pathname;
  const bgFn = () => {
    if (pathName === props.href) {
      return " justify-start bg-[#F6FBFF] gap-2 p-5 rounded-r-[60px] pr-5 flex  items-center w-full";
    } else if (
      (pathName === "/userPanel/dashboard" &&
        props.href === "/userPanel/acountInfo") ||
      (pathName === "/userPanel/acountInfo" &&
        props.href === "/userPanel/history") ||
      (pathName === "/userPanel/history" &&
        props.href === "/userPanel/messages") ||
      (pathName === "/userPanel/messages" &&
        props.href === "/userPanel/transactions") ||
      (pathName === "/userPanel/transactions" &&
        props.href === "/userPanel/wallet") ||
      (pathName === "/userPanel/wallet" &&
        props.href === "/userPanel/rewards") ||
      (pathName === "/userPanel/rewards" &&
        props.href === "/userPanel/opinions") ||
      (pathName === "/userPanel/rewards" &&
        props.href === "/userPanel/opinions") ||
      (pathName === "/userPanel/opinions" &&
        props.href === "/userPanel/saves") ||
      (pathName === "/userPanel/saves" &&
        props.href === "/userPanel/favorites") ||
      (pathName === "/userPanel/favorites" &&
        props.href === "/userPanel/subsetedusers")
    ) {
      return " pr-12 justify-start gap-2 rounded-tl-[50px] bg-[#DBEDFF]  p-5 flex  items-center w-full";
    } else if (
      (pathName === "/userPanel/subsetedusers" &&
        props.href === "/userPanel/favorites") ||
      (pathName === "/userPanel/favorites" &&
        props.href === "/userPanel/saves") ||
      (pathName === "/userPanel/saves" &&
        props.href === "/userPanel/opinions") ||
      (pathName === "/userPanel/opinions" &&
        props.href === "/userPanel/rewards") ||
      (pathName === "/userPanel/rewards" &&
        props.href === "/userPanel/wallet") ||
      (pathName === "/userPanel/wallet" &&
        props.href === "/userPanel/transactions") ||
      (pathName === "/userPanel/transactions" &&
        props.href === "/userPanel/messages") ||
      (pathName === "/userPanel/messages" &&
        props.href === "/userPanel/history") ||
      (pathName === "/userPanel/history" &&
        props.href === "/userPanel/acountInfo") ||
      (pathName === "/userPanel/acountInfo" &&
        props.href === "/userPanel/dashboard")
    ) {
      return " pr-12 justify-start gap-2 rounded-bl-[50px] bg-[#DBEDFF]  p-5 flex  items-center w-full";
    } else {
      return " pr-12 justify-start gap-2 bg-[#DBEDFF]  p-5 flex  items-center w-full";
    }
  };

  return (
    <div
      className={
        pathName === props.href
          ? "bg-[#DBEDFF] pr-7 w-full "
          : " bg-[#F6FBFF] w-full "
      }
    >
      <Link className={bgFn()} to={props.href}>
        <img
          src={pathName === props.href ? props.blueIcon : props.blackIcon}
          alt="icon"
          width={24}
        />
        {props.title}
      </Link>
    </div>
  );
};
export const AdminPanelLink = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);
  return (
    <Link
      to={props.href}
      className={`flex justify-center items-center  relative gap-2 w-full py-3 text-lg ${
        (pathname === props.href ||
          pathname === props.href2 ||
          pathname === props.href3 ||
          pathname === props.href4) &&
        "text-[#005DAD] bg-[#C4E2FF]"
      }`}
    >
      <span
        className={
          pathname !== props.href
            ? "hidden"
            : " w-[6px] h-full bg-[#005DAD] absolute right-0 rounded-l-lg"
        }
      ></span>
      <span className=" flex justify-start items-center gap-2 w-[70%]">
        <img
          width={24}
          src={
            pathname === props.href ||
            pathname === props.href2 ||
            pathname === props.href3 ||
            pathname === props.href4
              ? props.icon
              : props.blackIcon
          }
          alt="icon"
        />
        {props.title}
      </span>
    </Link>
  );
};
export const AdminPanelreport_action = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);
  const handlePagePath = () => {
    if (
      pathname === "/adminPanel/reports/hozorireports" ||
      pathname === "/adminPanel/reports/onlinereports" ||
      pathname === "/adminPanel/reports/centerstatus" ||
      pathname === "/adminPanel/reports/doctorstatus" ||
      pathname === "/adminPanel/reports/doctorscancels"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [isAction, setIsAction] = useState(handlePagePath());
  const handleAction = () => {
    setIsAction(!isAction);
  };
  return (
    <div
      onClick={handleAction}
      className={
        isAction
          ? " transition-all h-96  bg-[#C4E2FF] duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full p-3 text-lg"
          : " transition-all h-10 duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full py-3 text-lg"
      }
    >
      <span
        className={
          !isAction
            ? "hidden delay-200"
            : " w-[6px] h-full delay-200 bg-[#005DAD] absolute right-0 top-0 rounded-l-lg"
        }
      ></span>{" "}
      <div
        className={` h-5 flex justify-start items-center gap-2 w-[70%] ${
          isAction && "text-[#005DAD]"
        }`}
      >
        <img
          width={24}
          src={isAction ? props.icon : props.blackIcon}
          alt="icon"
        />
        {props.title}

        <IoIosArrowDown
          className={isAction ? " text-sm text-[#005DAD]" : "hidden"}
        />
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0 del"
          } ${
            pathname === "/adminPanel/reports/hozorireports" && "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/reports/hozorireports"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          گزارش نوبت های حضوری
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            pathname === "/adminPanel/reports/onlinereports" && "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/reports/onlinereports"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          گزارش نوبت های غیرحضوری
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            pathname === "/adminPanel/reports/centerstatus" && "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/reports/centerstatus"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          وضعیت مرکز
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            pathname === "/adminPanel/reports/doctorstatus" && "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/reports/doctorstatus"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          وضعیت حضور پزشک
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            pathname === "/adminPanel/reports/doctorscancels" && "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/reports/doctorscancels"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          آمار کنسلی پزشک
        </Link>
      </div>
    </div>
  );
};
export const AdminPanelsupport_action = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);
  const handlePagePath = () => {
    if (
      pathname === "/adminPanel/support/doctor" ||
      pathname === "/adminPanel/support/patient"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [isAction, setIsAction] = useState(handlePagePath());
  const handleAction = () => {
    setIsAction(!isAction);
  };
  return (
    <div
      onClick={handleAction}
      className={
        isAction
          ? " transition-all h-44  bg-[#C4E2FF] duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full p-3 text-lg"
          : " transition-all h-10 duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full py-3 text-lg"
      }
    >
      <span
        className={
          !isAction
            ? "hidden delay-200"
            : " w-[6px] h-full delay-200 bg-[#005DAD] absolute right-0 top-0 rounded-l-lg"
        }
      ></span>{" "}
      <div
        className={` h-5 flex justify-start items-center gap-2 w-[70%] ${
          isAction && "text-[#005DAD]"
        }`}
      >
        <img
          width={24}
          src={isAction ? props.icon : props.blackIcon}
          alt="icon"
        />
        {props.title}

        <IoIosArrowDown
          className={isAction ? " text-sm text-[#005DAD]" : "hidden"}
        />
      </div>
      <div className=" w-full" onClick={(e) => e.stopPropagation()}>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0 del"
          } ${pathname === "/adminPanel/support/doctor" && "bg-[#DBEDFF]"}`}
          to="/adminPanel/support/doctor"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          پزشک
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center   w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${pathname === "/adminPanel/support/patient" && "bg-[#DBEDFF]"}`}
          to="/adminPanel/support/patient"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          بیمار{" "}
        </Link>
      </div>
    </div>
  );
};
export const AdminPanelimageSetting_action = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);
  const handlePagePath = () => {
    if (
      pathname === "/adminPanel/imagesetting/doctorimage" ||
      pathname === "/adminPanel/imagesetting/banner" ||
      pathname === "/adminPanel/imagesetting/medicalcenterimage" ||
      pathname === "/adminPanel/imagesetting/magezine" ||
      pathname === "/adminPanel/imagesetting/banner/add-banner"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [isAction, setIsAction] = useState(handlePagePath());
  const handleAction = () => {
    setIsAction(!isAction);
  };
  return (
    <div
      onClick={handleAction}
      className={
        isAction
          ? " transition-all h-72  bg-[#C4E2FF] duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full p-3 text-lg"
          : " transition-all h-10 duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full py-3 text-lg"
      }
    >
      <span
        className={
          !isAction
            ? "hidden delay-200"
            : " w-[6px] h-full delay-200 bg-[#005DAD] absolute right-0 top-0 rounded-l-lg"
        }
      ></span>{" "}
      <div
        className={` h-5 flex justify-start items-center gap-2 w-[70%] ${
          isAction && "text-[#005DAD]"
        }`}
      >
        <img
          width={24}
          src={isAction ? props.icon : props.blackIcon}
          alt="icon"
        />
        {props.title}

        <IoIosArrowDown
          className={isAction ? " text-sm text-[#005DAD]" : "hidden"}
        />
      </div>
      <div className=" w-full" onClick={(e) => e.stopPropagation()}>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0 del"
          } ${
            pathname === "/adminPanel/imagesetting/doctorimage" &&
            "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/imagesetting/doctorimage"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          عکس پزشک
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center   w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            (pathname === "/adminPanel/imagesetting/banner" ||
              pathname === "/adminPanel/imagesetting/banner/add-banner") &&
            "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/imagesetting/banner"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          بنر{" "}
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center   w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            pathname === "/adminPanel/imagesetting/medicalcenterimage" &&
            "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/imagesetting/medicalcenterimage"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          عکس مرکز درمانی{" "}
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center   w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            pathname === "/adminPanel/imagesetting/magezine" && "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/imagesetting/magezine"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          مجله سلامت{" "}
        </Link>
      </div>
    </div>
  );
};
export const DoctorProfileUploadOptionButtons = ({
  blueicon,
  blackicon,
  path,
  text,
}) => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <Link
      to={path}
      className={`${
        pathName === path && "text-[#005DAD] bg-white rounded-xl shadow-md"
      }  gap-1 flex justify-center items-center p-1 px-4 `}
    >
      <img
        src={pathName === path ? blueicon : blackicon}
        alt="icon"
        width={40}
      />
      <h5 className="text-lg">{text}</h5>
    </Link>
  );
};

export const DoctorPanel_reservationManagment = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const handlePagePath = () => {
    if (
      pathname === "/doctor-panel/reservation-managment/work-calendar" ||
      pathname === "/doctor-panel/reservation-managment/cancel-reservation" ||
      pathname === "/doctor-panel/reservation-managment/delay-&-haste"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [isAction, setIsAction] = useState(handlePagePath());
  const handleAction = () => {
    setIsAction(!isAction);
  };
  return (
    <div
      onClick={handleAction}
      className={
        isAction
          ? " transition-all h-56  bg-[#C4E2FF] duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full p-3 text-lg"
          : " transition-all h-10 duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full p-3 text-lg"
      }
    >
      <span
        className={
          !isAction
            ? "hidden delay-200"
            : " w-[6px] h-full delay-200 bg-[#005DAD] absolute right-0 top-0 rounded-l-lg"
        }
      ></span>{" "}
      <div
        className={` relative h-5 flex justify-start items-center gap-2 w-[80%] ${
          isAction && "text-[#005DAD]"
        }`}
      >
        <img
          width={24}
          src={isAction ? props.icon : props.blackIcon}
          alt="icon"
        />
        {props.title}

        <IoIosArrowDown
          className={
            isAction ? " left-0 absolute text-sm text-[#005DAD]" : "hidden"
          }
        />
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0 del"
          } ${
            pathname === "/doctor-panel/reservation-managment/work-calendar" &&
            "bg-[#DBEDFF] w-40"
          }`}
          to="/doctor-panel/reservation-managment/work-calendar"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          تقویم کاری
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            pathname ===
              "/doctor-panel/reservation-managment/cancel-reservation" &&
            "bg-[#DBEDFF] w-40"
          }`}
          to="/doctor-panel/reservation-managment/cancel-reservation"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          کنسل نوبت
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            pathname === "/doctor-panel/reservation-managment/delay-&-haste" &&
            "bg-[#DBEDFF] w-48"
          }`}
          to="/doctor-panel/reservation-managment/delay-&-haste"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          تاخیر و تعجیل
        </Link>
      </div>
    </div>
  );
};
export const DoctorPanel_financialreports = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const handlePagePath = () => {
    if (
      pathname === "/doctor-panel/financial-reports/paid-list" ||
      pathname === "/doctor-panel/financial-reports/Settlement-request"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [isAction, setIsAction] = useState(handlePagePath());
  const handleAction = () => {
    setIsAction(!isAction);
  };
  return (
    <div
      onClick={handleAction}
      className={
        isAction
          ? " transition-all h-44  bg-[#C4E2FF] duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full p-3 text-lg"
          : " transition-all h-10 duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full p-3 text-lg"
      }
    >
      <span
        className={
          !isAction
            ? "hidden delay-200"
            : " w-[6px] h-full delay-200 bg-[#005DAD] absolute right-0 top-0 rounded-l-lg"
        }
      ></span>{" "}
      <div
        className={` relative h-5 flex justify-start items-center gap-2 w-[80%] ${
          isAction && "text-[#005DAD]"
        }`}
      >
        <img
          width={24}
          src={isAction ? props.icon : props.blackIcon}
          alt="icon"
        />
        {props.title}

        <IoIosArrowDown
          className={
            isAction ? " left-0 absolute text-sm text-[#005DAD]" : "hidden"
          }
        />
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0 del"
          } ${
            pathname === "/doctor-panel/financial-reports/paid-list" &&
            "bg-[#DBEDFF] w-40"
          }`}
          to="/doctor-panel/financial-reports/paid-list"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          لیست پرداخت شده ها
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            pathname === "/doctor-panel/financial-reports/Settlement-request" &&
            "bg-[#DBEDFF] w-40"
          }`}
          to="/doctor-panel/financial-reports/Settlement-request"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          درخواست تسویه
        </Link>
      </div>
    </div>
  );
};
export const AdminPanelMeeicalcenters_action = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const handlePagePath = () => {
    if (
      pathname === "/adminPanel/medicalcenters/clinics" ||
      pathname === "/adminPanel/medicalcenters/offices"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [isAction, setIsAction] = useState(handlePagePath());
  const handleAction = () => {
    setIsAction(!isAction);
  };
  return (
    <div
      onClick={handleAction}
      className={
        isAction
          ? " transition-all h-48  bg-[#C4E2FF] duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full p-3 text-lg"
          : " transition-all h-10 duration-700 cursor-pointer flex flex-col items-center relative gap-2 w-full py-3 text-lg"
      }
    >
      <span
        className={
          !isAction
            ? "hidden delay-200"
            : " w-[6px] h-full delay-200 bg-[#005DAD] absolute right-0 top-0 rounded-l-lg"
        }
      ></span>{" "}
      <div
        className={` h-5 flex justify-start items-center gap-2 w-[70%] ${
          isAction && "text-[#005DAD]"
        }`}
      >
        <img
          width={24}
          src={isAction ? props.icon : props.blackIcon}
          alt="icon"
        />
        {props.title}

        <IoIosArrowDown
          className={isAction ? " text-sm text-[#005DAD]" : "hidden"}
        />
      </div>
      <div className=" w-full" onClick={(e) => e.stopPropagation()}>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center  w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0 del"
          } ${
            pathname === "/adminPanel/medicalcenters/clinics" && "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/medicalcenters/clinics"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          درمانگاه , بیمارستان
        </Link>
        <Link
          className={` transition-opacity flex pr-2 gap-2 py-4 rounded-lg items-center   w-full text-[#005DAD] ${
            isAction ? "opacity-100 delay-500" : "opacity-0"
          } ${
            pathname === "/adminPanel/medicalcenters/offices" && "bg-[#DBEDFF]"
          }`}
          to="/adminPanel/medicalcenters/offices"
        >
          <IoIosArrowDown className=" text-xs rotate-90" />
          مطب ها
        </Link>
      </div>
    </div>
  );
};

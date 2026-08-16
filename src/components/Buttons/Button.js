import React, { useEffect, useState } from "react";
import { CiEdit, CiLogin } from "react-icons/ci";
import screenIcon from "../../assets/Pics/mirroring-screen.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { IoEyeOutline, IoLocationOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { IoPersonCircleSharp, IoMenuOutline } from "react-icons/io5";
import DoctorProfIcon from "../../assets/Pics/doctor-profile-icon.png";

import {
  fullNameStorage,
  myStore,
  nationalCodeStorage,
  smeIdStorage,
  userProfileStore,
  userDoctorStorage,
} from "../../store/Store";

import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import Cookies from "js-cookie";
import BurgerMenu from "../BurgerMenu";
import { GoPlus } from "react-icons/go";

import OpinionModal from "../modals/OpinionModal";
import SuccessModal from "../modals/SuccessModal";
import LoginModal from "../modals/LoginModal";
import SpecialtiesListModal from "../modals/SpecialtiesListModal";
import SeeNazarModal from "../modals/SeeNazarModal";
import EmptyReservModal from "../modals/EmptyReservModal";
import SubmitSpecialtiesModal from "../modals/SubmitSpecialtiesModal";
import AddNewDoctorModal from "../modals/AddNewDoctorModal";
import VisitTypeSelectionModal from "../modals/VisitTypeSelectionModal";
import MedicalFormModal from "../modals/MedicalFormModal";
import TreatmentCenterModal from "../modals/TreatmentCenterModal";
import AddTreatmentModal from "../modals/AddTreatmentModal";
import CitySelectModal from "../modals/CitySelectModal";
import DoctorFormModal from "../modals/DoctorFormModal";
import AddPatinetModal from "../modals/AddPatinetModal";
import VisitSelectionModal_medical from "../modals/VisitSelectionModal_medical";

// ایمپورت تابع API برای چک کردن نقش
import {
  get_user_role_by_username,
  read_office_type,
} from "../../api/ApiCalling";
import { Eror, success } from "../ToastAlerts";

import { Link, useNavigate } from "react-router-dom";

export const LoginButton = () => {
  const { fullName, setFullName } = fullNameStorage();
  const { phoneNum, setPhoneNum } = userProfileStore();
  const { removeSmeId } = smeIdStorage();
  const { setDoctors, setDoctorId } = userDoctorStorage();

  const [isHover, setIsHover] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const navigate = useNavigate();

  const openModal = () => setIsModal(true);

  const handleDashboardNavigation = async () => {
    try {
      // این API باید شماره موبایل بگیرد
      const usernameForRole = (phoneNum || "").trim();

      // اگر موبایل در استور خالیه، حداقل کاربر رو بفرست پنل کاربری

      const roles = await get_user_role_by_username(usernameForRole);

      const roleNameRaw = roles?.[0]?.roleName || "";
      const roleName = roleNameRaw.trim().toLowerCase();
      console.log(roleName);
      if (roleName === "superadmin") {
        navigate("/adminpanel/dashboard");
      } else if (roleName === "doctor") {
        navigate("/doctor-panel/dashboard");
      } else if (!usernameForRole) {
        navigate("/userPanel/dashboard");
        return;
      } else {
        navigate("/userPanel/dashboard");
      }
    } catch (e) {
      console.error("dashboard navigation error:", e);
      navigate("/userPanel/dashboard");
    } finally {
      setIsHover(false);
    }
  };

  return (
    <div className="flex justify-center items-center gap-3">
      {isModal && <LoginModal setIsModal={setIsModal} />}

      {/* دکمه ورود مرکز درمانی */}
      {!fullName && (
        <button
          onClick={() => navigate("/medicalCentersLogin")}
          className="lg:flex hidden shadow-xl whitespace-nowrap text-[12px] lg:text-[14px] lg:p-2 p-1 px-2 lg:px-2 justify-center items-center gap-1 text-[#004D8F] rounded-lg border border-[#004D8F]"
        >
          ثبت نام | ورود مرکز درمانی
        </button>
      )}

      {/* دکمه ورود پزشکان */}
      {!fullName && (
        <button
          onClick={() => navigate("/doctor-login")}
          className="lg:flex hidden shadow-xl whitespace-nowrap text-[12px] lg:text-[14px] lg:p-2 p-1 px-2 lg:px-2 justify-center items-center gap-1 text-[#004D8F] rounded-lg border border-[#004D8F]"
        >
          ثبت نام | ورود پزشکان
        </button>
      )}

      {/* باکس پروفایل یا ورود */}
      <div
        onClick={fullName ? () => {} : openModal}
        className="relative cursor-pointer whitespace-nowrap bg-white shadow-xl px-2 text-[12px] lg:text-[14px] lg:p-2 p-1 lg:px-2 flex justify-center items-center gap-1 text-[#004D8F] rounded-lg border border-[#004D8F]"
      >
        {fullName ? (
          <h5
            onMouseEnter={() => setIsHover(true)}
            onClick={() => setIsHover((prev) => !prev)}
            className="w-full justify-center items-center gap-2 flex"
          >
            <IoPersonCircleSharp className="text-xl" />
            {fullName !== "string" ? fullName : "کاربر مهمان"}
          </h5>
        ) : (
          <h5 className="w-full flex justify-center gap-1">
            <CiLogin className="hidden lg:flex text-xl" />
            ثبت نام | ورود
          </h5>
        )}

        {/* منوی هوور پروفایل */}
        {isHover && (
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="top-8 p-3 bg-white z-50 rounded-lg flex flex-col gap-3 shadow-xl border absolute"
          >
            <div
              onClick={handleDashboardNavigation}
              className="flex justify-center cursor-pointer gap-10 items-center text-[#004D8F]"
            >
              داشبورد
              <LuLayoutDashboard />
            </div>

            <div
              onClick={() => {
                setDoctors([]);
                setDoctorId("");
                setPhoneNum("");
                removeSmeId();
                Cookies.remove("token");
                setFullName(null);
                navigate("/");
                setIsHover(false);
              }}
              className="text-red-600 cursor-pointer flex justify-between gap-10 items-center"
            >
              <h5>خروج</h5>
              <CiLogout />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const NobatButton = (props) => {
  const [isVisitSelectModal, setIsVisitSelectModal] = useState("");

  const handleOpenModal = (type) => {
    setIsVisitSelectModal(type);
  };
  return (
    <div className=" flex justify-between px-2 xl:w-[171px] h-[54px] border shadow-[0_1px_15px_-5px_rgba(0,0,0,0.3)] rounded-xl">
      {isVisitSelectModal && (
        <VisitTypeSelectionModal
          isVisitSelectModal={isVisitSelectModal}
          setIsVisitSelectModal={setIsVisitSelectModal}
        />
      )}

      <button className=" text-base xl:font-semibold gap-1 flex justify-center items-center">
        <img src={screenIcon} width={24} alt="" />
        {props.type}
      </button>
      <button
        onClick={() => handleOpenModal(props.type)}
        className=" text-xs xl:text-sm text-[#005DAD]"
      >
        بیشتر...
      </button>
    </div>
  );
};
export const SabteNazarButton = ({ doctorDetails }) => {
  const [isNazarModal, setIsNazarModal] = useState(false);
  const [IsSuccessModal, setIsSuccessModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const token = Cookies.get("token");

  return (
    <div>
      {isLoginModal && <LoginModal setIsModal={setIsLoginModal} />}

      {isNazarModal && (
        <OpinionModal
          doctorDetails={doctorDetails}
          setIsNazarModal={setIsNazarModal}
          setIsSuccessModal={setIsSuccessModal}
        />
      )}
      {IsSuccessModal && <SuccessModal setIsSuccessModal={setIsSuccessModal} />}

      <button
        onClick={() => {
          if (!token) {
            setIsLoginModal(true);
            Eror("ابتدا لاگین کنید");
          } else {
            setIsNazarModal(true);
          }
        }}
        className=" flex items-center bg-[#005DAD] text-white lg:p-3 p-1 rounded-lg px-3 lg:rounded-xl lg:px-5 lg:text-lg"
      >
        ثبت نظر
        <IoIosArrowRoundBack className=" text-2xl" />
      </button>
    </div>
  );
};
export const DoctorLoginButt = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div>
      {isModal && <LoginModal setIsModal={setIsModal} />}

      <button
        onClick={() => setIsModal(true)}
        className=" lg:text-lg flex justify-center text-xs p-1 px-2 whitespace-nowrap items-center lg:gap-3 lg:px-16 lg:p-2 lg:border-2 border-[#005DAD] text-[#005DAD] rounded-lg"
      >
        ورود پزشک
        <IoIosArrowBack />
      </button>
    </div>
  );
};
export const SpecialtiesSectionButton = () => {
  const [isSpecialtiesModal, setIsSpecialtiesModal] = useState(false);
  const handleOpenModal = () => {
    setIsSpecialtiesModal(true);
  };

  return (
    <div>
      {isSpecialtiesModal && (
        <SpecialtiesListModal setIsSpecialtiesModal={setIsSpecialtiesModal} />
      )}
      <div
        onClick={handleOpenModal}
        className=" w-[95px] h-[120px] md:w-[100px] md:h-[130px] group lg:-mr-20  bg-[#eaeaea] lg:hover:bg-[#63a2da] lg:hover:shadow-lg hover:border-none lg:hover:-mt-2 transition-all lg:hover:shadow-[#c2eeff] min-w-[104px] lg:w-[131px] lg:h-[170px] flex flex-col justify-evenly items-center rounded-xl border border-[#DBD7D7]"
      >
        <div className=" bg-white rounded-full w-[77px] h-[77px] flex justify-center items-center ">
          <IoIosMore className=" group-hover:text-[#336692] text-3xl" />
        </div>

        <h2 className=" group-hover:text-white transition-all text-[12px]">
          مشاهده بیشتر
        </h2>
      </div>
    </div>
  );
};
export const SeeDoctorNazaratButt = () => {
  const [isNazarModal, setIsNazarModal] = useState(false);
  const handleOpenModal = () => {
    setIsNazarModal(true);
  };
  return (
    <div>
      {isNazarModal && <SeeNazarModal setIsNazarModal={setIsNazarModal} />}
      <button
        onClick={handleOpenModal}
        className=" text-[#005DAD] flex justify-center items-center lg:gap-1 whitespace-nowrap text-[12px] lg:text-sm"
      >
        <IoEyeOutline />
        مشاهده نظرات پزشک
      </button>
    </div>
  );
};
export const EmtyReservButt = ({ docDetail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();

  const handleOpenModal = () => {
    setSelectedDoctor(docDetail);
    setIsModalOpen(true);
  };
  return (
    <div>
      {isModalOpen && (
        <EmptyReservModal
          setIsModalOpen={setIsModalOpen}
          selectedDoctor={selectedDoctor}
        />
      )}
      <button
        onClick={handleOpenModal}
        className=" rounded-md p-2 px-4 border text-[#005DAD] border-[#005DAD] "
      >
        اولین نوبت آزاد
      </button>
    </div>
  );
};

export const MatabShowButt = ({ items, setPosition }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [address, setAddress] = useState("");

  const getAddress = (item) => {
    return item.clinic?.address || item.office?.address || "";
  };

  const handleSeeMatab = (item) => {
    // اگر کاربر روی همان دکمه‌ای که باز است کلیک کرد، آن را ببند
    if (selectedId === item.id) {
      setSelectedId(null);
      setAddress("");
      // در صورت نیاز می‌توانید مختصات را هم ریست کنید
      // setPosition && setPosition([null, null]);
      return;
    }

    // تنظیم مختصات (با چک کردن وجود آبجکت‌ها)
    if (setPosition) {
      const lon = item.clinic?.geolon || item.office?.geolon;
      const lat = item.clinic?.geolat || item.office?.geolat;
      if (lon && lat) {
        setPosition([lon, lat]);
      }
    }

    // باز کردن و نمایش آدرس جدید
    setSelectedId(item.id);
    setAddress(getAddress(item));
  };

  return (
    <div className="flex max-w-full flex-col">
      <div className="flex items-center gap-2 lg:gap-4 max-w-full overflow-auto xl:flex-nowrap flex-wrap">
        <h2 className="text-[18px] flex whitespace-nowrap items-center">
          <IoLocationOutline className="text-xl text-[#005DAD]" />
          نشانی:
        </h2>

        {items &&
          items.map((item) => {
            const isActive = selectedId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSeeMatab(item)}
                className={`gap-1 lg:p-2 p-1 text-xs lg:text-base flex items-center border transition-colors rounded-xl ${
                  isActive
                    ? "text-[#005dad] bg-[rgba(176,218,255,0.2)] border-[#005dad]"
                    : "text-gray-700 hover:bg-gray-50 border-gray-200"
                }`}
              >
                {item.office?.name || item.clinic?.name}

                <IoIosArrowDown
                  className={`transition-all duration-300 text-xl ${
                    isActive ? "rotate-180 text-[#005dad]" : "text-[#757575]"
                  }`}
                />
              </button>
            );
          })}
      </div>

      {/* نمایش بخش آدرس با انیمیشن نرم‌تر */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          selectedId ? "max-h-20 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <h2 className="text-[#005DAD] font-medium">
          نشانی دقیق: <span className="text-gray-800">{address}</span>
        </h2>
      </div>
    </div>
  );
};

export const EditUserInfoButt = () => {
  const { setIsEdit, isEdit } = myStore();

  return (
    <button
      onClick={setIsEdit}
      className=" flex justify-center items-center p-3 font-semibold rounded-lg bg-[#DBEDFD]"
    >
      <FiEdit3 className=" text-xl" />
      <h5>{isEdit ? " لغو ویرایش " : " ویرایش"}</h5>
    </button>
  );
};
export const ManOrWomanButt = ({ gender }) => {
  const { isEdit } = myStore();
  return (
    <button
      disabled={!isEdit}
      className=" w-[48%] h-10 rounded-lg border disabled:bg-[rgba(219,215,215,0.44)]"
    >
      {gender}
    </button>
  );
};
export const ApllyEditButt = () => {
  const { isEdit, setIsEdit } = myStore();

  return (
    <button
      onClick={setIsEdit}
      hidden={!isEdit}
      className=" text-white px-32 bg-[#005DAD] rounded-lg p-2"
    >
      ذخیره تغییرات
    </button>
  );
};
export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));
export const SignUpButton = () => {
  const [isModal, setIsModal] = useState(false);

  const handleOpenModal = () => {
    setIsModal(true);
  };
  return (
    <div>
      {isModal && <LoginModal type="signup" />}
      <button onClick={handleOpenModal} className="text-[#005DAD]">
        ثبت نام کنید
      </button>
    </div>
  );
};
export const BurgerMenuButt = () => {
  const [burgerMenu, setBurgerMenu] = useState(false);
  const openburgermenu = () => {
    setBurgerMenu(true);
  };
  return (
    <div>
      {burgerMenu ? (
        <div
          onClick={() => setBurgerMenu(false)}
          className=" w-full fixed transition-opacity duration-500 z-[60] top-0 right-0 bg-[rgba(0,0,0,0.6)] h-screen"
        >
          <BurgerMenu />
        </div>
      ) : (
        <div
          onClick={() => setBurgerMenu(false)}
          className=" w-full fixed opacity-0  -z-10 top-0 right-0 bg-[rgba(0,0,0,0.6)] h-screen"
        >
          <BurgerMenu />
        </div>
      )}
      <IoMenuOutline
        onClick={openburgermenu}
        className=" text-[#005DAD] text-2xl"
      />
    </div>
  );
};

export const AddDoctorButt = ({ setDoctorItems, setIsAddDoctorModal }) => {
  return (
    <button
      onClick={() => {
        setDoctorItems({});
        setIsAddDoctorModal(true);
      }}
      className="flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
    >
      <GoPlus className="text-2xl" />
      افزودن دکتر
    </button>
  );
};

export const EditSpecialistButt = ({
  isEditSpecialModal,
  setIsEditSpecialModal,
  item,
}) => {
  return (
    <div>
      {isEditSpecialModal && (
        <SubmitSpecialtiesModal
          item={item}
          setIsAddSpecialModal={setIsEditSpecialModal}
        />
      )}
      <button
        onClick={() => setIsEditSpecialModal(true)}
        className=" gap-2 border rounded-lg px-5 p-1 flex justify-center items-center bg-[#F2FEF8] border-[#1F7168] text-[#1F7168]"
      >
        <CiEdit className=" font-bold text-2xl" />
        ویرایش
      </button>
    </div>
  );
};
// export const AddTurnButt = ({ isAddTurn, setIsAddTurn }) => {
//   return (
//     <div>
//       {isAddTurn && <AddTurnModal setIsAddTurn={setIsAddTurn} />}
//       <button
//         onClick={() => setIsAddTurn(true)}
//         className=" flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
//       >
//         <GoPlus className=" text-2xl" />
//         ثبت نوبت
//       </button>
//     </div>
//   );
// };
export const MedicalCenterSignUpButt = () => {
  const token = Cookies.get("token");

  // const [isModal, setIsModal] = useState(false);
  // return (
  //   <div>
  //     {isModal && <DoctorFormModal setIsAddDoctorModal={setIsModal} />}
  //     <button
  //       onClick={() => {

  const [isMedicalCenterForm, setIsMedicalCenterForm] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);

  return (
    <div>
      {isMedicalCenterForm && (
        <MedicalFormModal setIsMedicalCenterForm={setIsMedicalCenterForm} />
      )}
      {isLoginModal && <LoginModal setIsModal={setIsLoginModal} />}

      <button
        onClick={() => {
          if (token) {
            setIsMedicalCenterForm(true);
          } else {
            setIsLoginModal(true);
            success(" لطفا در ابتدا لاگین کنید");
          }
        }}
        href="medicalCentersLogin/loginForm"
        className=" lg:text-lg flex justify-center xs:text-xs text-[10px]  p-1 px-2 whitespace-nowrap items-center lg:gap-3 lg:px-16 lg:p-2 text-white bg-[#005DAD] rounded-lg"
      >
        عضویت مراکز درمانی
        <IoIosArrowBack />
      </button>
    </div>
  );
};
export const AddMedicalCenterButt = ({
  selectedMedical,
  isOffice,
  isMedicalCenterForm,
  setIsMedicalCenterForm,
}) => {
  return (
    <div>
      {isMedicalCenterForm && (
        <MedicalFormModal closeModal={() => setIsMedicalCenterForm(false)} />
      )}
      <button
        onClick={() => setIsMedicalCenterForm(true)}
        className=" flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
      >
        <GoPlus className=" text-2xl" />

        {isOffice ? "افزودن مطب" : "افزودن مرکز درمانی"}
      </button>
    </div>
  );
};
export const TreatMentCenterButt = ({ id, name }) => {
  const [isTreatmentCenter, setIsTreatmentCenter] = useState(false);

  return (
    <div>
      {isTreatmentCenter && (
        <TreatmentCenterModal
          name={name}
          id={id}
          setIsTreatmentCenter={setIsTreatmentCenter}
        />
      )}
      <button
        onClick={() => setIsTreatmentCenter(true)}
        className=" p-1 bg-[rgba(83,102,248,0.12)] border border-[#5366F8] text-[#5366F8] rounded-lg text-sm"
      >
        {/* مشاهده وضعیت اکانت */}
        تخصیص مرکز درمانی
      </button>
    </div>
  );
};
export const AddTreatmentButt = ({
  id,
  isAddTreatmentModal,
  setIsAddTreatmentModal,
}) => {
  return (
    <div>
      {isAddTreatmentModal && (
        <AddTreatmentModal
          id={id}
          closeModal={() => setIsAddTreatmentModal(false)}
        />
      )}
      <button
        onClick={() => {
          setIsAddTreatmentModal(true);
        }}
        className=" flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
      >
        افزودن بیشتر
        <GoPlus className=" text-2xl" />
      </button>
    </div>
  );
};
export const CitySelectButtSearchingDoctors = () => {
  const [isCitySelectModal, setIsCitySelectModal] = useState(false);
  return (
    <div className=" flex justify-center items-center gap-1">
      {isCitySelectModal && (
        <CitySelectModal closeModal={() => setIsCitySelectModal(false)} />
      )}
      <button
        className=" flex justify-center items-center"
        onClick={() => setIsCitySelectModal(true)}
      >
        <IoLocationOutline className="  text-lg text-[#005DAD]" />
        <p className=" hidden lg:flex text-[12px] text-[#005DAD] font-medium">
          انتخاب شهر
        </p>
      </button>
    </div>
  );
};
export const MedicalCenterLoginButt = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div>
      {isModal && <LoginModal setIsModal={setIsModal} />}

      <button
        onClick={() => setIsModal(true)}
        className=" text-xs xs:text-sm lg:text-lg flex justify-center items-center lg:gap-3 lg:px-16 p-[1px] xs:p-[2px] lg:p-2 px-2 border whitespace-nowrap lg:border-2 border-[#005DAD] text-[#005DAD] rounded-lg"
      >
        ورود مرکز درمانی
        <IoIosArrowBack />
      </button>
    </div>
  );
};
export const DoctorsSignUpButt = () => {
  const token = Cookies.get("token");

  const [isModal, setIsModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  return (
    <div>
      {isLoginModal && <LoginModal setIsModal={setIsLoginModal} />}
      {isModal && (
        <DoctorFormModal setIsAddDoctorModal={setIsModal} fromSignup />
      )}
      <button
        onClick={() => {
          console.log(token);
          if (token) {
            setIsModal(true);
          } else {
            setIsLoginModal(true);
            success("پزشک گرامی لطفا در ابتدا لاگین کنید");
          }
        }}
        href="medicalCentersLogin/loginForm"
        className=" lg:text-lg flex justify-center text-xs p-1 px-2 whitespace-nowrap items-center lg:gap-3 lg:px-16 lg:p-2 text-white bg-[#005DAD] rounded-lg"
      >
        عضویت پزشک
        <IoIosArrowBack />
      </button>
    </div>
  );
};
export const AddPatinetButt = ({ isAddPatient, setIsAddPatient }) => {
  return (
    <div>
      {isAddPatient && <AddPatinetModal setIsAddPatient={setIsAddPatient} />}
      <button
        onClick={() => setIsAddPatient(true)}
        className=" flex justify-center items-center gap-2 rounded-lg p-2 bg-[#005DAD] text-white"
      >
        <GoPlus className=" text-2xl" />
        ثبت بیمار
      </button>
    </div>
  );
};
export const NobatButton_medicalCenters = (props) => {
  const [isVisitSelectModal, setIsVisitSelectModal] = useState("");

  const handleOpenModal = (type) => {
    setIsVisitSelectModal(type);
  };
  return (
    <div className=" flex justify-between px-2 xl:w-[171px] h-[54px] border shadow-[0_1px_15px_-5px_rgba(0,0,0,0.3)] rounded-xl">
      {isVisitSelectModal && (
        <VisitSelectionModal_medical
          isVisitSelectModal={isVisitSelectModal}
          setIsVisitSelectModal={setIsVisitSelectModal}
        />
      )}

      <button className=" text-base xl:font-semibold gap-1 flex justify-center items-center">
        <img src={screenIcon} width={24} alt="" />
        {props.type}
      </button>
      <button
        onClick={() => handleOpenModal(props.type)}
        className=" text-xs xl:text-sm text-[#005DAD]"
      >
        بیشتر...
      </button>
    </div>
  );
};

export const DoctorPanelProfileButton = () => {
  const router = useNavigate();
  const { setDoctors, setDoctorId } = userDoctorStorage();

  const { fullName, setFullName } = fullNameStorage();
  const { phoneNum, setPhoneNum } = userProfileStore();
  const { removeSmeId } = smeIdStorage();

  const [isOpen, setIsOpen] = useState(false);

  const handleDashboardNavigation = async () => {
    try {
      const usernameForRole = (phoneNum || "").trim();

      if (!usernameForRole) {
        router("/userPanel/dashboard");
        return;
      }

      const roles = await get_user_role_by_username(usernameForRole);

      const roleNameRaw = roles?.[0]?.roleName || "";
      const roleName = roleNameRaw.trim().toLowerCase();

      if (roleName === "superadmin") {
        router("/adminpanel/dashboard");
      } else if (roleName === "doctor") {
        router("/doctor-panel/dashboard");
      } else {
        router("/userPanel/dashboard");
      }
    } catch (error) {
      console.error("dashboard navigation error:", error);
      router("/userPanel/dashboard");
    } finally {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    setDoctors([]);
    setDoctorId("");
    setPhoneNum("");
    removeSmeId();
    Cookies.remove("token");
    setFullName(null);
    router("/");
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-center items-center p-2 border text-[#005DAD] gap-2 border-[#005DAD] rounded-xl bg-white"
      >
        <img src={DoctorProfIcon.src || DoctorProfIcon} width={24} alt="icon" />
        دکتر {fullName || "کاربر"}
        <IoIosArrowDown className="text-xl" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[110%] min-w-[170px] p-3 bg-white z-50 rounded-xl flex flex-col gap-3 shadow-xl border">
          <div
            onClick={handleDashboardNavigation}
            className="flex justify-between cursor-pointer gap-8 items-center text-[#004D8F] hover:bg-[#F6FBFF] rounded-lg px-2 py-2 transition"
          >
            <span>داشبورد</span>
            <LuLayoutDashboard />
          </div>

          <div
            onClick={handleLogout}
            className="text-red-600 cursor-pointer flex justify-between gap-8 items-center hover:bg-red-50 rounded-lg px-2 py-2 transition"
          >
            <h5>خروج</h5>
            <CiLogout />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPanelProfileButton;

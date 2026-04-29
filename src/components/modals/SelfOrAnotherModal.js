import React, { useEffect, useState } from "react";
import ModalLogo from "../../assets/Pics/ModalLogo.png";

import { RxCross2 } from "react-icons/rx";
import {
  myStore,
  reservationStore,
  reservationTypeStore,
  userSubmitedArrStore,
} from "../../store/Store";
import Cookies from "js-cookie";
import LoginModal from "./LoginModal";
import { Eror } from "../ToastAlerts";
import ReserveStepsModal from "./ReserveStepsModal";
import { FaPlus } from "react-icons/fa";

import { useNavigate } from "react-router-dom";  // ⬅️ جایگزین 

function SelfOrAnotherModal({ setModal }) {
  const navigate = useNavigate(); // ⬅️ جایگزین useRouter()

  const { setReservationType } = reservationTypeStore();
  const [isReserveModal, setIsReserveModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const { patients } = userSubmitedArrStore();
  const { setSelectedPtientName } = reservationStore();

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      setIsLoginModal(true);
      Eror("ابتدا لاگین کنید");
    }
  }, [token]);

  const handleReservationType = (type) => {
    if (token) {
      setReservationType(type);
      setIsReserveModal(true);

      // اگر قرار باشد بعداً روتینگ انجام شود:
      // navigate("/reservStepsToPay");
    } else {
      setIsLoginModal(true);
      Eror("ابتدا لاگین کنید");
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="z-20 w-screen h-screen top-0 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className="relative py-2 w-full h-full justify-center lg:w-[450px] lg:h-auto lg:min-h-[224px] rounded-xl bg-white flex flex-col gap-3">
        {isLoginModal && <LoginModal setIsModal={setIsLoginModal} />}
        {isReserveModal && (
          <ReserveStepsModal closeModal={() => setIsReserveModal(false)} />
        )}

        <RxCross2
          onClick={closeModal}
          className="absolute left-2 top-2 text-[#717171] z-30 cursor-pointer text-2xl"
        />

        <div className="w-full flex justify-center items-center -mt-8 lg:mt-0">
          <img src={ModalLogo} alt="Logo" width={67} />
        </div>

        <h2 className="flex justify-center items-center w-full">
          لطفا انتخاب کنید
        </h2>

        <p className="w-full flex justify-center items-center text-[14px] text-[#717171]">
          می‌خواهید برای چه کسی نوبت رزرو کنید؟
        </p>

        {patients.length === 0 ? (
          <div className="flex w-full justify-center gap-5 items-center">
            <button
              onClick={() => handleReservationType("reservForMe")}
              className="text-[#005DAD] border-[#005DAD] border text-lg p-2 rounded-lg"
            >
              نوبت برای خودم
            </button>

            <button
              onClick={() => handleReservationType("reservForAnother")}
              className="text-[#005DAD] border-[#005DAD] border text-lg p-2 rounded-lg"
            >
              نوبت برای دیگری
            </button>
          </div>
        ) : (
          <div className="border-[#005DAD] max-h-80 lg:max-h-40 overflow-auto rounded-lg border mx-auto flex w-[90%] flex-col items-center">
            {patients.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedPtientName(
                    item.patientName + " " + item.patientFamily
                  );
                  handleReservationType("reservForMe");
                }}
                className="flex items-center w-full justify-between px-5 border-b text-lg p-2"
              >
                <h5 className="text-[#005DAD]">
                  {item.patientName + " " + item.patientFamily}
                </h5>
                <h5 className="text-slate-500">{item.nationalId}</h5>
              </button>
            ))}
          </div>
        )}

        {patients.length !== 0 && (
          <button
            onClick={() => handleReservationType("reservForAnother")}
            className="flex justify-center items-center gap-2 text-white w-[90%] mx-auto bg-[#005DAD] text-lg p-2 rounded-lg"
          >
            افزودن
            <FaPlus />
          </button>
        )}
      </div>
    </div>
  );
}

export default SelfOrAnotherModal;

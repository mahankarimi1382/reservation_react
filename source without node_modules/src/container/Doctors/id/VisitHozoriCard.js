import React, { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import ReservDateAndTimeModal from "../../../components/modals/ReservDateAndTimeModal";
import EmptyReservDoctorModal from "../../../components/modals/EmptyReservModal";

import { reservationStore } from "../../../store/Store";

// توجه: در CRA باید تصاویر public را با src="/Pics/..." استفاده کنید
// نه import از public
// در صورت نیاز، فایل‌ها را به src/assets منتقل کنید

function VisitHozoriCard({ item, topic }) {
  const [isEmtyModal, setIsEmptyModal] = useState(false);
  const [isReservModal, setIsReservModal] = useState(false);
  const [IscardAnimate, setIscardAnimate] = useState(false);
  const [treatmentId, setTreatmentId] = useState("");

  const { setAdress } = reservationStore();
  const navigate = useNavigate();

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // فعال کردن انیمیشن بعد از رندر
  useEffect(() => {
    const timer = setTimeout(() => setIscardAnimate(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenModal = () => {
    setAdress(
      item.clinic?.address ||
        item.office?.address
    );
    setTreatmentId(item.clinicId || item.officeId);
    setIsReservModal(true);
  };

  return (
    <div
      className={`w-[90%] ${
        IscardAnimate ? "opacity-100" : "opacity-0"
      } duration-1000 transition-opacity px-2 lg:px-5 gap-2 p-2 lg:p-5 flex flex-col shadow-[0px_3px_6px_2px_rgba(0,_0,_0,_0.1)] rounded-xl`}
    >
      {isEmtyModal && (
        <EmptyReservDoctorModal setIsEmptyModal={setIsEmptyModal} />
      )}

      {isReservModal && (
        <ReservDateAndTimeModal
          treatmentId={treatmentId}
          name={item.clinicName}
          setIsReservModal={setIsReservModal}
        />
      )}

      <div className="w-full flex justify-between">
        {item.clinicName ? (
          <h2 className="lg:text-xl font-semibold">
            بیمارستان {item.clinicName}
          </h2>
        ) : (
          <h2 className="lg:text-xl font-semibold">
            {topic === "ویزیت حضوری"
              ? `مطب ${item.officeName}`
              : item.officeName}
          </h2>
        )}

        <h5 className="lg:text-base text-sm text-[#005DAD]">
          {formatNumber(Number(item.price))} تومان
        </h5>
      </div>

      <h2 className="flex text-sm lg:text-[16px] items-center gap-1 lg:gap-2 text-[#757575]">
        <img width={24} src="/Pics/calendar.png" alt="calendar" />
        اولین نوبت خالی: {item.nearestDate}
      </h2>

      {topic === "ویزیت حضوری" && (
        <>
          <h2 className="flex text-sm lg:text-[16px] items-center gap-1 lg:gap-2 text-[#757575]">
            <IoLocationOutline className="text-2xl" />
            {item.office ? item.office.address : item.clinic.address}
          </h2>

          <h2 className="flex text-sm lg:text-[16px] items-center gap-1 lg:gap-2 text-[#757575]">
            <FiPhone className="text-2xl" />
            {item.clinic ? item.clinic.phone : item.office.phone}
          </h2>
        </>
      )}

      <hr className="border-[#757575]" />

      <div className="w-full flex justify-end">
        <button
          onClick={handleOpenModal}
          className="bg-[#005DAD] p-1 px-4 text-sm lg:text-base rounded-sm text-white"
        >
          نوبت بگیرید
        </button>
      </div>
    </div>
  );
}

export default VisitHozoriCard;

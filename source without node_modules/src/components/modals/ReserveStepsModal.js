import React, { useState } from "react";
import {
  myStore,
  reservationTypeStore,
  smeIdStorage,
  userSubmitedArrStore,
} from "../../store/Store";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Eror } from "../../components/ToastAlerts";

import ReservForMe from "../../container/reservStepsToPay/ReservForMe";
import Pay from "../../container/reservStepsToPay/pay";
import ReservForAnother from "../../container/reservStepsToPay/ReservForAnother";
import Receipt from "../../container/reservStepsToPay/Receipt";

function ReserveStepsModal({ closeModal }) {
  const navigate = useNavigate(); //  ⬅️ جایگزین useRouter

  const { patients } = userSubmitedArrStore();
  const { reservationType } = reservationTypeStore();

  const token = Cookies.get("token");

  const [steps, setSteps] = useState(1);

  const stepper = () => {
    if (!token) {
      navigate("/"); // ⬅️ جایگزین router.push("/")
      Eror("لطفا ابتدا لاگین کنید");
      return null;
    }

    if (
      steps === 1 &&
      reservationType === "reservForMe" &&
      patients.length !== 0
    ) {
      return <ReservForMe closeModal={closeModal} setSteps={setSteps} />;
    }

    if (
      steps === 1 &&
      reservationType === "reservForMe" &&
      patients.length === 0
    ) {
      return (
        <ReservForAnother closeModal={closeModal} forme setSteps={setSteps} />
      );
    }

    if (steps === 1 && reservationType === "reservForAnother") {
      return <ReservForAnother closeModal={closeModal} setSteps={setSteps} />;
    }

    if (steps === 2) {
      return <Pay closeModal={closeModal} setSteps={setSteps} />;
    }

    if (steps === 3) {
      return <Receipt />;
    }
  };

  return (
    <div
      className="flex-col gap-10 py-10 z-50 w-screen h-screen top-0 justify-center items-center flex right-0 fixed"
      dir="rtl"
    >
      {stepper()}
    </div>
  );
}

export default ReserveStepsModal;

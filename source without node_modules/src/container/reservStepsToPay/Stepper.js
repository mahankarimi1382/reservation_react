import React, { useState, useEffect } from "react";
import ReservForMe from "./ReservForMe";
import Pay from "./pay";
import { reservationTypeStore, userSubmitedArrStore } from "../../store/Store";
import ReservForAnother from "./ReservForAnother";
import Receipt from "./Receipt";
import Cookies from "js-cookie";
import { Eror } from "../../components/ToastAlerts";
import { useNavigate } from "react-router-dom";

function Stepper() {
  const navigate = useNavigate();

  const { patients } = userSubmitedArrStore();
  const { reservationType } = reservationTypeStore();

  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [steps, setSteps] = useState(1);

  useEffect(() => {
    const t = Cookies.get("token");
    setToken(t);
    setIsLoading(false);

    if (!t) {
      Eror("لطفا ابتدا لاگین کنید");
      navigate("/");
    }
  }, [navigate]);

  if (isLoading) {
    return <div className="w-full">در حال بارگذاری...</div>;
  }

  if (!token) {
    return null;
  }

  const renderStep = () => {
    if (steps === 1) {
      if (reservationType === "reservForMe") {
        if (patients.length !== 0) {
          return <ReservForMe setSteps={setSteps} />;
        }
        return <ReservForAnother forme setSteps={setSteps} />;
      }

      if (reservationType === "reservForAnother") {
        return <ReservForAnother setSteps={setSteps} />;
      }
    }

    if (steps === 2) {
      return <Pay setSteps={setSteps} />;
    }

    if (steps === 3) {
      return <Receipt />;
    }

    return null;
  };

  return <div className="w-full">{renderStep()}</div>;
}

export default Stepper;

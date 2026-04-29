"use client";
import React, { useEffect, useState } from "react";
import hospitalIcon from "../../../assets/Pics/hospital.png";
import monitorIcon from "../../../assets/Pics/monitor-mobbile.png";
import VisitSectionBoxes from "./VisitSectionBoxes";
import { get_doctor_treatmentCenter_hozoori, get_doctor_treatmentCenter_online } from "../../../api/ApiCalling";
function VisitSection({ id }) {
  const [hozooriList, setHozooriList] = useState([]);
  const [onlineList, setOnlineList] = useState([]);
console.log(onlineList)
  const getTreatment = async () => {
    const hozoori = await get_doctor_treatmentCenter_hozoori(id);
    if (hozoori) {
      console.log(hozoori);
      setHozooriList(hozoori);
    }
    const online = await get_doctor_treatmentCenter_online(id);
    if (online) {
      console.log(online);
      setOnlineList(online);
    }
  };

  useEffect(() => {
    {
      id && getTreatment();
    }
  }, [id]);
  return (
    <div className=" w-full lg:min-h-[505px] lg:py-5 flex-col gap-5 bg-white rounded-xl flex justify-center items-center">
      <VisitSectionBoxes
        list={hozooriList}
        topic="ویزیت حضوری"
        icon={hospitalIcon}
      />
      <VisitSectionBoxes
        list={onlineList}
        topic="ویزیت آنلاین"
        icon={monitorIcon}
      />
    </div>
  );
}

export default VisitSection;

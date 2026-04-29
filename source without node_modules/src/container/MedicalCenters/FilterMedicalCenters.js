"use client";
import React, { useEffect } from "react";
import filterIcon from "../../assets/Pics/filter.png";
import { RxCross2 } from "react-icons/rx";
import {
  Search_City_MedicalCenters,
  Search_Provience_MedicalCenters,
  Search_Special_MedicalCenters,
  Search_TreatmentCenterType_MedicalCenters,
  SerchDropDowns,
} from "../../components/Inputs/Input";
import { Filtering_MedicalCenters_Store } from "../../store/Store";
import Switch from "@mui/material/Switch";
import SearchBimehSection from "../Doctors/SearchBimehSection";
import { NobatButton_medicalCenters } from "../../components/Buttons/Button";
import { FormControlLabel, FormGroup } from "@mui/material";
import DatePicker from "../Doctors/DatePicker";
import SearchSpecialist_Medical from "./SearchSpecialist_Medical";
import SearchBimeh_Medical from "./SearchBimeh_Medical";
import GenderSelect_medical from "./GenderSelect_medical";
import DatePicker_Medical from "./DatePicker_Medical";

function FilterMedicalCenters({ hidden, setIsFilterClickMobile }) {
  const {
    provinceName,
    filtredBoxes,
    setFiltredBoxes,
    setProvinceID,
    setProvinceName,
    cityName,
    setCityID,
    setCityName,

    setSpecialistNames,
    treatmentName,
    setTreatmentName,
    storedIdsMultipleSearch,
    setStoredIdsMultipleSearch,
    setSpecialistSearch,
    setMultiSpecialtiesBoxes,
    multiSpecialtiesBoxes,
  } = Filtering_MedicalCenters_Store();

  let boxItems = [
    {
      id: 1,
      caption: provinceName,
      type: "ProvinceName",
    },
    {
      id: 2,
      caption: cityName,
      type: "CityName",
    },

    {
      id: 4,
      caption: treatmentName,
      type: "TreatmentCenterType",
    },
  ];

  const handleBoxItems = () => {
    setFiltredBoxes(boxItems);
  };
  useEffect(() => {
    handleBoxItems();
  }, [provinceName, cityName, treatmentName]);
  const handleRemoveSpecial = (idToRemove, caption) => {
    console.log(caption);
    console.log(storedIdsMultipleSearch);
    if (typeof storedIdsMultipleSearch == "string") {
      let newIds = storedIdsMultipleSearch
        .split(",")
        .filter((id) => id !== idToRemove.toString())
        .join(",");
      console.log(newIds);
      setStoredIdsMultipleSearch(newIds);
      setSpecialistSearch(newIds);
    } else {
      setSpecialistSearch("");
    }

    let removedBox = multiSpecialtiesBoxes
      .filter((item) => item.caption != caption)
      .filter((item) => item.caption);
    console.log(removedBox);
    setMultiSpecialtiesBoxes(removedBox);
  };
  const handleRemoveItem = (type) => {
    if (type == "ProvinceName") {
      setProvinceID("");
      setProvinceName("");
      const filtred = filtredBoxes.filter(
        (item) => item.type !== "ProvinceName"
      );
      setFiltredBoxes(filtred);
    } else if (type == "CityName") {
      setCityID("");
      setCityName("");
      const filtred = filtredBoxes.filter((item) => item.type !== "CityName");
      setFiltredBoxes(filtred);
    } else if (type == "TreatmentCenterType") {
      setTreatmentID("");
      setTreatmentName("");
      const filtred = filtredBoxes.filter(
        (item) => item.type !== "TreatmentCenterType"
      );
      setFiltredBoxes(filtred);
    } else {
      console.log(type);
    }
  };
  return (
    <div
      className={` ${
        hidden && "hidden"
      }  lg:flex bg-white  items-center flex w-full  flex-col gap-5 lg:gap-[30px] p-2 lg:p-5 xl:w-[411px] lg:w-1/3 rounded-xl transition-all min-h-[1164px]`}
    >
      <div className=" w-[95%] h-[97%] flex gap-2 flex-col">
        <div className=" w-full flex justify-between items-center">
          <h2 className=" flex items-center gap-2 text-sm lg:text-[20px]">
            <img width={28} src={filterIcon} alt="icon" />
            فیلتر پیشرفته
          </h2>
          {/* <h2
            onClick={() => {
              setCityID();
              setCityName();
              setProvinceID();
              setProvinceName();
              setSpecialistSearch();
              setSpecialistNames();
              setFiltredBoxes([]);
              setMultiSpecialtiesBoxes([]);
            }}
            className=" cursor-pointer flex items-center gap-1 text-[14px] text-[#E62333F2]"
          >
            <RxCross2 className=" text-xl" />
            حذف فیلترها
          </h2> */}
          <RxCross2
            onClick={() => setIsFilterClickMobile(false)}
            className=" flex lg:hidden"
          />
        </div>
        <div className=" w-full flex-wrap flex justify-start items-center gap-2">
          {filtredBoxes
            .filter((item) => item.caption)
            .map((item, index) => {
              return (
                item.caption && (
                  <button
                    onClick={() => handleRemoveItem(item.type)}
                    key={index}
                    className=" items-center flex-wrap flex  gap-1 bg-[rgba(31,113,104,0.08)] border border-[#399086C9] text-[#399086C9] rounded-full text-xs overflow-hidden lg:p-2 p-1"
                  >
                    <RxCross2 className="text-[#399086C9]" />
                    {item.caption}
                  </button>
                )
              );
            })}
          {multiSpecialtiesBoxes
            .filter((item) => item.id != 0)
            .filter((item) => item.caption)
            .map((item) => {
              return (
                <button
                  onClick={() => handleRemoveSpecial(item.id, item.caption)}
                  key={item.id}
                  className=" items-center flex-wrap flex  gap-1 bg-[rgba(31,113,104,0.08)] border border-[#399086C9] text-[#399086C9] rounded-full text-xs overflow-hidden lg:p-2 p-1"
                >
                  <RxCross2 className="text-[#399086C9]" />
                  {item.caption}
                </button>
              );
            })}
        </div>

        <Search_Provience_MedicalCenters />
        <Search_City_MedicalCenters />
        {/* <Search_Special_MedicalCenters /> */}
        {/* <Search_TreatmentCenterType_MedicalCenters /> */}
        {/* <SerchDropDowns /> */}
        <h2 className=" text-sm lg:text-[16px]">روش ویزیت رو انتخاب کنید</h2>
        <div className="  w-full flex justify-center gap-5 lg:justify-between">
          <NobatButton_medicalCenters type="آنلاین" />
          <NobatButton_medicalCenters type="حضوری" />
        </div>

        <SearchSpecialist_Medical />
        <SearchBimeh_Medical />
        <GenderSelect_medical />
        <DatePicker_Medical />
        <div className=" flex w-full justify-center items-center">
          <div className=" w-full h-[168px] flex flex-col justify-center px-5 border shadow-md rounded-2xl">
            <FormGroup>
              <div className=" xl:text-base text-sm flex items-center justify-between">
                <h2>فقط پزشکان آنلاین</h2>
                <FormControlLabel value="justOnline" control={<Switch />} />
              </div>
              <div className=" xl:text-base text-sm flex items-center justify-between">
                <h2>فقط پزشکان دارای نوبت باز</h2>
                <FormControlLabel value="justHasTurn" control={<Switch />} />
              </div>
              <div className=" xl:text-base text-sm flex items-center justify-between">
                <h2>فقط پزشکانی که بیمه قبول می کنند</h2>
                <FormControlLabel
                  value="JustAcceptInsurance"
                  control={<Switch />}
                />
              </div>
            </FormGroup>
          </div>
        </div>
        <button className=" lg:hidden rounded-lg text-sm p-2 text-white bg-[#005DAD]">
          اعمال فیلتر ها
        </button>
        {/* <SerchDropDowns title={"نام تخصص"} placeHolder="نام تخصص" />
        <SerchDropDowns title={"خدمات"} placeHolder="نام خدمات" />
        <SerchDropDowns title={"مرکز"} placeHolder="نوع مرکز" /> */}
      </div>
    </div>
  );
}

export default FilterMedicalCenters;

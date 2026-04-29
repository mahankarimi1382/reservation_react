"use client";
import React, { useEffect, useState } from "react";
import filterIcon from "../../assets/Pics/filter.png";

import MyLocMap from "../../assets/Pics/myLocMap.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SearchSpecialites from "./SearchSpecialites";
import GenderSelect from "./GenderSelect";
import DatePicker from "./DatePicker";
import { NobatButton } from "../../components/Buttons/Button";
import { SerchDropDowns } from "../../components/Inputs/Input";
import SearchBimehSection from "./SearchBimehSection";
import DatePickerComponent from "../../components/DatePickerComponent";
import { get_specialties } from "../../api/ApiCalling";
import { myStore } from "../../store/Store";
import { RxCross2 } from "react-icons/rx";

function FilterDoctors({ hidden, setIsFilterClickMobile }) {
  const { filtredBoxes, multiSpecialtiesBoxes } = myStore();
  const {
    setBimehTakmili,
    specialistSearch,
    setSpecialistSearch,
    setBimeAsli,
    setJustOnline,
    setHasTurn,
    setAcceptInsurance,
    setGender,
    setSDate,
    setEDate,
    setOnlineTypeId,
    setOfficeOrClinicHozoori,
    provinceId,
    cityId,
    setProvinceId,
    setCityId,
    setMultiSpecialtiesBoxes,
    storedIdsMultipleSearch,
    setStoredIdsMultipleSearch,
  } = myStore();
  const handleRemoveItem = (type) => {
    if (type == "bimeAsli") {
      setBimeAsli("");
    } else if (type == "bimeTakmili") {
      setBimehTakmili("");
    } else if (type == "onlineTypeId") {
      setOnlineTypeId("");
    } else if (type == "province") {
      setProvinceId("");
    } else if (type == "city") {
      setCityId("");
    } else if (type == "justOnline") {
      setJustOnline("");
    } else if (type == "gender") {
      setGender("");
    } else if (type == "acceptInsurance") {
      setAcceptInsurance("");
    } else {
      console.log(type);
    }
  };
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
  const { hasTurn, setCurrentPageDoctorSearch, acceptInsurance, justOnline } =
    myStore();

  return (
    <div
      className={` ${
        hidden && "hidden"
      }  lg:flex bg-white flex w-full  flex-col gap-5 lg:gap-[30px] p-2 lg:p-5 xl:w-[411px] lg:w-1/3 rounded-xl transition-all min-h-[1164px]`}
    >
      <div className=" flex justify-between items-center">
        <h2 className=" flex items-center gap-2 text-sm lg:text-[20px]">
          <img
            width={28}
            className=" lg:w-[28px] w-[22px]"
            src={filterIcon}
            alt="icon"
          />
          فیلتر پیشرفته
        </h2>
        <RxCross2
          onClick={() => setIsFilterClickMobile(false)}
          className=" flex lg:hidden"
        />
      </div>
      <div className=" w-full flex-wrap flex justify-start items-center gap-2">
        {filtredBoxes.map((item, index) => {
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
      <SerchDropDowns />
      <h2 className=" text-sm lg:text-[16px]">روش ویزیت رو انتخاب کنید</h2>
      <div className="  w-full flex justify-center gap-5 lg:justify-between">
        <NobatButton type="آنلاین" />
        <NobatButton type="حضوری" />
      </div>
      {/* <div className=" shadow-md gap-3 border bg-white rounded-2xl h-[183px] flex flex-col">
        <img src={MyLocMap} alt="map" />
        <h5 className=" text-lg px-4">انتخاب موقعیت مکانی من :</h5>
      </div> */}
      <SearchSpecialites />
      <SearchBimehSection />
      <GenderSelect />
      <DatePicker />
      <div className=" flex w-full justify-center items-center">
        <div className=" w-full h-[168px] flex flex-col justify-center px-5 border shadow-md rounded-2xl">
          <FormGroup
            onChange={(e) => {
              if (e.target.value == "justOnline") {
                setJustOnline(!justOnline);
                setCurrentPageDoctorSearch(1);
              } else if (e.target.value == "justHasTurn") {
                // setHasTurn(!hasTurn);
              } else if (e.target.value == "JustAcceptInsurance") {
                setAcceptInsurance(!acceptInsurance);
                setCurrentPageDoctorSearch(1);
              }
            }}
          >
            <div className=" xl:text-base text-sm flex items-center justify-between">
              <h2>فقط پزشکان آنلاین</h2>
              <FormControlLabel
                checked={justOnline}
                value="justOnline"
                control={<Switch />}
              />
            </div>
            <div className=" xl:text-base text-sm flex items-center justify-between">
              <h2>فقط پزشکان دارای نوبت باز</h2>
              <FormControlLabel value="justHasTurn" control={<Switch />} />
            </div>
            <div className=" xl:text-base text-sm flex items-center justify-between">
              <h2>فقط پزشکانی که بیمه قبول می کنند</h2>
              <FormControlLabel
                checked={acceptInsurance}
                value="JustAcceptInsurance"
                control={<Switch />}
              />
            </div>
          </FormGroup>
        </div>
      </div>
      <button
        onClick={() => setIsFilterClickMobile(false)}
        className=" lg:hidden rounded-lg text-sm p-2 text-white bg-[#005DAD]"
      >
        اعمال فیلتر ها
      </button>
    </div>
  );
}

export default FilterDoctors;

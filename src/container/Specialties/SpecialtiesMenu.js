"use client";
import { get_specialties_category } from "../../api/ApiCalling";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { fixSvgDataUri, handleImgError } from "../../utils/SvgFix";
import fallbackIcon from "../../assets/Pics/Specialties/kollie-icon.png";

function SpecialtiesMenu({ setSpecialties }) {
  const [categorys, setCategorys] = useState([]);
  console.log(categorys);
  const getcategorys = async () => {
    const data = await get_specialties_category();
    if (data) {
      console.log(data);
      setCategorys(data);
    }
  };
  useEffect(() => {
    getcategorys();
  }, []);
  const handleCardClick = (id, specialists) => {
    setSpecialties(specialists);
    const updatedCards = categorys.map((card) =>
      card.id === id
        ? { ...card, isselected: true }
        : { ...card, isselected: false }
    );
    setCategorys(updatedCards);
  };
  return (
    <div className=" lg:w-[35%] lg:min-w-0 min-w-[50%] rounded-xl bg-white lg:p-5 p-1   gap-2 flex flex-col items-center">
      {categorys.map((item) => {
        return (
          <div
            onClick={() => handleCardClick(item.id, item.specialists)}
            key={item.id}
            className={`${
              item.isselected && "bg-[#ECF2F9]"
            } w-full cursor-pointer p-2  flex justify-between items-center border rounded-xl `}
          >
            <div className=" flex justify-center items-center lg:gap-3 lg:px-5 lg:p-3">
              {item.categoryLogoFile &&
                item.categoryLogoFile !== "string" && (
                  <img
                    className=" w-5 lg:w-[32px]"
                    src={fixSvgDataUri(item.categoryLogoFile)}
                    alt="icon"
                    width={32}
                    height={32}
                    onError={(e) => handleImgError(e, fallbackIcon)}
                  />
                )}
              <h5 className=" text-sm lg:text-base">{item.categoryName}</h5>
            </div>
            <IoIosArrowBack className=" text-2xl text-[#005DAD]" />
          </div>
        );
      })}
    </div>
  );
}

export default SpecialtiesMenu;

import React, { useEffect, useState } from "react";
import logo from "../../assets/Pics/logo-doctor.png";
import { RxCross2 } from "react-icons/rx";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import matniminimal from "../../assets/Pics/matniminimal.png";
import sotiminimal from "../../assets/Pics/sotiMinimal.png";
import tasviriminimal from "../../assets/Pics/tasviriMinimal.png";
import hospitalMinimal from "../../assets/Pics/hospitalMinimal.png";
import matabMinimal from "../../assets/Pics/matabMinimal.png";
import { read_office_type } from "../../api/ApiCalling";
import TailwindLoader from "../../utils/TailwindLoader";
import { myStore } from "../../store/Store";

function VisitTypeSelectionModal({
  isVisitSelectModal,
  setIsVisitSelectModal,
}) {
  const [id, setId] = useState("");
  const { setOnlineTypeId, setCurrentPageDoctorSearch } = myStore();
  const [officeType, setOfficeType] = useState([]);
  console.log(officeType);
  const getOfficeType = async () => {
    const result = await read_office_type();
    console.log(result);
    if (result) {
      console.log(result);
      let filtred = result.filter((item) => item.type != "حضوری");

      setOfficeType(filtred);
    }
  };
  useEffect(() => {
    getOfficeType();
  }, []);
  const handleCloseModal = () => {
    setIsVisitSelectModal(false);
  };
  const typeImageHandler = (type) => {
    if (type == "پیامرسان") {
      return <img width={16} alt="icon" src={matniminimal} />;
    } else if (type == "تلفنی") {
      return <img width={16} alt="icon" src={sotiminimal} />;
    } else if (type == "تصویری") {
      return <img width={16} alt="icon" src={tasviriminimal} />;
    }
  };
  return (
    <div className=" w-screen h-screen top-0 z-50 justify-center items-center flex right-0 fixed bg-[rgba(0,0,0,0.6)]">
      <div className=" w-[448px] h-[325px] flex flex-col justify-center gap-5 items-center bg-white rounded-xl">
        <div className=" w-full  items-end flex justify-end px-2 -mb-10">
          <RxCross2
            onClick={handleCloseModal}
            className=" cursor-pointer text-xl text-[#717171]"
          />
        </div>
        <img width={67} src={logo} alt="logo" />
        <div className=" w-[223px] flex px-1 justify-center items-center h-[43px]">
          {isVisitSelectModal === "حضوری" ? (
            <h2 className="p-1 flex justify-center items-center text-[#005DAD] font-semibold text-xl">
              حضوری
            </h2>
          ) : (
            <h2 className="p-1 flex justify-center items-center text-[#005DAD] font-semibold text-xl">
              مشاوره آنلاین
            </h2>
          )}
        </div>
        {isVisitSelectModal === "آنلاین" ? (
          <h2>لطفا نوع مشاوره آنلاین را انتخاب کنید</h2>
        ) : (
          <h2>لطفا نوع ویزیت حضوری را انتخاب کنید</h2>
        )}
        <div className=" w-full">
          <FormControl className=" w-full flex ">
            {isVisitSelectModal === "آنلاین" ? (
              <RadioGroup
                onChange={(e) => {
                  setId(e.target.value);
                }}
                className=" flex justify-center gap-3 flex-row items-center"
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                <div className=" w-full flex justify-center items-center gap-2">
                  {officeType.length != 0 ? (
                    officeType.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className=" border-2 rounded-xl pl-2   flex justify-center items-center gap-2"
                        >
                          <FormControlLabel
                            className=" mr-0 "
                            value={item.id}
                            control={<Radio className=" text-3xl" />}
                          />
                          {typeImageHandler(item.type)}
                          {item.type}
                        </div>
                      );
                    })
                  ) : (
                    <TailwindLoader />
                  )}
                </div>
              </RadioGroup>
            ) : (
              <RadioGroup
                onChange={(e) => setId(e.target.value)}
                className=" flex justify-center gap-3 flex-row items-center"
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                <div className=" w-full flex justify-center items-center gap-2">
                  <div className=" border-2 rounded-xl pl-2   flex justify-center items-center gap-2">
                    <FormControlLabel
                      className=" mr-0 "
                      value="1"
                      control={<Radio className=" text-3xl" />}
                    />
                    <img width={16} alt="icon" src={matabMinimal} />
                    مطب
                  </div>
                  <div className=" border-2 rounded-xl pl-2  flex justify-center items-center gap-2">
                    <FormControlLabel
                      className=" mr-0 "
                      value=""
                      control={<Radio />}
                    />
                    <img src={hospitalMinimal} alt="icon" width={16} />
                    بیمارستان
                  </div>
                </div>
              </RadioGroup>
            )}
          </FormControl>
        </div>
        <button
          disabled={!id}
          onClick={() => {
            setOnlineTypeId(id);
            handleCloseModal();
            setCurrentPageDoctorSearch(1);
          }}
          className=" disabled:bg-slate-400 bg-[#005DAD] text-white text-xl px-16 p-2 rounded-xl"
        >
          جستجو
        </button>
      </div>
    </div>
  );
}

export default VisitTypeSelectionModal;

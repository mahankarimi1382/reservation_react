import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { myStore } from "../../store/Store";
function GenderSelect() {
  const { setGender, setCurrentPageDoctorSearch } = myStore();
  return (
    <div className=" w-full flex justify-center items-center">
      <div className=" w-full rounded-2xl h-[112px] justify-center  border shadow-md flex flex-col">
        <h2 className=" px-5">جنسیت پزشک :</h2>
        <RadioGroup
          onChange={(e) => {
            setCurrentPageDoctorSearch(1);
            setGender(e.target.value);
          }}
        >
          <div className=" pl-2  w-full flex justify-center items-center xl:gap-5 ">
            {/* <FormControl className=" w-full "> */}
            <div className="  flex justify-center items-center gap-2">
              <FormControlLabel value="خانم ها" control={<Radio />} />
              خانم
            </div>
            <div className="  flex justify-center items-center gap-2">
              <FormControlLabel value="آقایان" control={<Radio />} />
              آقا
            </div>
            <div className=" flex  justify-center items-center gap-2">
              <FormControlLabel value="" control={<Radio />} />
              هردو
            </div>

            {/* </FormControl> */}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default GenderSelect;

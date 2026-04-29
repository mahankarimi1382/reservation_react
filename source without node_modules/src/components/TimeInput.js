import React from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";

const TimeInput = ({ format, setTime }) => {
  return (
    <div>
      <TimePicker
        showNow={false}

        onChange={(e) => setTime(e.format(format))}
        className=" w-[81px] h-[38px] rounded-lg border-[#005DAD] border"
        defaultValue={dayjs("00:00", format)}
        format={format}
      />
    </div>
  );
};

export default TimeInput;

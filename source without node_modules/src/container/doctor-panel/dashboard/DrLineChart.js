"use client";
import React from "react";
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";
function DrLineChart() {
  const uData1 = [200, 450, 300, 100, 150, 200, 250];
  const uData2 = [800, 310, 500, 50, 180, 100, 300];
  const xLabels = [1397, 1398, 1399, 1400, 1401, 1402, 1403];
  return (
    <div className=" " dir="ltr">
      <div dir="rtl" className=" flex justify-between items-center">
        <h5 className=" font-semibold">آمار نوبت ها</h5>
        <div className=" flex justify-center items-center gap-2">
          <button className=" border rounded-2xl p-2">یک سال</button>
          <button className=" border rounded-2xl p-2">یک ماه</button>
          <button className=" border rounded-2xl p-2">یک هفته</button>
          <button className=" bg-[#005DAD] text-white px-3 border rounded-2xl p-2">
            همه
          </button>
        </div>
      </div>{" "}
      <LineChart
        width={520}
        height={232}
        series={[
          { data: uData1, color: "#0E5FD9", showMark: false, id: "UD1" },
          { data: uData2, color: "#E62333F2", showMark: false, id: "UD2" },
        ]}
        sx={{
          [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
            strokeWidth: 4,
          },
        }}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ min: 0, max: 1000 }]}
      />
    </div>
  );
}

export default DrLineChart;

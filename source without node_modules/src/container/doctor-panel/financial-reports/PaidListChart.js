"use client";
import React from "react";
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";
function PaidListChart() {
  const uData1 = [500, 100, 850, 200, 1150, 700, 500];
  const xLabels = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
  ];
  return (
    <div className=" " dir="ltr">
      <div dir="rtl" className=" w-full  flex justify-end items-center">
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
        ]}
        sx={{
          [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
            strokeWidth: 4,
          },
        }}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ min: 0, max: 1400 }]}
      />
    </div>
  );
}

export default PaidListChart;

import * as React from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
const dataset = [
  {
    numb: 150,
    range: "0-5",
  },
  {
    numb: 28,
    range: "5-18",
  },
  {
    numb: 75,
    range: "18-35",
  },
  {
    numb: 73,
    range: "35-40",
  },
  {
    numb: 99,
    range: "40-60",
  },
  {
    numb: 99,
    range: "60-100",
  },
  {
    numb: 144,
    range: "100+",
  },
];

const chartSetting = {
  series: [{ dataKey: "numb" }],
  height: 190,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

export default function DoctorBarChart() {
  return (
    <div
      className=" relative min-h-[192px] max-h-[192px] bg-white rounded-3xl shadow-lg"
      dir="ltr"
      style={{ width: "68%" }}
    >
      <div className=" absolute right-5 top-5">
        <h5 className=" font-semibold">بیماران براساس سن</h5>
      </div>
      <BarChart
        colors={["#C0C0C0"]}
        borderRadius={15}
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "range",
            categoryGapRatio: 0.6,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}

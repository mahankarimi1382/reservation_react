"use client"
import * as React from "react";
import Stack from "@mui/material/Stack";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export default function GaugeChart({ color }) {
  return (
    <Stack
      className=" relative flex justify-center items-center"
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 1, md: 3 }}
    >
      <h5 className=" absolute right-5 text-sm">%</h5>
      <Gauge
        sx={() => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: color,
          },
        })}
        innerRadius={"90%"}
        width={82}
        height={82}
        value={60}
      />
    </Stack>
  );
}

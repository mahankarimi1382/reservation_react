import React from "react";
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

// نمودار وضعیت نوبت — داده‌ی واقعی: تعداد نوبت‌های ثبت‌شده در هر ماه شمسی
// prop دریافتی: monthlyCounts = { "1405/06": 3, ... }
function TurnStatusChart({ monthlyCounts }) {
  const entries = Object.entries(monthlyCounts || {}).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  if (!entries.length) {
    return (
      <div className="w-full py-12 text-center text-slate-500 text-sm">
        نوبتی ثبت نشده است
      </div>
    );
  }

  const xLabels = entries.map(([k]) => k);
  const data = entries.map(([, v]) => v);
  const maxY = Math.max(...data, 1);

  return (
    <div className=" w-full" dir="ltr">
      <LineChart
        width={900}
        height={300}
        series={[
          {
            data: data,
            color: "#845ED7",
            showMark: true,
            id: "turns",
            label: "تعداد نوبت",
          },
        ]}
        sx={{
          [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
            strokeWidth: 3,
          },
        }}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ min: 0, max: maxY + 1 }]}
      />
    </div>
  );
}

export default TurnStatusChart;

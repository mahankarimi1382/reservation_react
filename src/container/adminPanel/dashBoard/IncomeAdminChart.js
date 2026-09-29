import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

// نمودار درآمد — داده‌ی واقعی: جمع تعرفه‌ی ویزیت نوبت‌های ثبت‌شده در هر ماه شمسی
// prop دریافتی: monthlyIncomes = { "1405/06": 2301000, ... }
function IncomeAdminChart({ monthlyIncomes }) {
  const entries = Object.entries(monthlyIncomes || {}).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  if (!entries.length) {
    return (
      <div className="w-full py-12 text-center text-slate-500 text-sm">
        درآمدی برای نمایش وجود ندارد
      </div>
    );
  }

  const xLabels = entries.map(([k]) => k);
  const data = entries.map(([, v]) => v);

  return (
    <div className="" dir="ltr">
      <LineChart
        width={900}
        height={336}
        series={[
          {
            data: data,
            color: "#0E5FD9",
            showMark: true,
            label: "درآمد (تومان)",
          },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
}

export default IncomeAdminChart;

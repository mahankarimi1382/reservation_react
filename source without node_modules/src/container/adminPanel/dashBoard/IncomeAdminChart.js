import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

function IncomeAdminChart() {
  const uData = [4000, 3000, 2000, 2780, 1890];
  const xLabels = ["فروردین", "اردیبهشت", "خراد", "تیر", "مرداد"];
  return (
    <div className="" dir="ltr">
      {" "}
      <LineChart
        width={1000}
        height={336}
        series={[{ data: uData, color: "#0E5FD9", showMark: false }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
}

export default IncomeAdminChart;

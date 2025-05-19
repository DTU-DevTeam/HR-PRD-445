import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";
import "./Area-Report.css";

const chartConfig = {
  metrics: {
    label: "Metrics",
  },
  totalSalary: {
    label: "Total Salary Paid",
    color: "hsl(var(--chart-1))",
  },
  activeEmployees: {
    label: "Active Employees",
    color: "hsl(var(--chart-2))",
  },
};

export default function AreaReport({ chartData }) {
  const [timeRange, setTimeRange] = useState("90d");

  const aggregatedData = chartData.reduce((acc, item) => {
    const salaryMonth = item.salaryMonth || "2025-01";
    if (!acc[salaryMonth]) {
      acc[salaryMonth] = { totalSalary: 0, activeEmployees: 0, count: 0 };
    }
    acc[salaryMonth].totalSalary += item.netSalary || 0;
    acc[salaryMonth].activeEmployees += item.workDays ? 1 : 0;
    acc[salaryMonth].count += 1;
    return acc;
  }, {});

  const processedData = Object.keys(aggregatedData)
    .map((month) => ({
      date: `${month}-01`,
      totalSalary: aggregatedData[month].totalSalary,
      activeEmployees: aggregatedData[month].activeEmployees,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const filteredData = processedData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2025-01-31");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="area-report-div">
      <div className="card-header">
        <div>
          <h2 className="card-title">Salary and Employee Activity</h2>
          <p className="card-description">Showing total salary paid and active employees</p>
        </div>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="select-trigger">
          <option value="90d">Last 3 months</option>
          <option value="30d">Last 30 days</option>
          <option value="7d">Last 7 days</option>
        </select>
      </div>
      <div className="card-content">
        <div className="chart-container">
          <AreaChart data={filteredData} width={600} height={250}>
            <defs>
              <linearGradient id="fillTotalSalary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.totalSalary.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartConfig.totalSalary.color} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillActiveEmployees" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.activeEmployees.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartConfig.activeEmployees.color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Tooltip
              cursor={false}
              formatter={(value, name) => {
                if (name === "totalSalary") return [`$${value.toFixed(2)}`, chartConfig.totalSalary.label];
                return [value, chartConfig.activeEmployees.label];
              }}
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Area
              dataKey="activeEmployees"
              type="natural"
              fill="url(#fillActiveEmployees)"
              stroke={chartConfig.activeEmployees.color}
              stackId="a"
            />
            <Area
              dataKey="totalSalary"
              type="natural"
              fill="url(#fillTotalSalary)"
              stroke={chartConfig.totalSalary.color}
              stackId="a"
            />
            <Legend />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}
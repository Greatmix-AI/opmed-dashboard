
import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for 24-hour case volume
const hourlyData = [
  { time: "00:00", cases: 5 },
  { time: "01:00", cases: 3 },
  { time: "02:00", cases: 2 },
  { time: "03:00", cases: 1 },
  { time: "04:00", cases: 1 },
  { time: "05:00", cases: 2 },
  { time: "06:00", cases: 4 },
  { time: "07:00", cases: 8 },
  { time: "08:00", cases: 15 },
  { time: "09:00", cases: 22 },
  { time: "10:00", cases: 25 },
  { time: "11:00", cases: 27 },
  { time: "12:00", cases: 24 },
  { time: "13:00", cases: 21 },
  { time: "14:00", cases: 18 },
  { time: "15:00", cases: 15 },
  { time: "16:00", cases: 13 },
  { time: "17:00", cases: 11 },
  { time: "18:00", cases: 9 },
  { time: "19:00", cases: 7 },
  { time: "20:00", cases: 6 },
  { time: "21:00", cases: 5 },
  { time: "22:00", cases: 4 },
  { time: "23:00", cases: 3 },
];

export const LineChart: React.FC = () => {
  return (
    <div className="flex-1 bg-white rounded-md">
      <div className="flex justify-between items-center p-3">
        <div className="text-sm text-[#0E3C48]">Case Volume Overtime</div>
        <div className="flex items-center gap-2 border text-xs text-[#708090] bg-white px-2 py-1.5 rounded-md border-solid border-[#E6F3F4]">
          <span>Daily</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5582 12.7604L10 12.1818L9.44176 12.7604C9.75007 13.0799 10.2499 13.0799 10.5582 12.7604Z"
              fill="#676879"
            />
          </svg>
        </div>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={200}>
          <RechartsLineChart
            data={hourlyData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => value.split(":")[0] + "h"}
              interval={3}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              domain={[0, 'dataMax + 5']}
              tickCount={5}
            />
            <Tooltip
              formatter={(value) => [`${value} cases`, 'Case Volume']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="cases"
              stroke="#2EBDCC"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


import React, { useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// Generate sample data for weekly view
const generateWeeklyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyData = [];
  
  days.forEach(day => {
    // Random value between 45-70 for 12 AM
    const amValue = Math.floor(Math.random() * 26) + 45;
    // Random value between 45-70 for 12 PM
    const pmValue = Math.floor(Math.random() * 26) + 45;
    
    weeklyData.push({ time: `${day} 12 AM`, cases: amValue });
    weeklyData.push({ time: `${day} 12 PM`, cases: pmValue });
  });
  
  return weeklyData;
};

const weeklyData = generateWeeklyData();

export const LineChart: React.FC = () => {
  const [viewType, setViewType] = useState<"daily" | "weekly" | "monthly" | "quarterly">("daily");
  
  const currentData = viewType === "daily" ? hourlyData : weeklyData;
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-[#0E3C48]">Case Volume Overtime</div>
        <Select
          value={viewType}
          onValueChange={(value) => setViewType(value as "daily" | "weekly" | "monthly" | "quarterly")}
        >
          <SelectTrigger className="w-[90px] h-auto border text-xs text-[#708090] bg-white px-2 py-1.5 rounded-md border-solid border-[#E6F3F4]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <RechartsLineChart
          data={currentData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => {
              if (viewType === "daily") {
                return value.split(":")[0] + "h";
              }
              return value;
            }}
            interval={viewType === "daily" ? 3 : 1}
          />
          <YAxis
            tick={{ fontSize: 10 }}
            domain={viewType === "daily" ? [0, 'dataMax + 5'] : [40, 75]}
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
  );
};

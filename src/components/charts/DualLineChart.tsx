
import React, { useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data for 24-hour case volume with two data series
const hourlyData = [
  { time: "00:00", cases: 5, efficiency: 65 },
  { time: "01:00", cases: 3, efficiency: 70 },
  { time: "02:00", cases: 2, efficiency: 75 },
  { time: "03:00", cases: 1, efficiency: 72 },
  { time: "04:00", cases: 1, efficiency: 68 },
  { time: "05:00", cases: 2, efficiency: 70 },
  { time: "06:00", cases: 4, efficiency: 75 },
  { time: "07:00", cases: 8, efficiency: 78 },
  { time: "08:00", cases: 15, efficiency: 80 },
  { time: "09:00", cases: 22, efficiency: 85 },
  { time: "10:00", cases: 25, efficiency: 90 },
  { time: "11:00", cases: 27, efficiency: 92 },
  { time: "12:00", cases: 24, efficiency: 88 },
  { time: "13:00", cases: 21, efficiency: 82 },
  { time: "14:00", cases: 18, efficiency: 80 },
  { time: "15:00", cases: 15, efficiency: 78 },
  { time: "16:00", cases: 13, efficiency: 75 },
  { time: "17:00", cases: 11, efficiency: 72 },
  { time: "18:00", cases: 9, efficiency: 70 },
  { time: "19:00", cases: 7, efficiency: 68 },
  { time: "20:00", cases: 6, efficiency: 65 },
  { time: "21:00", cases: 5, efficiency: 62 },
  { time: "22:00", cases: 4, efficiency: 60 },
  { time: "23:00", cases: 3, efficiency: 58 },
];

// Generate sample data for weekly view with two data series
const generateWeeklyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyData = [];
  
  days.forEach(day => {
    // Random value between 45-70 for 12 AM
    const amValue = Math.floor(Math.random() * 26) + 45;
    // Random value between 45-70 for 12 PM
    const pmValue = Math.floor(Math.random() * 26) + 45;
    // Random efficiency value between 60-90
    const amEfficiency = Math.floor(Math.random() * 31) + 60;
    // Random efficiency value between 60-90
    const pmEfficiency = Math.floor(Math.random() * 31) + 60;
    
    weeklyData.push({ 
      time: `${day} 12 AM`, 
      cases: amValue,
      efficiency: amEfficiency
    });
    weeklyData.push({ 
      time: `${day} 12 PM`, 
      cases: pmValue,
      efficiency: pmEfficiency
    });
  });
  
  return weeklyData;
};

const weeklyData = generateWeeklyData();

export const DualLineChart: React.FC = () => {
  const [viewType, setViewType] = useState<"daily" | "weekly">("daily");
  
  const currentData = viewType === "daily" ? hourlyData : weeklyData;
  
  return (
    <div className="flex-1 bg-white rounded-md">
      <div className="flex justify-between items-center p-3">
        <div className="text-sm text-[#0E3C48]">Case Volume & Efficiency Overtime</div>
        <Select
          value={viewType}
          onValueChange={(value) => setViewType(value as "daily" | "weekly")}
        >
          <SelectTrigger className="w-[90px] h-auto border text-xs text-[#708090] bg-white px-2 py-1.5 rounded-md border-solid border-[#E6F3F4]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-4">
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
              yAxisId="left"
            />
            <YAxis
              tick={{ fontSize: 10 }}
              domain={[0, 100]}
              tickCount={5}
              orientation="right"
              yAxisId="right"
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "cases") {
                  return [`${value} cases`, 'Case Volume'];
                }
                return [`${value}%`, 'Efficiency'];
              }}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="cases"
              stroke="#2EBDCC"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Case Volume"
              yAxisId="left"
            />
            <Line
              type="monotone"
              dataKey="efficiency"
              stroke="#FF8C42"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Efficiency"
              yAxisId="right"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

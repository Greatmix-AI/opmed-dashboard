import React, { useState, useEffect } from "react";
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

interface DualLineChartProps {
  selectedSpecialties: string[];
}

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

// Generate sample data for monthly view (30 days)
const generateMonthlyData = () => {
  const monthlyData = [];
  
  // Generate data for 30 days
  for (let i = 1; i <= 30; i++) {
    monthlyData.push({ 
      time: `Day ${i}`, 
      cases: Math.floor(Math.random() * 100) + 300,
      efficiency: Math.floor(Math.random() * 20) + 70 // Random efficiency between 70-90
    });
  }
  
  return monthlyData;
};

// Generate sample data for quarterly view (3 months)
const generateQuarterlyData = () => {
  const months = ["Jan", "Feb", "Mar"];
  const quarterlyData = [];
  
  months.forEach(month => {
    // Weekly data points for each month (4 weeks per month)
    for (let week = 1; week <= 4; week++) {
      quarterlyData.push({
        time: `${month} W${week}`,
        cases: Math.floor(Math.random() * 500) + 1000,
        efficiency: Math.floor(Math.random() * 15) + 75 // Random efficiency between 75-90
      });
    }
  });
  
  return quarterlyData;
};

const weeklyData = generateWeeklyData();
const monthlyData = generateMonthlyData();
const quarterlyData = generateQuarterlyData();

export const DualLineChart: React.FC<DualLineChartProps> = ({ selectedSpecialties }) => {
  const [viewType, setViewType] = useState<"daily" | "weekly" | "monthly" | "quarterly">("daily");
  const [filteredData, setFilteredData] = useState(hourlyData);
  
  // Effect to filter data when selected specialties change
  useEffect(() => {
    // If no specialties are selected or all are selected, show full data
    if (selectedSpecialties.length === 0) {
      setFilteredData([]);
      return;
    }
    
    // Filter data based on selected specialties
    const currentData = getChartData();
    
    // Apply a multiplier based on selected specialties to simulate filtering
    // More selected specialties = more data points with higher values
    const multiplier = selectedSpecialties.length / 8; // 8 is the total number of specialties
    
    const newData = currentData.map(item => ({
      ...item,
      cases: Math.round(item.cases * multiplier),
      efficiency: Math.min(100, Math.round(item.efficiency * (0.7 + 0.3 * multiplier))) // Efficiency is affected less
    }));
    
    setFilteredData(newData);
  }, [selectedSpecialties, viewType]);
  
  const getChartData = () => {
    switch (viewType) {
      case "daily":
        return hourlyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      case "quarterly":
        return quarterlyData;
      default:
        return hourlyData;
    }
  };
  
  // Update view type and trigger data filtering
  const handleViewTypeChange = (value: string) => {
    setViewType(value as "daily" | "weekly" | "monthly" | "quarterly");
  };
  
  const getYAxisDomain = (): [number, number | string] => {
    switch (viewType) {
      case "daily":
        return [0, 'dataMax + 5'];
      case "weekly":
        return [40, 75];
      case "monthly":
        return [250, 450];
      case "quarterly":
        return [800, 1600];
      default:
        return [0, 'dataMax + 5'];
    }
  };
  
  const getXAxisInterval = () => {
    switch (viewType) {
      case "daily":
        return 3;
      case "weekly":
        return 1;
      case "monthly":
        return 4; // Show every 5th day
      case "quarterly":
        return 3; // Show every 4th data point
      default:
        return 3;
    }
  };
  
  const formatXAxisTick = (value: string) => {
    if (viewType === "daily") {
      return value.split(":")[0] + "h";
    }
    return value;
  };
  
  // If no specialties are selected, show empty state
  if (selectedSpecialties.length === 0) {
    return (
      <div className="flex-1 bg-white rounded-md p-4 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Please select at least one specialty to view data</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 bg-white rounded-md">
      <div className="flex justify-between items-center p-3">
        <div className="text-sm text-[#0E3C48]">Case Volume & Efficiency Overtime</div>
        <Select
          value={viewType}
          onValueChange={handleViewTypeChange}
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
      <div className="p-4">
        <ResponsiveContainer width="100%" height={200}>
          <RechartsLineChart
            data={filteredData.length > 0 ? filteredData : getChartData()}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10 }}
              tickFormatter={formatXAxisTick}
              interval={getXAxisInterval()}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              domain={getYAxisDomain()}
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

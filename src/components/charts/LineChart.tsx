
import React, { useState, useEffect } from "react";
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

interface LineChartProps {
  selectedSpecialties: string[];
  timeRange?: string; // Make the timeRange prop optional for backward compatibility
}

// Sample data for 24-hour case volume with updated case values
const hourlyData = [
  { time: "00:00", cases: 76 },
  { time: "01:00", cases: 75 },
  { time: "02:00", cases: 75 },
  { time: "03:00", cases: 76 },
  { time: "04:00", cases: 77 },
  { time: "05:00", cases: 78 },
  { time: "06:00", cases: 80 },
  { time: "07:00", cases: 82 },
  { time: "08:00", cases: 85 },
  { time: "09:00", cases: 90 },
  { time: "10:00", cases: 93 },
  { time: "11:00", cases: 95 },
  { time: "12:00", cases: 94 },
  { time: "13:00", cases: 93 },
  { time: "14:00", cases: 90 },
  { time: "15:00", cases: 87 },
  { time: "16:00", cases: 85 },
  { time: "17:00", cases: 83 },
  { time: "18:00", cases: 81 },
  { time: "19:00", cases: 80 },
  { time: "20:00", cases: 79 },
  { time: "21:00", cases: 78 },
  { time: "22:00", cases: 77 },
  { time: "23:00", cases: 76 },
];

// Generate sample data for weekly view with updated case values
const generateWeeklyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyData = [];
  
  days.forEach(day => {
    // Random value between 75-95 for 12 AM
    const amValue = Math.floor(Math.random() * 21) + 75;
    // Random value between 75-95 for 12 PM
    const pmValue = Math.floor(Math.random() * 21) + 75;
    
    weeklyData.push({ time: `${day} 12 AM`, cases: amValue });
    weeklyData.push({ time: `${day} 12 PM`, cases: pmValue });
  });
  
  return weeklyData;
};

// Generate sample data for monthly view (30 days) with updated case values
const generateMonthlyData = () => {
  const monthlyData = [];
  
  // Generate data for 30 days with values between 525-665 (7 days × daily range 75-95)
  for (let i = 1; i <= 30; i++) {
    monthlyData.push({ 
      time: `Day ${i}`, 
      cases: Math.floor(Math.random() * 141) + 525
    });
  }
  
  return monthlyData;
};

// Generate sample data for quarterly view (3 months) with updated case values
const generateQuarterlyData = () => {
  const months = ["Jan", "Feb", "Mar"];
  const quarterlyData = [];
  
  months.forEach(month => {
    // Weekly data points for each month (4 weeks per month)
    for (let week = 1; week <= 4; week++) {
      // Weekly values between 525-665
      quarterlyData.push({
        time: `${month} W${week}`,
        cases: Math.floor(Math.random() * 141) + 525
      });
    }
  });
  
  return quarterlyData;
};

const weeklyData = generateWeeklyData();
const monthlyData = generateMonthlyData();
const quarterlyData = generateQuarterlyData();

export const LineChart: React.FC<LineChartProps> = ({ selectedSpecialties, timeRange = "Last 12 Months" }) => {
  const [viewType, setViewType] = useState<"daily" | "weekly" | "monthly" | "quarterly">("daily");
  const [filteredData, setFilteredData] = useState(hourlyData);
  const [timeBasedData, setTimeBasedData] = useState(hourlyData);
  
  // Effect to adjust data based on selected time range
  useEffect(() => {
    // Apply a consistent random seed based on timeRange to ensure stable but different values
    const getRandomFactor = () => {
      // Generate a pseudo-random factor based on the time range string
      const seed = timeRange.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      // Ensure variation is within 15% of the original data
      return 0.85 + (((seed % 30) / 30) * 0.3); // Factor between 0.85 and 1.15 (±15%)
    };
    
    // Apply the random factor to the data based on time range
    const factor = getRandomFactor();
    
    const currentData = getChartData();
    const adjustedData = currentData.map(item => ({
      ...item,
      cases: Math.max(75, Math.min(95, Math.round(item.cases * factor))) // Ensure daily is 75-95
    }));
    
    setTimeBasedData(adjustedData);
  }, [timeRange]);
  
  // Effect to filter data when selected specialties or viewType change
  useEffect(() => {
    // Ensure selectedSpecialties is defined and has a length property
    const specialtiesArray = selectedSpecialties || [];
    
    // If no specialties are selected, show empty data
    if (specialtiesArray.length === 0) {
      setFilteredData([]);
      return;
    }
    
    // Apply a multiplier based on selected specialties to simulate filtering
    // More selected specialties = more data points with higher values
    const multiplier = specialtiesArray.length / 8; // 8 is the total number of specialties
    
    const newData = timeBasedData.map(item => {
      let newCases: number;
      
      if (viewType === "daily") {
        // For daily view, ensure cases are between 75-95
        newCases = Math.max(75, Math.min(95, Math.round(item.cases * multiplier)));
      } else if (viewType === "weekly") {
        // For weekly view (twice daily data points)
        newCases = Math.max(75, Math.min(95, Math.round(item.cases * multiplier)));
      } else if (viewType === "monthly") {
        // For monthly view, ensure values are between 525-665 (7 days × daily range 75-95)
        newCases = Math.max(525, Math.min(665, Math.round(item.cases * multiplier)));
      } else { // quarterly
        // For quarterly view, scale appropriately
        newCases = Math.max(525, Math.min(665, Math.round(item.cases * multiplier)));
      }
      
      return {
        ...item,
        cases: newCases
      };
    });
    
    setFilteredData(newData);
  }, [selectedSpecialties, viewType, timeBasedData]);
  
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
  if (!selectedSpecialties || selectedSpecialties.length === 0) {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Please select at least one specialty to view data</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-[#0E3C48]">Case Volume Overtime</div>
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

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
  timeRange?: string; // Make the timeRange prop optional for backward compatibility
}

// Sample data for 24-hour case volume with updated case values
const hourlyData = [
  { time: "00:00", cases: 76, efficiency: 65 },
  { time: "01:00", cases: 75, efficiency: 70 },
  { time: "02:00", cases: 75, efficiency: 75 },
  { time: "03:00", cases: 76, efficiency: 72 },
  { time: "04:00", cases: 77, efficiency: 68 },
  { time: "05:00", cases: 78, efficiency: 70 },
  { time: "06:00", cases: 80, efficiency: 75 },
  { time: "07:00", cases: 82, efficiency: 78 },
  { time: "08:00", cases: 85, efficiency: 80 },
  { time: "09:00", cases: 90, efficiency: 85 },
  { time: "10:00", cases: 93, efficiency: 90 },
  { time: "11:00", cases: 95, efficiency: 92 },
  { time: "12:00", cases: 94, efficiency: 88 },
  { time: "13:00", cases: 93, efficiency: 82 },
  { time: "14:00", cases: 90, efficiency: 80 },
  { time: "15:00", cases: 87, efficiency: 78 },
  { time: "16:00", cases: 85, efficiency: 75 },
  { time: "17:00", cases: 83, efficiency: 72 },
  { time: "18:00", cases: 81, efficiency: 70 },
  { time: "19:00", cases: 80, efficiency: 68 },
  { time: "20:00", cases: 79, efficiency: 65 },
  { time: "21:00", cases: 78, efficiency: 62 },
  { time: "22:00", cases: 77, efficiency: 60 },
  { time: "23:00", cases: 76, efficiency: 58 },
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

// Generate sample data for monthly view (30 days) with updated case values
const generateMonthlyData = () => {
  const monthlyData = [];
  
  // Generate data for 30 days with values between 525-665 (7 days × daily range 75-95)
  for (let i = 1; i <= 30; i++) {
    monthlyData.push({ 
      time: `Day ${i}`, 
      cases: Math.floor(Math.random() * 141) + 525,
      efficiency: Math.floor(Math.random() * 20) + 70 // Random efficiency between 70-90
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
      quarterlyData.push({
        time: `${month} W${week}`,
        cases: Math.floor(Math.random() * 141) + 525, // Weekly values between 525-665
        efficiency: Math.floor(Math.random() * 15) + 75 // Random efficiency between 75-90
      });
    }
  });
  
  return quarterlyData;
};

const weeklyData = generateWeeklyData();
const monthlyData = generateMonthlyData();
const quarterlyData = generateQuarterlyData();

export const DualLineChart: React.FC<DualLineChartProps> = ({ selectedSpecialties, timeRange = "Last 12 Months" }) => {
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
    
    const getRandomEfficiencyFactor = () => {
      // Create a different but consistent factor for efficiency
      const seed = (timeRange.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * 1.5) % 100;
      return 0.85 + (((seed % 30) / 30) * 0.3); // Factor between 0.85 and 1.15 (±15%)
    };
    
    // Apply the random factors to the data based on time range
    const caseFactor = getRandomFactor();
    const efficiencyFactor = getRandomEfficiencyFactor();
    
    const currentData = getChartData();
    const adjustedData = currentData.map(item => {
      let newCases: number;
      
      if (viewType === "daily" || viewType === "weekly") {
        // For daily/weekly views, ensure cases are between 75-95
        newCases = Math.max(75, Math.min(95, Math.round(item.cases * caseFactor)));
      } else {
        // For monthly/quarterly views, ensure values are between 525-665
        newCases = Math.max(525, Math.min(665, Math.round(item.cases * caseFactor)));
      }
      
      return {
        ...item,
        cases: newCases,
        efficiency: Math.min(100, Math.round(item.efficiency * efficiencyFactor)) // Cap at 100% efficiency
      };
    });
    
    setTimeBasedData(adjustedData);
  }, [timeRange, viewType]);
  
  // Effect to filter data when selected specialties change
  useEffect(() => {
    // Ensure selectedSpecialties is defined and has a length property
    const specialtiesArray = selectedSpecialties || [];
    
    // If no specialties are selected, show empty data
    if (specialtiesArray.length === 0) {
      setFilteredData([]);
      return;
    }
    
    // Filter data based on selected specialties
    // Apply a multiplier based on selected specialties to simulate filtering
    // More selected specialties = more data points with higher values
    const multiplier = specialtiesArray.length / 8; // 8 is the total number of specialties
    
    const newData = timeBasedData.map(item => ({
      ...item,
      cases: Math.round(item.cases * multiplier),
      efficiency: Math.min(100, Math.round(item.efficiency * (0.7 + 0.3 * multiplier))) // Efficiency is affected less
    }));
    
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

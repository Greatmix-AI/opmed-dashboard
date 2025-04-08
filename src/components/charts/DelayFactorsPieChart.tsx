
import React, { useState } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

interface DelayFactorsPieChartProps {
  selectedSpecialties: string[];
}

interface DelayFactorItem {
  label: string;
  percentage: number;
  color: string;
  description?: string;
}

const delayFactors: DelayFactorItem[] = [
  { 
    label: "Surgeon Late", 
    percentage: 35, 
    color: "#ECF2FE",
    description: "Delays due to surgeon tardiness or unavailability."
  },
  { 
    label: "Patient Factors", 
    percentage: 25, 
    color: "#D1EBD6",
    description: "Delays related to patient preparedness, late arrivals, or unexpected complications."
  },
  { 
    label: "Room Setup", 
    percentage: 15, 
    color: "#D0EAEE",
    description: "Delays caused by operating room setup and preparation issues."
  },
  { 
    label: "Anesthesia", 
    percentage: 15, 
    color: "#F9E5D1",
    description: "Delays related to anesthesia administration or anesthesiologist availability."
  },
  { 
    label: "Equipment", 
    percentage: 10, 
    color: "#F1F1DB",
    description: "Delays due to equipment unavailability, malfunction, or setup issues."
  }
];

export const DelayFactorsPieChart: React.FC<DelayFactorsPieChartProps> = ({ selectedSpecialties }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-md border border-gray-200 shadow-sm">
          <p className="font-medium">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
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
      <div className="text-sm text-[#0E3C48] p-3">Delay Factors Distribution</div>
      <div className="flex gap-8 items-center px-6 py-[30px]">
        <div className="relative w-[208px] h-[208px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={delayFactors}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                innerRadius={30}
                paddingAngle={2}
                dataKey="percentage"
                nameKey="label"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {delayFactors.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                    className="transition-opacity duration-300"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          {delayFactors.map((item, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <div 
                  className={`flex items-center gap-2 text-sm cursor-pointer ${
                    activeIndex === index ? "font-semibold" : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>
                    {item.label} ({item.percentage}%)
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex flex-col gap-2">
                  <h4 className="font-medium text-base">{item.label}</h4>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold">{item.percentage}%</span>
                  </div>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </div>
  );
};

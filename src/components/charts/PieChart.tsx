
import React, { useState, useEffect } from "react";
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

interface PieChartProps {
  selectedSpecialties: string[];
}

interface DistributionItem {
  label: string;
  percentage: number;
  color: string;
  description?: string;
}

const distributions: DistributionItem[] = [
  { 
    label: "General Surgery", 
    percentage: 30, 
    color: "#ECF2FE",
    description: "Includes appendectomy, cholecystectomy, hernia repair, and other common surgical procedures."
  },
  { 
    label: "Orthopedic Surgery", 
    percentage: 25, 
    color: "#D1EBD6",
    description: "Focuses on bones, joints, ligaments, tendons, muscles and nerves including knee replacements and fracture repairs."
  },
  { 
    label: "Urology", 
    percentage: 15, 
    color: "#D0EAEE",
    description: "Treats conditions involving the male and female urinary tract and the male reproductive organs."
  },
  { 
    label: "Gynecology", 
    percentage: 10, 
    color: "#F9E5D1",
    description: "Specializes in women's health, particularly the female reproductive system."
  },
  { 
    label: "Cardiac Surgery", 
    percentage: 8, 
    color: "#F1F1DB",
    description: "Includes procedures on the heart and great vessels performed by cardiac surgeons."
  },
  { 
    label: "Neurosurgery", 
    percentage: 5, 
    color: "#EBD8E7",
    description: "Involves the diagnosis and surgical treatment of disorders of the central and peripheral nervous system."
  },
  { 
    label: "Plastic Surgery", 
    percentage: 5, 
    color: "#C6D7FA",
    description: "Includes reconstructive and cosmetic procedures to restore, maintain, or enhance the body's appearance."
  },
  { 
    label: "Vascular Surgery", 
    percentage: 2, 
    color: "#FBE6E6",
    description: "Treats diseases of the vascular system, or arteries, veins and lymphatic circulation."
  },
];

export const PieChart: React.FC<PieChartProps> = ({ selectedSpecialties }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filteredDistributions, setFilteredDistributions] = useState<DistributionItem[]>([]);

  useEffect(() => {
    // If no specialties are selected or the array is undefined, show empty data
    if (!selectedSpecialties || selectedSpecialties.length === 0) {
      setFilteredDistributions([]);
      return;
    }

    // Filter the distributions based on selected specialties
    const filtered = distributions.filter(item => 
      selectedSpecialties.includes(item.label)
    );

    // Recalculate percentages based on the filtered total
    const totalPercentage = filtered.reduce((sum, item) => sum + item.percentage, 0);
    
    if (totalPercentage === 0) {
      setFilteredDistributions([]);
      return;
    }

    // Normalize percentages to total 100%
    const normalized = filtered.map(item => ({
      ...item,
      percentage: Math.round((item.percentage / totalPercentage) * 100)
    }));

    setFilteredDistributions(normalized);
  }, [selectedSpecialties]);

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
  if (!selectedSpecialties || selectedSpecialties.length === 0 || filteredDistributions.length === 0) {
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
      <div className="text-sm text-[#0E3C48] p-3">Case Volume Distribution</div>
      <div className="flex gap-8 items-center px-6 py-[30px]">
        <div className="relative w-[208px] h-[208px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={filteredDistributions}
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
                {filteredDistributions.map((entry, index) => (
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
          {filteredDistributions.map((item, index) => (
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

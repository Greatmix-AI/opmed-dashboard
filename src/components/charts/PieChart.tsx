import React from "react";

interface DistributionItem {
  label: string;
  percentage: number;
  color: string;
}

const distributions: DistributionItem[] = [
  { label: "General Surgery", percentage: 30, color: "#ECF2FE" },
  { label: "Orthopedic Surgery", percentage: 25, color: "#D1EBD6" },
  { label: "Urology", percentage: 15, color: "#D0EAEE" },
  { label: "Gynecology", percentage: 10, color: "#F9E5D1" },
  { label: "Cardiac Surgery", percentage: 8, color: "#F1F1DB" },
  { label: "Neurosurgery", percentage: 5, color: "#EBD8E7" },
  { label: "Plastic Surgery", percentage: 5, color: "#C6D7FA" },
  { label: "Vascular Surgery", percentage: 2, color: "#FBE6E6" },
];

export const PieChart: React.FC = () => {
  return (
    <div className="flex-1 bg-white rounded-md">
      <div className="text-sm text-[#0E3C48] p-3">Case Volume Distribution</div>
      <div className="flex gap-8 items-center px-6 py-[30px]">
        <div className="relative w-[208px] h-[208px]">
          {/* Placeholder for actual pie chart implementation */}
          <div className="w-full h-full rounded-full bg-[#F6F8F9]"></div>
        </div>
        <div className="flex flex-col gap-2">
          {distributions.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-1.5 h-1.5 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span>
                {item.label} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

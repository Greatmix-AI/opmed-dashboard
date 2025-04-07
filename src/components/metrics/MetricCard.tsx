import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    type: "increase" | "decrease";
  };
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex-1 flex flex-col shadow-[0px_4px_33px_rgba(0,0,0,0.04)] bg-white p-3 rounded-md",
        className,
      )}
    >
      <div className="text-xl font-extrabold text-[#0E3C48]">{value}</div>
      <div
        className={cn(
          "text-xs px-1.5 py-0.5 rounded-[90px] inline-flex w-fit",
          change.type === "increase"
            ? "text-[#439800] bg-[#E2FFCB]"
            : "text-red-500 bg-red-100",
        )}
      >
        {change.value}
      </div>
      <div className="text-sm text-[#A7A8AE]">{title}</div>
    </div>
  );
};

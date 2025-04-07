import React from "react";

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
        {/* Chart implementation would go here - using a charting library like recharts */}
        <div className="w-full h-[200px] bg-[#F6F8F9] rounded-md"></div>
      </div>
    </div>
  );
};

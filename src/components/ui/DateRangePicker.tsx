import React from "react";
import { Button } from "@/components/ui/button";

export const DateRangePicker: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        className="flex items-center gap-2 border text-xs font-semibold text-[#708090] bg-white px-2 py-1.5 rounded-md border-solid border-[#E6F3F4]"
      >
        <span>Mon, Dec 2 – Mon, Dec 16</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.93359 6.24349C1.93359 5.92132 2.11268 5.66016 2.33359 5.66016H13.6669C13.8878 5.66016 14.0669 5.92132 14.0669 6.24349C14.0669 6.56566 13.8878 6.82682 13.6669 6.82682H2.33359C2.11268 6.82682 1.93359 6.56566 1.93359 6.24349Z"
            fill="#0E3C48"
          />
        </svg>
      </Button>
    </div>
  );
};

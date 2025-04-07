import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterDropdownProps {
  label: string;
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  className,
}) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "flex justify-between items-center border text-xs text-[#708090] w-[180px] bg-white px-2 py-1.5 rounded-md border-solid border-[#E6F3F4]",
        className,
      )}
    >
      <span>{label}</span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5582 12.7604L10 12.1818L9.44176 12.7604C9.75007 13.0799 10.2499 13.0799 10.5582 12.7604Z"
          fill="#676879"
        />
      </svg>
    </Button>
  );
};

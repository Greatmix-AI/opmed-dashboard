
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface FilterDropdownProps {
  label: string;
  className?: string;
  options?: string[];
  selectedOptions?: string[];
  onSelectionChange?: (selected: string[]) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  className,
  options = [],
  selectedOptions = [],
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use specialties if no options are provided (for backward compatibility)
  const specialties = [
    "General Surgery",
    "Orthopedic Surgery",
    "Urology",
    "Gynecology",
    "Cardiac Surgery",
    "Neurosurgery",
    "Plastic Surgery",
    "Vascular Surgery",
  ];
  
  const actualOptions = options.length > 0 ? options : specialties;
  const selected = selectedOptions.length > 0 ? selectedOptions : [...actualOptions];

  const handleSelect = (specialty: string) => {
    if (!onSelectionChange) return;
    
    const newSelection = selected.includes(specialty) 
      ? selected.filter((item) => item !== specialty)
      : [...selected, specialty];
    
    onSelectionChange(newSelection);
  };

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    
    if (selected.length === actualOptions.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange([...actualOptions]);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex justify-between items-center border text-xs text-[#708090] w-[180px] bg-white px-2 py-1.5 rounded-md border-solid border-[#E6F3F4]",
            className,
          )}
        >
          <span>
            {selected.length === 0 
              ? label 
              : selected.length === actualOptions.length 
                ? "All specialties" 
                : `${selected.length} selected`}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px] bg-white border border-[#E6F3F4]">
        <DropdownMenuCheckboxItem
          checked={selected.length === actualOptions.length}
          onCheckedChange={handleSelectAll}
          className="font-medium"
        >
          {selected.length === actualOptions.length ? "Deselect all" : "Select all"}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {actualOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selected.includes(option)}
            onCheckedChange={() => handleSelect(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

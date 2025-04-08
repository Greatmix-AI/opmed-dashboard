import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
  
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([...specialties]);

  const handleSelect = (specialty: string) => {
    setSelectedSpecialties((prev) => 
      prev.includes(specialty) 
        ? prev.filter((item) => item !== specialty)
        : [...prev, specialty]
    );
  };

  const handleSelectAll = () => {
    if (selectedSpecialties.length === specialties.length) {
      setSelectedSpecialties([]);
    } else {
      setSelectedSpecialties([...specialties]);
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
            {selectedSpecialties.length === 0 
              ? label 
              : selectedSpecialties.length === specialties.length 
                ? "Select all" 
                : `${selectedSpecialties.length} selected`}
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5582 12.7604L10 12.1818L9.44176 12.7604C9.75007 13.0799 10.2499 13.0799 10.5582 12.7604Z"
              fill="#676879"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px] bg-white border border-[#E6F3F4]">
        <DropdownMenuCheckboxItem
          checked={selectedSpecialties.length === specialties.length}
          onCheckedChange={handleSelectAll}
          className="font-medium"
        >
          Select all
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {specialties.map((specialty) => (
          <DropdownMenuCheckboxItem
            key={specialty}
            checked={selectedSpecialties.includes(specialty)}
            onCheckedChange={() => handleSelect(specialty)}
          >
            {specialty}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

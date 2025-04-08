
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MetricCard } from "@/components/metrics/MetricCard";
import { LineChart } from "@/components/charts/LineChart";
import { PieChart } from "@/components/charts/PieChart";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { DelayFactorsPieChart } from "@/components/charts/DelayFactorsPieChart";
import { DualLineChart } from "@/components/charts/DualLineChart";
import { Separator } from "@/components/ui/separator";

const EfficiencyMetrics = () => {
  // Define the specialties array
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
  
  // Initialize the state for selected specialties with all specialties
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([...specialties]);
  
  // Handler for specialty selection changes
  const handleSpecialtyChange = (selected: string[]) => {
    setSelectedSpecialties(selected);
    console.log("Selected specialties changed:", selected);
  };

  return (
    <div className="flex w-full h-screen bg-[#F6F8F9]">
      <Sidebar />

      <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto">
        {/* Header Section */}
        <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-start">
          <div className="flex items-end gap-[30px]">
            <DateRangePicker />
          </div>
          <div className="flex gap-3 max-sm:flex-col max-sm:w-full">
            <FilterDropdown label="Last 12 months" />
            <FilterDropdown 
              label="Select specialities" 
              options={specialties}
              selectedOptions={selectedSpecialties}
              onSelectionChange={handleSpecialtyChange}
            />
            <FilterDropdown label="Select location" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="inline-flex gap-2 bg-[#BFD3D8] p-1 rounded-md w-fit">
          <a href="/" className="text-base text-[#0E3C48] cursor-pointer px-3.5 py-1 rounded-md">
            Executive Summary
          </a>
          <button className="text-base text-[#0E3C48] cursor-pointer px-3.5 py-1 rounded-md bg-white">
            Efficiency Metrics
          </button>
          <button className="text-base text-[#0E3C48] cursor-pointer px-3.5 py-1 rounded-md">
            Utilization & Scheduling
          </button>
          <button className="text-base text-[#0E3C48] cursor-pointer px-3.5 py-1 rounded-md">
            Prediction & Optimization
          </button>
        </div>

        {/* First Overview Section - Renamed to Efficiency Metrics */}
        <div className="bg-[#D7E4E8] px-3 py-2 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-base font-extrabold text-[#0E3C48]">
              Efficiency Metrics
            </h1>
          </div>

          {/* Metrics Grid */}
          <div className="flex gap-3 mb-3 max-md:flex-wrap max-sm:flex-col">
            <MetricCard
              title="Efficiency Rate"
              value="82%"
              change={{ value: "+5.3%", type: "increase" }}
            />
            <MetricCard
              title="Average Treatment Time"
              value="45 mins"
              change={{ value: "-8.1%", type: "increase" }}
            />
            <MetricCard
              title="Resource Utilization"
              value="79%"
              change={{ value: "+2.8%", type: "increase" }}
            />
            <MetricCard
              title="Cost per Treatment"
              value="$125"
              change={{ value: "-3.7%", type: "increase" }}
            />
          </div>
          
          {/* Divider after metrics */}
          <Separator className="my-3 bg-[#BFD3D8]" />

          {/* Charts */}
          <div className="flex gap-3 max-md:flex-col">
            <div className="flex-1 bg-white rounded-md">
              <LineChart selectedSpecialties={selectedSpecialties} />
            </div>
            <PieChart selectedSpecialties={selectedSpecialties} />
          </div>
        </div>

        {/* Second Section */}
        <div className="bg-[#D7E4E8] px-3 py-2 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-base font-extrabold text-[#0E3C48]">
              Time & Resource Analysis
            </h1>
          </div>

          {/* Updated KPIs */}
          <div className="flex gap-3 mb-3 max-md:flex-wrap max-sm:flex-col">
            <MetricCard
              title="Resource Allocation Rate"
              value="85%"
              change={{ value: "+3.5%", type: "increase" }}
            />
            <MetricCard
              title="Processing Time"
              value="28 mins"
              change={{ value: "-4.2 mins", type: "decrease" }}
            />
          </div>
          
          {/* Divider after metrics */}
          <Separator className="my-3 bg-[#BFD3D8]" />

          {/* Charts */}
          <div className="flex gap-3 max-md:flex-col">
            <div className="flex-1 bg-white rounded-md">
              <DualLineChart selectedSpecialties={selectedSpecialties} />
            </div>
            <DelayFactorsPieChart selectedSpecialties={selectedSpecialties} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyMetrics;

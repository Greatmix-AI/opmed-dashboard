
import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MetricCard } from "@/components/metrics/MetricCard";
import { LineChart } from "@/components/charts/LineChart";
import { PieChart } from "@/components/charts/PieChart";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { DelayFactorsPieChart } from "@/components/charts/DelayFactorsPieChart";
import { DualLineChart } from "@/components/charts/DualLineChart";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface MetricData {
  efficiencyRate: number;
  avgTreatmentTime: number;
  resourceUtilization: number;
  costPerTreatment: number;
  resourceAllocationRate: number;
  processingTime: number;
}

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
  
  // Initialize time range state
  const [timeRange, setTimeRange] = useState<string>("Last 12 Months");
  
  // Initialize state for metrics data
  const [metricsData, setMetricsData] = useState<MetricData>({
    efficiencyRate: 82,
    avgTreatmentTime: 45,
    resourceUtilization: 79,
    costPerTreatment: 125,
    resourceAllocationRate: 85,
    processingTime: 28
  });

  // Changes from previous period (%)
  const [metricChanges, setMetricChanges] = useState({
    efficiencyRate: 5.3,
    avgTreatmentTime: -8.1,
    resourceUtilization: 2.8,
    costPerTreatment: -3.7,
    resourceAllocationRate: 3.5,
    processingTime: -4.2
  });
  
  // Handler for specialty selection changes
  const handleSpecialtyChange = (selected: string[]) => {
    setSelectedSpecialties(selected);
    console.log("Selected specialties changed:", selected);
    
    // Update the metrics data based on both specialty and time range
    generateMetricsForSpecialtiesAndTimeRange(selected, timeRange);
  };

  // Handler for time range changes
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    console.log("Time range changed:", value);
    
    // Generate new data based on the time range and currently selected specialties
    generateMetricsForSpecialtiesAndTimeRange(selectedSpecialties, value);
  };

  // Function to generate metrics based on selected specialties and time range
  const generateMetricsForSpecialtiesAndTimeRange = (
    selectedSpecialtiesList: string[], 
    selectedTimeRange: string
  ) => {
    // Base values (reference values)
    const baseMetrics = {
      efficiencyRate: 82,
      avgTreatmentTime: 45,
      resourceUtilization: 79,
      costPerTreatment: 125,
      resourceAllocationRate: 85,
      processingTime: 28
    };
    
    // No specialties selected - show zeros
    if (selectedSpecialtiesList.length === 0) {
      const emptyMetrics = {
        efficiencyRate: 0,
        avgTreatmentTime: 0,
        resourceUtilization: 0,
        costPerTreatment: 0,
        resourceAllocationRate: 0,
        processingTime: 0
      };
      
      setMetricsData(emptyMetrics);
      setMetricChanges({
        efficiencyRate: 0,
        avgTreatmentTime: 0,
        resourceUtilization: 0,
        costPerTreatment: 0,
        resourceAllocationRate: 0,
        processingTime: 0
      });
      return;
    }
    
    // Generate variation factors based on time range
    let timeVariationSeed: number;
    
    switch(selectedTimeRange) {
      case "Last 30 Days":
        timeVariationSeed = 0.10; // 10% variation
        break;
      case "Last 3 Months":
        timeVariationSeed = 0.12; // 12% variation
        break;
      case "Last 6 Months":
        timeVariationSeed = 0.15; // 15% variation
        break;
      case "Year to Date":
        timeVariationSeed = 0.18; // 18% variation
        break;
      case "Custom Range":
        timeVariationSeed = 0.14; // 14% variation for custom range
        break;
      default: // "Last 12 Months" is our base case
        timeVariationSeed = 0.05; // 5% variation
    }
    
    // Apply specialty factor - more specialties means better efficiency
    // Calculate specialty factor based on selected specialties
    const specialtyFactor = selectedSpecialtiesList.length / specialties.length;
    
    // Apply specialty-specific variations (each specialty contributes differently)
    const getSpecialtyVariation = (specialtyName: string): number => {
      // Create a deterministic but different factor for each specialty
      const specialtyHash = specialtyName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100;
      return 0.85 + ((specialtyHash / 100) * 0.3); // Factor between 0.85 and 1.15 (±15%)
    };
    
    // Calculate average specialty variation factor from selected specialties
    const averageSpecialtyVariation = selectedSpecialtiesList.length > 0
      ? selectedSpecialtiesList.reduce((sum, specialty) => sum + getSpecialtyVariation(specialty), 0) / selectedSpecialtiesList.length
      : 1;
    
    // Apply random variations within the constraint - between 5% and 20% based on time range and specialties
    const applyVariation = (base: number, timeSeed: number, specialtyFactor: number, specialtyVariation: number): number => {
      // Combine time and specialty factors for overall variation
      const combinedVariationFactor = timeSeed * specialtyFactor * specialtyVariation;
      
      // Ensure variation is at least 5% but no more than 20%
      const boundedVariation = Math.max(0.05, Math.min(0.20, combinedVariationFactor));
      
      // Apply random variation within bounded range
      const randomDirection = Math.random() > 0.5 ? 1 : -1;
      const actualVariation = 1 + (boundedVariation * randomDirection);
      
      return Math.round((base * actualVariation) * 10) / 10; // Round to 1 decimal place
    };
    
    // Apply variations to all metrics
    const newMetrics = {
      efficiencyRate: Math.min(100, applyVariation(baseMetrics.efficiencyRate, timeVariationSeed, specialtyFactor, averageSpecialtyVariation)),
      avgTreatmentTime: applyVariation(baseMetrics.avgTreatmentTime, timeVariationSeed, 1/specialtyFactor, averageSpecialtyVariation), // Inverse relationship with specialties
      resourceUtilization: Math.min(100, applyVariation(baseMetrics.resourceUtilization, timeVariationSeed, specialtyFactor, averageSpecialtyVariation)),
      costPerTreatment: applyVariation(baseMetrics.costPerTreatment, timeVariationSeed, 1/specialtyFactor, averageSpecialtyVariation), // Inverse relationship with specialties
      resourceAllocationRate: Math.min(100, applyVariation(baseMetrics.resourceAllocationRate, timeVariationSeed, specialtyFactor, averageSpecialtyVariation)),
      processingTime: applyVariation(baseMetrics.processingTime, timeVariationSeed, 1/specialtyFactor, averageSpecialtyVariation) // Inverse relationship with specialties
    };
    
    // Generate changes compared to previous period with consistent direction
    const generateChange = (newValue: number, baseValue: number, inverse: boolean = false): number => {
      let changeDirection = newValue > baseValue ? 1 : -1;
      if (inverse) changeDirection *= -1; // For metrics where lower is better
      // Random change between 2-6% in the appropriate direction
      return changeDirection * (Math.random() * 4 + 2);
    };
    
    const newChanges = {
      efficiencyRate: generateChange(newMetrics.efficiencyRate, baseMetrics.efficiencyRate),
      avgTreatmentTime: generateChange(newMetrics.avgTreatmentTime, baseMetrics.avgTreatmentTime, true), // Inverse: lower is better
      resourceUtilization: generateChange(newMetrics.resourceUtilization, baseMetrics.resourceUtilization),
      costPerTreatment: generateChange(newMetrics.costPerTreatment, baseMetrics.costPerTreatment, true), // Inverse: lower is better
      resourceAllocationRate: generateChange(newMetrics.resourceAllocationRate, baseMetrics.resourceAllocationRate),
      processingTime: generateChange(newMetrics.processingTime, baseMetrics.processingTime, true) // Inverse: lower is better
    };
    
    setMetricsData(newMetrics);
    setMetricChanges(newChanges);
  };
  
  // Generate initial metrics data on mount
  useEffect(() => {
    generateMetricsForSpecialtiesAndTimeRange(selectedSpecialties, timeRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full h-screen bg-[#F6F8F9]">
      <Sidebar />

      <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto">
        {/* Header Section */}
        <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-start">
          <div className="flex items-end gap-[30px] w-full">
            <div className="w-64">
              <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                <SelectTrigger className="w-full border text-xs font-semibold text-[#708090] bg-white px-2 py-1.5 rounded-md border-solid border-[#E6F3F4]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                  <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                  <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                  <SelectItem value="Last 12 Months">Last 12 Months</SelectItem>
                  <SelectItem value="Year to Date">Year to Date</SelectItem>
                  <SelectItem value="Custom Range">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {timeRange === "Custom Range" && <DateRangePicker />}
          </div>
          <div className="flex gap-3 max-sm:flex-col max-sm:w-full">
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
          <Link to="/" className="text-base text-[#0E3C48] cursor-pointer px-3.5 py-1 rounded-md">
            Executive Summary
          </Link>
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
              value={`${metricsData.efficiencyRate}%`}
              change={{ value: `${metricChanges.efficiencyRate.toFixed(1)}%`, type: metricChanges.efficiencyRate > 0 ? "increase" : "decrease" }}
            />
            <MetricCard
              title="Average Treatment Time"
              value={`${metricsData.avgTreatmentTime} mins`}
              change={{ value: `${Math.abs(metricChanges.avgTreatmentTime).toFixed(1)}%`, type: metricChanges.avgTreatmentTime < 0 ? "increase" : "decrease" }}
            />
            <MetricCard
              title="Resource Utilization"
              value={`${metricsData.resourceUtilization}%`}
              change={{ value: `${metricChanges.resourceUtilization.toFixed(1)}%`, type: metricChanges.resourceUtilization > 0 ? "increase" : "decrease" }}
            />
            <MetricCard
              title="Cost per Treatment"
              value={`$${metricsData.costPerTreatment}`}
              change={{ value: `${Math.abs(metricChanges.costPerTreatment).toFixed(1)}%`, type: metricChanges.costPerTreatment < 0 ? "increase" : "decrease" }}
            />
          </div>
          
          {/* Divider after metrics */}
          <Separator className="my-3 bg-[#BFD3D8]" />

          {/* Charts */}
          <div className="flex gap-3 max-md:flex-col">
            <div className="flex-1 bg-white rounded-md">
              <LineChart selectedSpecialties={selectedSpecialties} timeRange={timeRange} />
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
              value={`${metricsData.resourceAllocationRate}%`}
              change={{ value: `${metricChanges.resourceAllocationRate.toFixed(1)}%`, type: metricChanges.resourceAllocationRate > 0 ? "increase" : "decrease" }}
            />
            <MetricCard
              title="Processing Time"
              value={`${metricsData.processingTime} mins`}
              change={{ value: `${Math.abs(metricChanges.processingTime).toFixed(1)} mins`, type: metricChanges.processingTime < 0 ? "decrease" : "increase" }}
            />
          </div>
          
          {/* Divider after metrics */}
          <Separator className="my-3 bg-[#BFD3D8]" />

          {/* Charts */}
          <div className="flex gap-3 max-md:flex-col">
            <div className="flex-1 bg-white rounded-md">
              <DualLineChart selectedSpecialties={selectedSpecialties} timeRange={timeRange} />
            </div>
            <DelayFactorsPieChart selectedSpecialties={selectedSpecialties} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyMetrics;

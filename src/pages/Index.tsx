
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MetricCard } from "@/components/metrics/MetricCard";
import { LineChart } from "@/components/charts/LineChart";
import { PieChart } from "@/components/charts/PieChart";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { OperatingRoomSchedule } from "@/components/schedule/OperatingRoomSchedule";
import { DelayFactorsPieChart } from "@/components/charts/DelayFactorsPieChart";
import { DualLineChart } from "@/components/charts/DualLineChart";

const Index = () => {
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
            <FilterDropdown label="Select specialities" />
            <FilterDropdown label="Select location" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 bg-[#BFD3D8] p-1 rounded-md">
          <button className="text-base text-[#0E3C48] cursor-pointer px-3.5 py-1 rounded-md bg-white">
            Executive Summary
          </button>
          <button className="text-base text-[#0E3C48] cursor-pointer px-3.5 py-1 rounded-md">
            Efficiency Metrics
          </button>
          <button className="text-base text-[#0E3C48] cursor-pointer px-3.5 py-1 rounded-md">
            Utilization & Scheduling
          </button>
          <button className="text-base text-[#0E3C48] cursor-pointer px-3.5 py-1 rounded-md">
            Prediction & Optimization
          </button>
        </div>

        {/* First Overview Section */}
        <div className="bg-[#D7E4E8] px-3 py-2 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-base font-extrabold text-[#0E3C48]">
              Overview
            </h1>
            <div className="flex bg-[#BFD3D8] p-1 rounded-md">
              <button className="text-sm text-[#0E3C48] cursor-pointer px-3 py-0.5 rounded-md bg-white">
                Patients
              </button>
              <button className="text-sm text-[#0E3C48] cursor-pointer px-3 py-0.5 rounded-md">
                Therapists
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="flex gap-3 mb-3 max-md:flex-wrap max-sm:flex-col">
            <MetricCard
              title="Case Volume"
              value="3"
              change={{ value: "+12.5%", type: "increase" }}
            />
            <MetricCard
              title="Case Minutes"
              value="4,089,012"
              change={{ value: "+8.3%", type: "increase" }}
            />
            <MetricCard
              title="Staffed-Room Utilization"
              value="76%"
              change={{ value: "+3.2%", type: "increase" }}
            />
            <MetricCard
              title="Block Utilization"
              value="70%"
              change={{ value: "+4.1%", type: "increase" }}
            />
          </div>

          {/* Charts */}
          <div className="flex gap-3 max-md:flex-col">
            <LineChart />
            <PieChart />
          </div>
        </div>

        {/* Duplicated Overview Section with Updated Charts */}
        <div className="bg-[#D7E4E8] px-3 py-2 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-base font-extrabold text-[#0E3C48]">
              Overview
            </h1>
            <div className="flex bg-[#BFD3D8] p-1 rounded-md">
              <button className="text-sm text-[#0E3C48] cursor-pointer px-3 py-0.5 rounded-md bg-white">
                Patients
              </button>
              <button className="text-sm text-[#0E3C48] cursor-pointer px-3 py-0.5 rounded-md">
                Therapists
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="flex gap-3 mb-3 max-md:flex-wrap max-sm:flex-col">
            <MetricCard
              title="Case Volume"
              value="3"
              change={{ value: "+12.5%", type: "increase" }}
            />
            <MetricCard
              title="Case Minutes"
              value="4,089,012"
              change={{ value: "+8.3%", type: "increase" }}
            />
            <MetricCard
              title="Staffed-Room Utilization"
              value="76%"
              change={{ value: "+3.2%", type: "increase" }}
            />
            <MetricCard
              title="Block Utilization"
              value="70%"
              change={{ value: "+4.1%", type: "increase" }}
            />
          </div>

          {/* Updated Charts */}
          <div className="flex gap-3 max-md:flex-col">
            <DualLineChart />
            <DelayFactorsPieChart />
          </div>
        </div>

        {/* Operating Room Schedule Section */}
        <OperatingRoomSchedule />
      </div>
    </div>
  );
};

export default Index;


import React from "react";
import { Clock, Calendar, CalendarCheck, ArrowRight } from "lucide-react";

interface RoomCardProps {
  roomNumber: string;
  status: "open" | "closed" | "booked";
  timeRange?: string;
  booked?: {
    name: string;
    procedure: string;
  };
}

const RoomCard: React.FC<RoomCardProps> = ({ roomNumber, status, timeRange, booked }) => {
  const getStatusColor = () => {
    switch(status) {
      case "open": return "bg-[#D1EBD6]";
      case "closed": return "bg-[#FBE6E6]";
      case "booked": return "bg-[#ECF2FE]";
      default: return "bg-gray-200";
    }
  };

  const getStatusText = () => {
    switch(status) {
      case "open": return "Open";
      case "closed": return "Closed";
      case "booked": return "Booked";
      default: return "";
    }
  };

  return (
    <div className={`rounded-lg ${getStatusColor()} p-3 flex flex-col h-[140px] shadow-sm`}>
      <div className="flex justify-between items-start mb-3">
        <div className="text-lg font-medium text-[#0E3C48]">Room {roomNumber}</div>
        <div className="text-sm font-medium">{getStatusText()}</div>
      </div>
      {status === "open" && (
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center gap-2 text-sm text-[#0E3C48]">
            <Clock size={16} />
            <span>{timeRange}</span>
          </div>
          <div className="flex justify-end">
            <button className="text-[#0E3C48] text-sm font-medium flex items-center gap-1 hover:underline">
              Book now
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
      {status === "closed" && (
        <div className="flex flex-col h-full justify-center">
          <div className="text-sm text-[#0E3C48]">
            Not available for scheduling
          </div>
        </div>
      )}
      {status === "booked" && booked && (
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center gap-2 text-sm text-[#0E3C48]">
            <Clock size={16} />
            <span>{timeRange}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium text-[#0E3C48]">{booked.name}</div>
            <div className="text-xs text-[#0E3C48]/70">{booked.procedure}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const TimeCard: React.FC<{ 
  title: string; 
  time: string; 
  secondary?: string;
  icon: React.ReactNode;
}> = ({ title, time, secondary, icon }) => {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm">
      <div className="p-2 bg-[#D7E4E8] rounded-lg">
        {icon}
      </div>
      <div className="flex flex-col">
        <div className="text-xs text-[#0E3C48]/70">{title}</div>
        <div className="text-lg font-medium text-[#0E3C48]">{time}</div>
        {secondary && <div className="text-xs text-[#0E3C48]/70">{secondary}</div>}
      </div>
    </div>
  );
};

export const OperatingRoomSchedule: React.FC = () => {
  const rooms: RoomCardProps[] = [
    {
      roomNumber: "1",
      status: "booked",
      timeRange: "08:00 - 12:00",
      booked: {
        name: "Dr. Sarah Johnson",
        procedure: "Orthopedic Surgery"
      }
    },
    {
      roomNumber: "2",
      status: "open",
      timeRange: "09:00 - 17:00"
    },
    {
      roomNumber: "3",
      status: "closed"
    },
    {
      roomNumber: "4",
      status: "booked",
      timeRange: "13:00 - 15:30",
      booked: {
        name: "Dr. Michael Chen",
        procedure: "General Surgery"
      }
    },
    {
      roomNumber: "5",
      status: "open",
      timeRange: "10:00 - 16:00"
    }
  ];

  return (
    <div className="bg-[#D7E4E8] px-3 py-2 rounded-xl mt-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-base font-extrabold text-[#0E3C48]">
          Operating Room Schedule
        </h1>
        <div className="flex items-center gap-2">
          <button className="bg-white text-[#0E3C48] text-xs px-3 py-1 rounded-md">
            Today
          </button>
          <button className="text-[#0E3C48] text-xs px-3 py-1 rounded-md">
            Tomorrow
          </button>
          <button className="text-[#0E3C48] text-xs px-3 py-1 rounded-md">
            Next Week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        {rooms.map((room, index) => (
          <RoomCard 
            key={index}
            roomNumber={room.roomNumber}
            status={room.status}
            timeRange={room.timeRange}
            booked={room.booked}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <TimeCard 
          title="Average Turnover Time" 
          time="37 min"
          secondary="↓ 5 min from last month"
          icon={<Clock size={20} className="text-[#0E3C48]" />}
        />
        <TimeCard 
          title="On-Time Start Rate" 
          time="84%"
          secondary="↑ 3% from last month"
          icon={<Calendar size={20} className="text-[#0E3C48]" />}
        />
        <TimeCard 
          title="Utilization Rate" 
          time="76%"
          secondary="↑ 2% from last month"
          icon={<CalendarCheck size={20} className="text-[#0E3C48]" />}
        />
      </div>
    </div>
  );
};

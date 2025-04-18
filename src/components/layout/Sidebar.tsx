
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  BarChart2, 
  Calendar, 
  Settings, 
  LineChart, 
  PieChart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col items-center relative bg-[#0E3C48] transition-all duration-300",
        expanded ? "w-64" : "w-[74px]",
        className,
      )}
    >
      <div className="mb-8 mt-6">
        <div className="cursor-pointer">
          <svg
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0791 5.19395C14.2229 5.19395 13.394 5.30118 12.5996 5.50154C12.5566 5.26126 12.3484 5.08203 12.094 5.08203C11.8107 5.08203 11.5782 5.309 11.5782 5.58998C11.5782 5.66512 11.597 5.73713 11.6236 5.79896C11.3802 5.88975 11.1423 5.98914 10.9067 6.09559C10.8535 5.86861 10.65 5.69956 10.4066 5.69956C10.1201 5.69956 9.8908 5.92653 9.8908 6.21064C9.8908 6.34135 9.94167 6.45953 10.0246 6.54719C9.70374 6.73425 9.3938 6.93539 9.09639 7.15454C9.05334 6.91426 8.84202 6.7319 8.58843 6.7319C8.30511 6.7319 8.075 6.95887 8.075 7.24298C8.075 7.45665 8.20884 7.64136 8.39824 7.7165C8.14936 7.93564 7.90908 8.1681 7.68132 8.41151C7.59288 8.25106 7.4246 8.14149 7.22972 8.14149C6.94326 8.14149 6.71394 8.36846 6.71394 8.64944C6.71394 8.87641 6.86343 9.06425 7.06692 9.13391C6.82117 9.44933 6.59341 9.77805 6.38522 10.1232C6.30226 10.0669 6.20051 10.0324 6.09094 10.0324C5.80761 10.0324 5.57516 10.2594 5.57516 10.5435C5.57516 10.7603 5.71447 10.945 5.90936 11.017C5.79978 11.2471 5.70038 11.4827 5.60959 11.7206C5.53994 11.6862 5.46245 11.6643 5.37714 11.6643C5.09381 11.6643 4.86371 11.8913 4.86371 12.1722C4.86371 12.4266 5.05077 12.6348 5.29731 12.6747C5.22765 12.9205 5.16895 13.167 5.12121 13.4206C5.0946 13.4151 5.06799 13.4128 5.04059 13.4128C4.75727 13.4128 4.52481 13.6397 4.52481 13.9207C4.52481 14.1829 4.72283 14.3942 4.97641 14.4263C4.95215 14.6619 4.94198 14.9022 4.9365 15.1432H4.92867C4.64534 15.1432 4.41211 15.3734 4.41211 15.6543C4.41211 15.9353 4.64456 16.1654 4.92867 16.1654C4.93963 16.1654 4.9498 16.1631 4.96076 16.1631C4.97954 16.4198 5.00615 16.6788 5.04372 16.9309C4.78701 16.9606 4.58664 17.1743 4.58664 17.4365C4.58664 17.7174 4.81675 17.9476 5.10008 17.9476C5.15095 17.9476 5.19869 17.9366 5.24487 17.9233C5.31453 18.1933 5.39436 18.4579 5.4828 18.7177C5.24487 18.7607 5.06329 18.9689 5.06329 19.2178C5.06329 19.5012 5.2934 19.7289 5.57672 19.7289C5.68082 19.7289 5.77474 19.6992 5.85457 19.6483C5.97197 19.9081 6.10346 20.1617 6.24199 20.4075C6.04398 20.4795 5.90466 20.6665 5.90466 20.8865C5.90466 21.1675 6.13477 21.3944 6.41809 21.3944C6.55741 21.3944 6.68029 21.3412 6.77342 21.2551C6.92291 21.4664 7.07866 21.6778 7.24381 21.8781C7.04344 21.9478 6.89865 22.1348 6.89865 22.3571C6.89865 22.6381 7.12876 22.8682 7.41443 22.8682C7.61792 22.8682 7.79168 22.7508 7.87464 22.5794C8.09379 22.8017 8.32389 23.013 8.56182 23.2134C8.43112 23.3041 8.34268 23.4568 8.34268 23.6282C8.34268 23.9091 8.57513 24.1392 8.85845 24.1392C9.0776 24.1392 9.26466 23.9999 9.3398 23.8074C9.61764 23.9999 9.90645 24.1792 10.2039 24.342C10.1052 24.4359 10.0434 24.5642 10.0434 24.7114C10.0434 24.9924 10.2735 25.2193 10.5568 25.2193C10.8245 25.2193 11.0382 25.0213 11.0679 24.7646C11.3192 24.8742 11.579 24.9704 11.8404 25.0612C11.8216 25.1121 11.8107 25.163 11.8107 25.2193C11.8107 25.5027 12.0408 25.7304 12.3265 25.7304C12.5699 25.7304 12.7702 25.5645 12.8266 25.3399C13.5513 25.5027 14.3027 25.5942 15.0783 25.5942C20.6815 25.5942 25.228 21.0289 25.228 15.3968C25.228 9.76474 20.6815 5.1963 15.0783 5.1963L15.0791 5.19395Z"
              fill="#2EBDCC"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <NavButton 
          icon={<Menu />} 
          label="Dashboard" 
          expanded={expanded}
          isActive={true}
        />
        <NavButton 
          icon={<BarChart2 />} 
          label="Performance" 
          expanded={expanded} 
        />
        <NavButton 
          icon={<Calendar />} 
          label="Schedule" 
          expanded={expanded} 
        />
        <NavButton 
          icon={<Settings />} 
          label="Settings" 
          expanded={expanded} 
        />
        <NavButton 
          icon={<LineChart />} 
          label="Analytics" 
          expanded={expanded} 
        />
        <NavButton 
          icon={<PieChart />} 
          label="Reports" 
          expanded={expanded} 
        />
      </div>
      <div className="flex flex-col gap-4 w-full items-center mb-6">
        <div className="flex flex-col items-center justify-center h-[52px] w-full px-3">
          {expanded ? (
            <div className="flex items-center justify-center w-full bg-[#175A63] rounded-lg p-3">
              <span className="text-[#E6F3F4] text-sm">Health System</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[52px] text-[#E6F3F4] text-sm bg-[#175A63] p-1 rounded-lg w-12">
              <span>GMC</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-center items-center h-[52.5px] w-[52.5px] cursor-pointer p-4 rounded-lg">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path
              d="M10.416 13.875C8.69102 13.875 7.29102 12.475 7.29102 10.75C7.29102 9.025 8.69102 7.625 10.416 7.625C12.141 7.625 13.541 9.025 13.541 10.75C13.541 12.475 12.141 13.875 10.416 13.875Z"
              fill="#E6F3F4"
            />
          </svg>
        </div>
        <div className="flex justify-center bg-[#175A63] p-1 rounded-[30px]">
          <div className="w-10 h-10 flex items-center justify-center bg-[#B6FF7D] rounded-full">
            <span className="text-[#0E3C48] font-bold">DI</span>
          </div>
        </div>
      </div>
      <button 
        className="absolute w-8 h-8 flex justify-center items-center bg-[#0E3C48] rounded-[27px] -right-4 top-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <ChevronLeft size={16} className="text-[#68A1BD]" />
        ) : (
          <ChevronRight size={16} className="text-[#68A1BD]" />
        )}
      </button>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  isActive?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, expanded, isActive = false }) => {
  return (
    <div 
      className={cn(
        "flex items-center cursor-pointer rounded-lg transition-colors",
        expanded ? "w-[calc(100%-24px)] px-4 py-3" : "justify-center w-[52.5px] p-4",
        isActive ? "bg-[#175A63]" : "hover:bg-[#175A63]"
      )}
    >
      <div className="text-[#E6F3F4]">{icon}</div>
      {expanded && (
        <span className="text-[#E6F3F4] ml-3 whitespace-nowrap">{label}</span>
      )}
    </div>
  );
};

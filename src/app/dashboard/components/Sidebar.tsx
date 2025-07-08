import React from "react";

type SidebarProps = {
  onSelect: (section: string) => void;
  selected: string;
};

const Sidebar: React.FC<SidebarProps> = ({ onSelect, selected }) => (
  <aside className="w-[250px] bg-white shadow-md p-6 flex flex-col">
    <div className="flex items-center gap-2 mb-8">
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
        <span className="text-lg font-semibold">J</span>
      </div>
      <span className="font-medium text-lg">John</span>
    </div>
    <nav className="flex flex-col gap-4 text-sm">
      <a onClick={() => onSelect("dashboard")} className={`${selected === "dashboard" ? "font-bold" : "text-[#777]"} cursor-pointer`}>Dashboard</a>
      <a onClick={() => onSelect("offers")} className={`${selected === "offers" ? "font-bold" : "text-[#777]"} cursor-pointer`}>Offers</a>
      <a onClick={() => onSelect("notifications")} className={`${selected === "notifications" ? "font-bold" : "text-[#777]"} cursor-pointer`}>Notification</a>
      <a onClick={() => onSelect("policies")} className={`${selected === "policies" ? "font-bold" : "text-[#777]"} cursor-pointer`}>Policies & Agreements</a>
      <a onClick={() => onSelect("help")} className={`${selected === "help" ? "font-bold" : "text-[#777]"} cursor-pointer`}>Help & Support</a>
      <a onClick={() => onSelect("profile")} className={`${selected === "profile" ? "font-bold" : "text-[#777]"} cursor-pointer`}>Profile</a>
    </nav>
  </aside>
);

export default Sidebar;
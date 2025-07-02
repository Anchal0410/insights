import { useState } from "react";
import { Plus } from "lucide-react";
const BottomTab = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    console.log(`Tab clicked: ${tab}`);
  };
  const handleButtonClick = (action: string) => {
    console.log(`Button clicked: ${action}`);
  };
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center space-x-6">
        {["All Orders", "Pending", "Reviewed", "Arrived"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`py-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === tab
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => handleButtonClick("Add new tab")}
          className="w-6 h-6 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-gray-400"
        >
          <Plus className="w-3 h-3 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default BottomTab;

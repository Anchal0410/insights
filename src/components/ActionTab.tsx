import { Plus } from "lucide-react";
const ActionTab = () => {
  const handleButtonClick = (action: string) => {
    console.log(`Button clicked: ${action}`);
  };
  return (
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
      <div className="flex items-center space-x-2">
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 border border-blue-100">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Q3 Financial Overview</span>
          <button className="text-blue-400 hover:text-blue-600">
            <span className="text-xs">✕</span>
          </button>
        </div>
        <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 border border-green-100">
          <span className="font-bold">ABC</span>
          <span className="text-xs bg-green-100 px-1.5 py-0.5 rounded">
            123
          </span>
        </div>
        <div className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium border border-purple-100">
          Answer a question
        </div>
        <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium border border-orange-100">
          Extract
        </div>
        <button
          onClick={() => handleButtonClick("Add new tab")}
          className="w-8 h-8 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400"
        >
          <Plus className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default ActionTab;

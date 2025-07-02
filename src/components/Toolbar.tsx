import {
  ChevronDown,
  Plus,
  EyeOff,
  ArrowUpDown,
  Filter,
  ExternalLink,
  Upload,
  Share,
} from "lucide-react";

const Toolbar = () => {
  const handleButtonClick = (action: string) => {
    console.log(`Button clicked: ${action}`);
  };
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>Tool bar</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <button
            onClick={() => handleButtonClick("Hide fields")}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <EyeOff className="w-4 h-4" />
            <span>Hide fields</span>
          </button>
          <button
            onClick={() => handleButtonClick("Sort")}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort</span>
          </button>
          <button
            onClick={() => handleButtonClick("Filter")}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button
            onClick={() => handleButtonClick("Cell view")}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <span>Cell view</span>
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleButtonClick("Import")}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button
            onClick={() => handleButtonClick("Export")}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => handleButtonClick("Share")}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            onClick={() => handleButtonClick("New Action")}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>New Action</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;

import { ChevronDown, Search, Bell, MoreHorizontal } from "lucide-react";
export default function Spreadsheet() {
  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span>Workspace</span>
            <ChevronDown className="w-4 h-4" />
            <span>Folder 2</span>
            <ChevronDown className="w-4 h-4" />
            <span className="font-medium text-gray-900">Spreadsheet 3</span>
            <MoreHorizontal className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search within sheet"
                className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">2</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                  className="rounded-full"
                />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">John Doe</div>
                <div className="text-gray-500 text-xs">john.doe...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  Bell,
  User,
  Plus,
  EyeOff,
  ArrowUpDown,
  Filter,
  ExternalLink,
  Upload,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { spreadsheetData } from "../constants/data";

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "In-process":
      return "bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1";
    case "Need to start":
      return "bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1";
    case "Complete":
      return "bg-green-50 text-green-700 border border-green-200 px-3 py-1";
    case "Blocked":
      return "bg-red-50 text-red-700 border border-red-200 px-3 py-1";
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "text-red-600";
    case "Medium":
      return "text-yellow-600";
    case "Low":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};

export default function SpreadsheetApp() {
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>({ row: 1, col: 0 });
  const [activeTab, setActiveTab] = useState("All Orders");
  const [isResizing, setIsResizing] = useState<number | null>(null);
  const [columnWidths, setColumnWidths] = useState([
    48, 288, 128, 128, 144, 144, 144, 96, 128, 128,
  ]);

  const columns = [
    "id",
    "jobRequest",
    "submitted",
    "status",
    "submitter",
    "url",
    "assigned",
    "priority",
    "dueDate",
    "estValue",
  ];

  const totalRows = spreadsheetData.length + 20;
  const totalCols = columns.length;

  // Handle column resize
  const handleMouseDown = (colIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(colIndex);

    const startX = e.clientX;
    const startWidth = columnWidths[colIndex];

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + deltaX);

      setColumnWidths((prev) => {
        const newWidths = [...prev];
        newWidths[colIndex] = newWidth;
        return newWidths;
      });
    };

    const handleMouseUp = () => {
      setIsResizing(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      console.log(
        `Column ${columns[colIndex]} resized to ${columnWidths[colIndex]}px`
      );
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      let newRow = selectedCell.row;
      let newCol = selectedCell.col;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          newRow = Math.max(1, selectedCell.row - 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          newRow = Math.min(totalRows, selectedCell.row + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          newCol = Math.max(0, selectedCell.col - 1);
          break;
        case "ArrowRight":
          e.preventDefault();
          newCol = Math.min(totalCols - 1, selectedCell.col + 1);
          break;
        case "Enter":
          e.preventDefault();
          newRow = Math.min(totalRows, selectedCell.row + 1);
          break;
        case "Tab":
          e.preventDefault();
          if (e.shiftKey) {
            // Shift+Tab - move left
            if (selectedCell.col === 0) {
              newRow = Math.max(1, selectedCell.row - 1);
              newCol = totalCols - 1;
            } else {
              newCol = selectedCell.col - 1;
            }
          } else {
            // Tab - move right
            if (selectedCell.col === totalCols - 1) {
              newRow = Math.min(totalRows, selectedCell.row + 1);
              newCol = 0;
            } else {
              newCol = selectedCell.col + 1;
            }
          }
          break;
        case "Home":
          e.preventDefault();
          if (e.ctrlKey) {
            newRow = 1;
            newCol = 0;
          } else {
            newCol = 0;
          }
          break;
        case "End":
          e.preventDefault();
          if (e.ctrlKey) {
            newRow = totalRows;
            newCol = totalCols - 1;
          } else {
            newCol = totalCols - 1;
          }
          break;
      }

      if (newRow !== selectedCell.row || newCol !== selectedCell.col) {
        setSelectedCell({ row: newRow, col: newCol });
        console.log(`Navigated to: Row ${newRow}, Column ${columns[newCol]}`);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, totalRows, totalCols]);

  const handleCellClick = (row: number, colIndex: number) => {
    setSelectedCell({ row, col: colIndex });
    console.log(`Cell clicked: Row ${row}, Column ${columns[colIndex]}`);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    console.log(`Tab clicked: ${tab}`);
  };

  const handleButtonClick = (action: string) => {
    console.log(`Button clicked: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
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

      {/* Toolbar */}
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

      {/* Action Tabs */}
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

      {/* Spreadsheet */}
      <div className="bg-white" tabIndex={0} style={{ outline: "none" }}>
        {/* Column Headers */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex">
            <div
              className="h-10 border-r border-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 bg-gray-50 relative"
              style={{ width: `${columnWidths[0]}px` }}
            >
              #
              <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 ${
                  isResizing === 0 ? "bg-blue-500" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(0, e)}
              />
            </div>
            <div
              className="h-10 border-r border-gray-200 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-50 relative"
              style={{ width: `${columnWidths[1]}px` }}
            >
              <span className="mr-2">📋</span>
              Job Request
              <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 ${
                  isResizing === 1 ? "bg-blue-500" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(1, e)}
              />
            </div>
            <div
              className="h-10 border-r border-gray-200 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-50 relative"
              style={{ width: `${columnWidths[2]}px` }}
            >
              <span className="mr-2">📅</span>
              Submitted
              <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 ${
                  isResizing === 2 ? "bg-blue-500" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(2, e)}
              />
            </div>
            <div
              className="h-10 border-r border-gray-200 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-50 relative"
              style={{ width: `${columnWidths[3]}px` }}
            >
              <span className="mr-2">⚪</span>
              Status
              <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 ${
                  isResizing === 3 ? "bg-blue-500" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(3, e)}
              />
            </div>
            <div
              className="h-10 border-r border-gray-200 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-50 relative"
              style={{ width: `${columnWidths[4]}px` }}
            >
              <span className="mr-2">👤</span>
              Submitter
              <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 ${
                  isResizing === 4 ? "bg-blue-500" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(4, e)}
              />
            </div>
            <div
              className="h-10 border-r border-gray-200 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-50 relative"
              style={{ width: `${columnWidths[5]}px` }}
            >
              <span className="mr-2">🔗</span>
              URL
              <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 ${
                  isResizing === 5 ? "bg-blue-500" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(5, e)}
              />
            </div>
            <div
              className="h-10 border-r border-gray-200 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-50 relative"
              style={{ width: `${columnWidths[6]}px` }}
            >
              <span className="mr-2">👥</span>
              Assigned
              <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 ${
                  isResizing === 6 ? "bg-blue-500" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(6, e)}
              />
            </div>
            <div
              className="h-10 border-r border-gray-200 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-50 relative"
              style={{ width: `${columnWidths[7]}px` }}
            >
              Priority
              <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 ${
                  isResizing === 7 ? "bg-blue-500" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(7, e)}
              />
            </div>
            <div
              className="h-10 border-r border-gray-200 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-50 relative"
              style={{ width: `${columnWidths[8]}px` }}
            >
              Due Date
              <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 ${
                  isResizing === 8 ? "bg-blue-500" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(8, e)}
              />
            </div>
            <div
              className="h-10 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-50 relative"
              style={{ width: `${columnWidths[9]}px` }}
            >
              Est. Value
              <div
                className={`absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 ${
                  isResizing === 9 ? "bg-blue-500" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(9, e)}
              />
            </div>
          </div>
        </div>

        {/* Data Rows */}
        {spreadsheetData.map((row, index) => (
          <div
            key={row.id}
            className="flex border-b border-gray-200 hover:bg-gray-50"
          >
            <div
              className={`h-12 border-r border-gray-200 flex items-center justify-center text-sm text-gray-600 cursor-pointer ${
                selectedCell?.row === row.id && selectedCell?.col === 0
                  ? "bg-blue-100 border-2 border-blue-500"
                  : ""
              }`}
              style={{ width: `${columnWidths[0]}px` }}
              onClick={() => handleCellClick(row.id, 0)}
            >
              {row.id}
            </div>
            <div
              className={`h-12 border-r border-gray-200 flex items-center px-3 text-sm text-gray-900 cursor-pointer ${
                selectedCell?.row === row.id && selectedCell?.col === 1
                  ? "bg-blue-100 border-2 border-blue-500"
                  : ""
              }`}
              style={{ width: `${columnWidths[1]}px` }}
              onClick={() => handleCellClick(row.id, 1)}
            >
              <span className="truncate">{row.jobRequest}</span>
            </div>
            <div
              className={`h-12 border-r border-gray-200 flex items-center px-3 text-sm text-gray-700 cursor-pointer ${
                selectedCell?.row === row.id && selectedCell?.col === 2
                  ? "bg-blue-100 border-2 border-blue-500"
                  : ""
              }`}
              style={{ width: `${columnWidths[2]}px` }}
              onClick={() => handleCellClick(row.id, 2)}
            >
              <span className="truncate">{row.submitted}</span>
            </div>
            <div
              className={`h-12 border-r border-gray-200 flex items-center px-3 cursor-pointer ${
                selectedCell?.row === row.id && selectedCell?.col === 3
                  ? "bg-blue-100 border-2 border-blue-500"
                  : ""
              }`}
              style={{ width: `${columnWidths[3]}px` }}
              onClick={() => handleCellClick(row.id, 3)}
            >
              <span
                className={`rounded-md text-xs font-medium truncate ${getStatusBadgeColor(
                  row.status
                )}`}
              >
                {row.status}
              </span>
            </div>
            <div
              className={`h-12 border-r border-gray-200 flex items-center px-3 text-sm text-gray-700 cursor-pointer ${
                selectedCell?.row === row.id && selectedCell?.col === 4
                  ? "bg-blue-100 border-2 border-blue-500"
                  : ""
              }`}
              style={{ width: `${columnWidths[4]}px` }}
              onClick={() => handleCellClick(row.id, 4)}
            >
              <span className="truncate">{row.submitter}</span>
            </div>
            <div
              className={`h-12 border-r border-gray-200 flex items-center px-3 text-sm text-blue-600 underline cursor-pointer ${
                selectedCell?.row === row.id && selectedCell?.col === 5
                  ? "bg-blue-100 border-2 border-blue-500"
                  : ""
              }`}
              style={{ width: `${columnWidths[5]}px` }}
              onClick={() => handleCellClick(row.id, 5)}
            >
              <span className="truncate">{row.url}</span>
            </div>
            <div
              className={`h-12 border-r border-gray-200 flex items-center px-3 text-sm text-gray-700 cursor-pointer ${
                selectedCell?.row === row.id && selectedCell?.col === 6
                  ? "bg-blue-100 border-2 border-blue-500"
                  : ""
              }`}
              style={{ width: `${columnWidths[6]}px` }}
              onClick={() => handleCellClick(row.id, 6)}
            >
              <span className="truncate">{row.assigned}</span>
            </div>
            <div
              className={`h-12 border-r border-gray-200 flex items-center px-3 text-sm font-medium cursor-pointer ${getPriorityColor(
                row.priority
              )} ${
                selectedCell?.row === row.id && selectedCell?.col === 7
                  ? "bg-blue-100 border-2 border-blue-500"
                  : ""
              }`}
              style={{ width: `${columnWidths[7]}px` }}
              onClick={() => handleCellClick(row.id, 7)}
            >
              <span className="truncate">{row.priority}</span>
            </div>
            <div
              className={`h-12 border-r border-gray-200 flex items-center px-3 text-sm text-gray-700 cursor-pointer ${
                selectedCell?.row === row.id && selectedCell?.col === 8
                  ? "bg-blue-100 border-2 border-blue-500"
                  : ""
              }`}
              style={{ width: `${columnWidths[8]}px` }}
              onClick={() => handleCellClick(row.id, 8)}
            >
              <span className="truncate">{row.dueDate}</span>
            </div>
            <div
              className={`h-12 flex items-center px-3 text-sm text-gray-900 font-medium cursor-pointer ${
                selectedCell?.row === row.id && selectedCell?.col === 9
                  ? "bg-blue-100 border-2 border-blue-500"
                  : ""
              }`}
              style={{ width: `${columnWidths[9]}px` }}
              onClick={() => handleCellClick(row.id, 9)}
            >
              <span className="truncate">{row.estValue} ₹</span>
            </div>
          </div>
        ))}

        {/* Empty rows for spreadsheet feel */}
        {Array.from({ length: 20 }, (_, index) => {
          const rowNum = spreadsheetData.length + index + 1;
          return (
            <div
              key={`empty-${index}`}
              className="flex border-b border-gray-200 hover:bg-gray-50"
            >
              <div
                className={`h-12 border-r border-gray-200 flex items-center justify-center text-sm text-gray-400 cursor-pointer ${
                  selectedCell?.row === rowNum && selectedCell?.col === 0
                    ? "bg-blue-100 border-2 border-blue-500"
                    : ""
                }`}
                style={{ width: `${columnWidths[0]}px` }}
                onClick={() => handleCellClick(rowNum, 0)}
              >
                {rowNum}
              </div>
              <div
                className={`h-12 border-r border-gray-200 cursor-pointer ${
                  selectedCell?.row === rowNum && selectedCell?.col === 1
                    ? "bg-blue-100 border-2 border-blue-500"
                    : ""
                }`}
                style={{ width: `${columnWidths[1]}px` }}
                onClick={() => handleCellClick(rowNum, 1)}
              >
                {index === 1 && (
                  <input
                    type="text"
                    className="w-full h-full px-3 border-2 border-blue-500 rounded focus:outline-none"
                    placeholder=""
                  />
                )}
              </div>
              {Array.from({ length: 8 }, (_, colIndex) => {
                const actualColIndex = colIndex + 2; // Starting from column 2
                return (
                  <div
                    key={colIndex}
                    className={`h-12 ${
                      colIndex < 7 ? "border-r" : ""
                    } border-gray-200 cursor-pointer ${
                      selectedCell?.row === rowNum &&
                      selectedCell?.col === actualColIndex
                        ? "bg-blue-100 border-2 border-blue-500"
                        : ""
                    }`}
                    style={{ width: `${columnWidths[actualColIndex]}px` }}
                    onClick={() => handleCellClick(rowNum, actualColIndex)}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom Tabs */}
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
    </div>
  );
}

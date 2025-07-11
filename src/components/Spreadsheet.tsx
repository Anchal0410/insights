import { columns, spreadsheetData } from "../constants/data";
import { useState, useEffect } from "react";
import { getStatusBadgeColor, getPriorityColor } from "../utils/lib";

const Spreadsheet = () => {
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>({ row: 1, col: 0 });
  const [isResizing, setIsResizing] = useState<number | null>(null);
  const [columnWidths, setColumnWidths] = useState([
    48, 288, 128, 128, 144, 144, 144, 96, 128, 128,
  ]);

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
  useEffect(() => {
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
  return (
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
      {spreadsheetData.map((row) => (
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
  );
};

export default Spreadsheet;

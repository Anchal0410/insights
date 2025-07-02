import Nav from "./Nav";
import Toolbar from "./Toolbar";
import ActionTab from "./ActionTab";
import BottomTab from "./BottomTab";
import Spreadsheet from "./Spreadsheet";

export default function SpreadsheetApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <Nav />

      {/* Toolbar */}
      <Toolbar />

      {/* Action Tabs */}
      <ActionTab />
      {/* Spreadsheet */}
      <Spreadsheet />

      {/* Bottom Tabs */}
      <BottomTab />
    </div>
  );
}

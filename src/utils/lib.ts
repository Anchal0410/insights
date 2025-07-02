export const getStatusBadgeColor = (status: string) => {
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

export const getPriorityColor = (priority: string) => {
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

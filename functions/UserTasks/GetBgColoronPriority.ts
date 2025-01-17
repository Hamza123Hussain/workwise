// Define background colors for priority and completed status
export const getPriorityBg = (Priority: string) => {
  switch (Priority.toLowerCase()) {
    case 'high':
      return 'bg-red-200 text-red-800'
    case 'medium':
      return 'bg-yellow-200 text-yellow-800'
    case 'low':
      return 'bg-green-200 text-green-800'
    default:
      return 'bg-gray-200 text-gray-800'
  }
}

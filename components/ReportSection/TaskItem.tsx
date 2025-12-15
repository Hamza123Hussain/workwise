import { Target } from '@/utils/Interfaces/KPIInterface'

export const COLORS = {
  HIGH_BG: 'bg-[#FBE4E6]',
  MEDIUM_BG: 'bg-[#FFFBE5]',
  LOW_BG: 'bg-[#E5F5FF]',
  ATTENDANCE_BG: 'bg-[#F2E5FF]',
  PERFORMANCE_BG: 'bg-[#E9F9E5]',
  COMPLETION_BG: 'bg-[#D6E6F8]',
  SALARY_BG: 'bg-[#E9F9E5]',

  HIGH_STATUS_BG: 'bg-[#FBD9DB]',
  MEDIUM_STATUS_BG: 'bg-[#FFEBA7]',
  LOW_STATUS_BG: 'bg-[#C1E0F5]',
  TEXT_BLUE: 'text-[#4B83C4]',
}
// ------------------------
// TASK ITEM COMPONENT
// ------------------------
export const TaskItem = ({ Target }: { Target: Target }) => {
  const { TargetName, TargetValue, ValueAchieved, Priority } = Target
  let statusText = 'text-blue-700'
  if (Priority === 'High') {
    statusText = 'text-red-700'
  } else if (Priority === 'Medium') {
    statusText = 'text-yellow-700'
  }
  return (
    <div className="flex items-center p-3 bg-white w-full border border-[#cdcdcd] text-sm">
      <span className="text-gray-700 font-medium min-w-[130px]">
        {TargetName}
      </span>

      <div
        className={`px-2 py-0.5 rounded-md font-semibold ${statusText} text-xs mx-3`}
      >
        {Priority}
      </div>

      <span className="text-gray-600 font-semibold text-xs">
        {ValueAchieved} / {TargetValue}
      </span>
    </div>
  )
}

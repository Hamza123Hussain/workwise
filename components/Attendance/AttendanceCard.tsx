import { AttendanceRecord } from '../../utils/Interfaces/AttendanceInterface'

const AttendanceCard = ({ element }: { element: AttendanceRecord }) => {
  // Safe date parsing (strict, no `any`)
  const parseToDate = (value: Date | string): Date => {
    return value instanceof Date ? value : new Date(value)
  }
  // Formatters (strict)
  const formatDate = (value: Date | string): string => {
    const d = parseToDate(value)
    return isNaN(d.getTime()) ? '--' : d.toLocaleDateString()
  }

  const formatTime = (value: Date | string): string => {
    const d = parseToDate(value)
    return isNaN(d.getTime())
      ? '--'
      : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div
      key={element.id}
      className="bg-[#FEFEFE] px-4 py-2 rounded-[5px] flex flex-col gap-2"
    >
      <h3 className="text-[14px] font-semibold text-[#101828]">
        {formatDate(element.currentDate)}
      </h3>

      <div className="bg-[#F9FAFB] p-3 flex justify-between rounded-[12px] border border-[#EAECF0]">
        <div className="flex flex-col">
          <h3 className="text-[12px] font-medium text-[#475467]">
            Total Hours
          </h3>
          <h3 className="text-[16px] font-medium text-[#344054]">
            {element.Hours_Worked.toFixed(1)} hrs
          </h3>
        </div>

        <div className="flex flex-col">
          <h3 className="text-[12px] font-medium text-[#475467]">
            Clock In & Out
          </h3>
          <h3 className="text-[16px] font-medium text-[#344054]">
            {formatTime(element.entry)} — {formatTime(element.exit)}
          </h3>
        </div>
      </div>
    </div>
  )
}
export default AttendanceCard

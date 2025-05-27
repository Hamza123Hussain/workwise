import React, { useState } from 'react'
import AttendanceCard from './AttendanceCard'
import { AttendanceRecord } from '../../utils/Interfaces/AttendanceInterface'
const AttendanceTable = ({
  Attendance,
}: {
  Attendance: AttendanceRecord[]
}) => {
  // Calculate total hours worked
  const HoursWorked = Attendance.reduce(
    (acc, element) => acc + element.Hours_Worked,
    0
  )
  // Calculate remaining hours and attendance percentage
  const remainingHours = 176 - HoursWorked
  const attendancePercentage = ((HoursWorked / 176) * 100).toFixed(2)
  // Define state to handle current page of cards (group of 3 cards at a time)
  const [currentPage, setCurrentPage] = useState(0)
  // Define how many cards per page (3 cards per page)
  const cardsPerPage = 3
  // Reverse attendance data to show the latest card first
  const reversedAttendance = [...Attendance].reverse()
  // Slice the attendance data to show only the cards for the current page
  const currentCards = reversedAttendance.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  )
  // Function to handle next page
  const nextPage = () => {
    if ((currentPage + 1) * cardsPerPage < Attendance.length) {
      setCurrentPage(currentPage + 1)
    }
  }
  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  return (
    <div className="mx-auto px-4 py-6 flex flex-col">
      {/* Attendance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCards.map((element) => (
          <AttendanceCard key={element.id} element={element} />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center gap-6 my-6">
        {/* Previous Button */}
        {currentPage > 0 && (
          <button
            onClick={prevPage}
            className="bg-[#7e57c2] text-white py-3 px-6 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 active:scale-95"
          >
            Previous
          </button>
        )}
        {/* Next Button */}
        {(currentPage + 1) * cardsPerPage < Attendance.length && (
          <button
            onClick={nextPage}
            className="bg-[#7e57c2] text-white py-3 px-6 rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 active:scale-95"
          >
            Next
          </button>
        )}
      </div>
      {/* Attendance Statistics */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 items-center text-white my-6 space-y-6 sm:space-y-0 sm:space-x-6">
        <div className="bg-[#b485ff] p-4 flex flex-col items-center text-center rounded-lg shadow-md transition-transform duration-200 w-full sm:w-1/3">
          <h1 className="text-lg font-bold">Number Of Hours Worked</h1>
          <span className="text-2xl">{HoursWorked.toFixed(2)}</span>
        </div>
        <div className="bg-[#b485ff] p-4 flex flex-col items-center text-center rounded-lg shadow-md transition-transform duration-200 w-full sm:w-1/3">
          <h1 className="text-lg font-bold">Remaining Working Hours</h1>
          <span className="text-2xl">{remainingHours.toFixed(2)}</span>
        </div>
        <div className="bg-[#b485ff] p-4 flex flex-col items-center text-center rounded-lg shadow-md transition-transform duration-200 w-full sm:w-1/3">
          <h1 className="text-lg font-bold">Attendance Percentage</h1>
          <span className="text-2xl">{attendancePercentage}%</span>
        </div>
      </div>
    </div>
  )
}
export default AttendanceTable

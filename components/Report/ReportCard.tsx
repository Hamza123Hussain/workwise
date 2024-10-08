import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'
import ReportBody from './ReportBody' // Make sure to import ReportBody
import Image from 'next/image'

// Define interfaces for user data
interface MergedUserData {
  user: string
  attendance: AttendanceRecord[]
  tasks: TaskFetch[]
}

interface ReportCardProps {
  mergedData: MergedUserData[] // Array of user data
}

const ReportCard: React.FC<ReportCardProps> = ({ mergedData }) => {
  return (
    <div className="p-4  text-purple-200">
      <div className=" flex flex-col justify-center items-center my-10">
        {' '}
        <Image
          width={350}
          height={350}
          src="/Logo.png"
          alt="Logo"
          className=" cursor-pointer object-cover"
        />{' '}
        <h1 className="text-4xl">
          Performance Report{' '}
          {new Date().toLocaleString('default', { month: 'long' })}{' '}
          {new Date().getFullYear()}
        </h1>
      </div>
      {/* Background black with purple text */}
      {/* Table with summary */}
      <table className="min-w-full border-collapse border border-purple-600 text-center">
        <thead>
          <tr className="bg-purple-600 text-white">
            <th className="border border-purple-500  p-2 text-[12px]">
              Username
            </th>
            <th className="border border-purple-500  p-2 text-[12px]">
              Attendance Percentage
            </th>
            <th className="border border-purple-500  p-2 text-[12px]">
              High Priority Tasks
            </th>
            <th className="border border-purple-500  p-2 text-[12px]">
              Medium Priority Tasks
            </th>
            <th className="border border-purple-500  p-2 text-[12px]">
              Low Priority Tasks
            </th>
            <th className="border border-purple-500  p-2 text-[12px]">
              Task Completion Percentage
            </th>
            <th className="border border-purple-500  p-2 text-[12px]">
              Task & Attendance Percentage
            </th>
            <th className="border border-purple-500  p-2 text-[12px]">
              Salary
            </th>
          </tr>
        </thead>
        <ReportBody mergedData={mergedData} />{' '}
        {/* Pass mergedData to ReportBody */}
      </table>
    </div>
  )
}

export default ReportCard

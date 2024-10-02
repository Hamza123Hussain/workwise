import Image from 'next/image'

import TaskStatus from './TaskStatus'
import TimeBtn from './TimeBtn'
import RecentTasks from '../Tasks/RecentTasks'
const HomePage = () => {
  return (
    <div className=" px-2  w-full min-h-screen ">
      {/* Welcome Message */}
      <div className="my-8 flex items-center justify-center">
        <Image
          height={150}
          width={150}
          src="/Logo.png"
          className=" w-24 sm:w-52"
          alt=""
        />
      </div>
      {/* Main Content with Two Sections */}
      <div className="grid grid-cols-1  w-full gap-6 my-5">
        <div className=" flex gap-5 sm:gap-3 w-full sm:flex-row flex-col">
          <TimeBtn />
          <TaskStatus />
        </div>
        <RecentTasks />
      </div>
    </div>
  )
}

export default HomePage

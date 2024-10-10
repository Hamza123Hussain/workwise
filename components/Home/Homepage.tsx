import TaskStatus from './TaskStatus'
import TimeBtn from './TimeBtn'
import RecentTasks from '../Tasks/RecentTasks'
import UserDetails from './UserDetails'

const HomePage = () => {
  return (
    <div className="px-4 sm:px-6 w-full min-h-screen">
      {/* Welcome Message */}
      <div className="my-8 flex items-center justify-end">
        <UserDetails />
      </div>
      {/* Main Content with Two Sections */}
      <div className="grid grid-cols-1 w-full gap-6 my-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <TimeBtn />
          <TaskStatus />
        </div>
        <RecentTasks />
      </div>
    </div>
  )
}

export default HomePage

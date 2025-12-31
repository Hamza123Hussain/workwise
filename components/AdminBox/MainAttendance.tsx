import { Allusers } from '@/functions/AUTH/Allusers'
import { UserFetched } from '@/utils/Interfaces/SignUpInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import UserSelection from '../Layout/UserSelection'
const UserAttendance: React.FC = () => {
  const [Users, SetUserFetched] = useState<UserFetched[]>([])
  const user = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true)
  const Getusers = async () => {
    const Data = await Allusers(user.Email)
    if (Data) {
      SetUserFetched(Data)
      setLoading(false)
    }
  }
  useEffect(() => {
    Getusers()
  }, [user])
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="px-6">
      <UserSelection type="Attendance" Users={Users} />
    </div>
  )
}
export default UserAttendance

import { Allusers } from '@/functions/AUTH/Allusers'
import { setUser } from '@/utils/Redux/Slice/User_Selected_Slice/Slice'
import { RootState } from '@/utils/Redux/Store/Store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* =========================
   Assigned User Select
========================= */
export const AssignedUserSelect = () => {
  const [allUsers, setAllUsers] = useState<any[]>([])
  const dispatch = useDispatch()
  const userSelect = useSelector((state: RootState) => state.UserSelect)

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await Allusers('octtoppus1@gmail.com')
      if (data) setAllUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <label className="block text-gray-600 mb-2">Assigned To</label>
      <select
        value={userSelect.id || ''}
        onChange={(e) => {
          const user = allUsers.find((u) => u._id === e.target.value)
          if (user) {
            dispatch(setUser({ id: user._id, name: user.Name || user.Email }))
          }
        }}
        className="w-full p-3 border-2 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select User</option>
        {allUsers.map((user) => (
          <option key={user._id} value={user._id}>
            {user.Name || user.Email}
          </option>
        ))}
      </select>
    </div>
  )
}

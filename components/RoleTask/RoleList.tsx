'use client'
import { useEffect, useState } from 'react'
import RoleCard from './RoleCard'
import { GetRoleTasks } from '@/functions/Roles/GetRoleTasks'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'

export default function RoleList() {
  const User = useSelector((state: RootState) => state.user)
  const [data, setdata] = useState([])
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    const GetData = async () => {
      const Roles = await GetRoleTasks(User._id)
      if (Roles) {
        setdata(Roles)
        setLoading(false)
        console.log('Data Here : ', data)
      }
    }
    GetData()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data?.length) return <p>No roles found.</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {data.map((role: any) => (
        <RoleCard key={role._id} role={role} />
      ))}
    </div>
  )
}

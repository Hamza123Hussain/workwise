import { useSelector } from 'react-redux'
import AddRoleForm from './RoleForm'
import RoleList from './RoleList'
import { RootState } from '@/utils/Redux/Store/Store'

export default function RolesPage() {
  const User = useSelector((state: RootState) => state.user)
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Role Tasks Management</h1>
      <AddRoleForm userId={User._id} />
      <RoleList />
    </main>
  )
}

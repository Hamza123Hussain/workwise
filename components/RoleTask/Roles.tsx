import AddRoleForm from './RoleForm'
import RoleList from './RoleList'

export default function RolesPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Tasks Management</h1>
      <AddRoleForm />
      <RoleList />
    </main>
  )
}

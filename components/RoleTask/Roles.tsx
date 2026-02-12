'use client'
import { useState, useCallback } from 'react'
import AddRoleForm from './RoleForm'
import RoleList from './RoleList'

export default function RolesPage() {
  const [refreshToggle, setRefreshToggle] = useState(false)

  // This function will be passed to the Form to trigger the List refresh
  const triggerRefresh = useCallback(() => {
    setRefreshToggle((prev) => !prev)
  }, [])

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Tasks Management</h1>
      {/* 1. Pass trigger to Form */}
      <AddRoleForm onRoleCreated={triggerRefresh} />

      <div className="mt-12">
        {/* 2. Pass toggle to List */}
        <RoleList externalRefresh={refreshToggle} />
      </div>
    </main>
  )
}

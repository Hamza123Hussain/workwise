import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { TargetInput } from './TargetInputandUserselect'
import { createKPI, updateKPI } from '@/functions/Kpi/CreateAndUpdateKpi'
import toast from 'react-hot-toast'
import { AssignedUserSelect } from './AssignedUsers'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'

const emptyTarget = {
  TargetName: '',
  TargetValue: 0,
  ValueAchieved: 0,
  TargetAchieved: false,
  Priority: 'Medium',
  PointsGained: 0,
  TotalPoints: 0,
}

interface Props {
  mode: 'create' | 'edit'
  kpi?: any
  onClose: () => void
}

const CreateEditKpiModal: React.FC<Props> = ({ mode, kpi, onClose }) => {
  const [salary, setSalary] = useState(kpi?.Salary || '')
  const [hours, setHours] = useState(kpi?.HoursWorked || '')
  const [targets, setTargets] = useState<any[]>(kpi?.Targets || [emptyTarget])
  const [loading, setLoading] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<any>('')
  const userSelect = useSelector((state: RootState) => state.UserSelect)
  // Update targets if KPI changes
  useEffect(() => {
    if (mode === 'edit' && kpi) {
      setSalary(kpi.Salary)
      setHours(kpi.HoursWorked)
      setTargets(kpi.Targets)
      setSelectedUserId(kpi.UserId)
    }
    setSelectedUserId(userSelect.id)
  }, [mode, kpi, userSelect])

  // Handle changes for each target
  const handleTargetChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    const copy = [...targets] // shallow copy of array

    // deep copy the object we want to update
    const targetCopy = { ...copy[index] }

    // assign the new value
    if (['TargetValue', 'ValueAchieved', 'TotalPoints'].includes(name)) {
      targetCopy[name] = Number(value)
    } else {
      targetCopy[name] = value
    }

    // put back the updated object
    copy[index] = targetCopy
    setTargets(copy)

    // If in create mode, also update selected user from the assigned user field
    if (mode === 'create' && name === 'AssignedTo') {
      setSelectedUserId(value)
    }
  }

  const handleRemoveTarget = (index: number) => {
    setTargets(targets.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const payload = {
        Targets: targets,
        HoursWorked: Number(hours),
        Salary: Number(salary),
        UserId: selectedUserId, // now correctly set from AssignedUserSelect
      }

      let result
      if (mode === 'create') {
        result = await createKPI(payload)
      } else if (mode === 'edit' && kpi?._id) {
        result = await updateKPI(kpi._id, payload)
      }

      if (result && result.success) {
        toast.success('KPI saved successfully!')
        onClose()
      } else {
        toast.error('Error: ' + result?.error)
      }
    } catch (err: any) {
      console.error(err)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-3xl rounded-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            {mode === 'create' ? 'Create KPI' : 'Edit KPI'}
          </h2>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Salary & Hours */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Salary (PKR)"
              className="p-3 border-2 rounded-md"
              type="number"
              min={0}
            />
            <input
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Hours Worked"
              className="p-3 border-2 rounded-md"
              type="number"
              min={0}
            />
          </div>

          {/* Targets */}
          {targets.map((t, i) => (
            <TargetInput
              key={i}
              index={i}
              target={t}
              handleTargetChange={handleTargetChange}
              handleRemoveTarget={handleRemoveTarget}
              showAssignedUser={mode === 'create'} // only show when creating
            />
          ))}
          <AssignedUserSelect />
          <button
            onClick={() => setTargets([...targets, emptyTarget])}
            className="text-blue-600 text-sm"
          >
            + Add Target
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading
              ? mode === 'create'
                ? 'Creating...'
                : 'Updating...'
              : mode === 'create'
                ? 'Create KPI'
                : 'Update KPI'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default CreateEditKpiModal

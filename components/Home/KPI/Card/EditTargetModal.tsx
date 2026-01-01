import React, { useState, useEffect } from 'react'
import { Target, Kpi } from '@/utils/Interfaces/KPIInterface'

import { updateKPITargets } from '@/functions/Kpi/UpdateKpiTargets'

interface EditTargetsModalProps {
  user: Kpi
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedTargets: Target[]) => void
}

// Single Target Row Component
interface TargetRowProps {
  target: Target
  index: number
  onChange: (index: number, updatedTarget: Target) => void
  onDelete: (index: number) => void
}

const TargetRow: React.FC<TargetRowProps> = ({
  target,
  index,
  onChange,
  onDelete,
}) => {
  const handleChange = (
    key: keyof Target,
    value: string | number | boolean
  ) => {
    onChange(index, { ...target, [key]: value })
  }

  return (
    <div className="border p-3 rounded grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
      <input
        type="text"
        placeholder="Target Name"
        className="border p-2 rounded w-full"
        value={target.TargetName}
        onChange={(e) => handleChange('TargetName', e.target.value)}
      />
      <input
        type="number"
        placeholder="Target Value"
        className="border p-2 rounded w-full"
        value={target.TargetValue}
        onChange={(e) => handleChange('TargetValue', +e.target.value)}
      />
      <input
        type="number"
        placeholder="Value Achieved"
        className="border p-2 rounded w-full"
        value={target.ValueAchieved}
        onChange={(e) => handleChange('ValueAchieved', +e.target.value)}
      />
      <select
        className="border p-2 rounded w-full"
        value={target.Priority}
        onChange={(e) => handleChange('Priority', e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        type="button"
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => onDelete(index)}
      >
        Delete
      </button>
    </div>
  )
}

// Main Modal
const EditTargetsModal: React.FC<EditTargetsModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [targets, setTargets] = useState<Target[]>([])

  // Initialize targets when modal opens or user changes
  useEffect(() => {
    setTargets(user.Targets)
  }, [user])

  const handleTargetChange = (index: number, updatedTarget: Target) => {
    const newTargets = [...targets]
    newTargets[index] = updatedTarget
    setTargets(newTargets)
  }

  const handleAddTarget = () => {
    setTargets([
      ...targets,
      {
        TargetName: '',
        TargetValue: 0,
        TargetAchieved: false,
        ValueAchieved: 0,
        Priority: 'Medium',
        PointsGained: 0,
        TotalPoints: 0,
      },
    ])
  }

  const handleDeleteTarget = (index: number) => {
    const newTargets = targets.filter((_, i) => i !== index)
    setTargets(newTargets)
  }

  const handleSubmit = async () => {
    try {
      const data = await updateKPITargets(user.UserId, targets)
      if (data) {
        onUpdate(targets)
        onClose()
      }
    } catch (error) {
      console.error('Error updating targets', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto pt-12">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 p-4 flex justify-between items-center">
          <h2 className="text-white text-2xl font-bold">
            Edit Targets - {user.UserName}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl font-bold hover:text-gray-200 transition"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {targets.map((target, index) => (
            <TargetRow
              key={index}
              index={index}
              target={target}
              onChange={handleTargetChange}
              onDelete={handleDeleteTarget}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={handleAddTarget}
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition"
          >
            + Add Target
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTargetsModal

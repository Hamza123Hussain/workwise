'use client'
import React from 'react'

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <h3 className="text-lg font-bold mb-4">Delete Task</h3>
        <p className="mb-6">Are you sure you want to delete this task?</p>
        <div className="flex justify-center gap-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal

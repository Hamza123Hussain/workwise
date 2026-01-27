import { motion } from 'framer-motion'

interface Props {
  onCancel: () => void
  onConfirm: () => void
}

const DeleteConfirmModal: React.FC<Props> = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-md p-6"
      >
        <h3 className="text-lg font-semibold text-red-600 mb-2">Delete KPI</h3>
        <p className="text-gray-600 mb-6">
          Are you sure? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default DeleteConfirmModal

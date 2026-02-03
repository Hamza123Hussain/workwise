import { motion } from 'framer-motion'

/* =========================
   Target Input
========================= */
export const TargetInput = ({
  index,
  target,
  handleTargetChange,
  handleRemoveTarget,
}: any) => (
  <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
    {/* Header */}
    <div className="flex justify-between items-center">
      <h3 className="font-semibold">Target {index + 1}</h3>
      {index > 0 && (
        <button
          type="button"
          onClick={() => handleRemoveTarget(index)}
          className="text-red-500 text-sm"
        >
          Remove
        </button>
      )}
    </div>

    {/* Target Name */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
    >
      <label className="block text-gray-600 mb-1">Target Name</label>
      <input
        type="text"
        name="TargetName"
        value={target.TargetName}
        onChange={(e) => handleTargetChange(index, e)}
        className="w-full p-3 border-2 rounded-md"
      />
    </motion.div>

    {/* Target Value */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-gray-600 mb-1">Target Value</label>
      <input
        type="number"
        name="TargetValue"
        value={target.TargetValue}
        min={0}
        onChange={(e) => handleTargetChange(index, e)}
        className="w-full p-3 border-2 rounded-md"
      />
    </motion.div>

    {/* Value Achieved */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      <label className="block text-gray-600 mb-1">Value Achieved</label>
      <input
        type="number"
        name="ValueAchieved"
        value={target.ValueAchieved}
        min={0}
        max={target.TargetValue}
        onChange={(e) => handleTargetChange(index, e)}
        className="w-full p-3 border-2 rounded-md"
      />
    </motion.div>

    {/* Priority */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label className="block text-gray-600 mb-1">Priority</label>
      <select
        name="Priority"
        value={target.Priority}
        onChange={(e) => handleTargetChange(index, e)}
        className="w-full p-3 border-2 rounded-md"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </motion.div>
  </div>
)

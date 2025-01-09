import React from 'react'
import { motion } from 'framer-motion'

const CreateKPIButton = () => {
  return (
    <motion.button
      className="bg-green-400 px-6 py-3 rounded-lg border-2 border-black text-white font-semibold shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      Create KPI
    </motion.button>
  )
}

export default CreateKPIButton

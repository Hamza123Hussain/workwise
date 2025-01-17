'use client'
import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion'
import Form from '@/components/Task/Create/Form/Form'
const CreateTaskForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white shadow-lg transition-transform hover:scale-105 focus:outline-none"
      >
        Create Task
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center p-4"
        >
          <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <DialogTitle className="mb-4 text-xl font-bold text-gray-800">
              Create New Task
            </DialogTitle>
            <Form />
          </DialogPanel>
        </motion.div>
      </Dialog>
    </>
  )
}
export default CreateTaskForm

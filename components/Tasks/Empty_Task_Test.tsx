import { useRouter } from 'next/navigation'
import React from 'react'

const Empty_Task_Test = () => {
  const Router = useRouter()
  return (
    <div className="flex text-purple-500 text-xl font-semibold mb-6 text-center flex-col items-center mx-auto justify-center min-h-screen lg:w-[70vw]">
      <h1 className="mb-10 text-center">
        Let’s get started by creating your first task! Click the button below to
        add a new task.
      </h1>
      <button
        onClick={() => Router.push('/createtask')}
        className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600 transition duration-300 ease-in-out shadow-lg"
      >
        Add a New Task
      </button>
    </div>
  )
}

export default Empty_Task_Test

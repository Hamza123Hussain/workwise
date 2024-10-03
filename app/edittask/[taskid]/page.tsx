import React from 'react'

interface Params {
  taskid: string
}

const TaskEdit = ({ params }: { params: Params }) => {
  console.log('params are here', params.taskid)
  return <div>{params.taskid}</div>
}

export default TaskEdit

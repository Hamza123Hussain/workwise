import axios from 'axios'

export const DeleteTask = async (Email: string, id: String) => {
  try {
    const Response = await axios.delete(`/DeleteTask?Email=${Email}&id=${id}`)
    if (Response.status === 200) {
      console.log('DATA GONE')
      return true
    }
  } catch (error) {
    console.error('Error creating task:', error)
    throw error // Propagate the error to be handled by the caller
  }
}

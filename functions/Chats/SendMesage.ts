import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'
export const SendMessage = async (
  text: string,
  UserEmail: string,
  RecipentEmail: string,
  UserID: string,
  RecipentID: string
) => {
  try {
    // Validation checks
    if (!text) return toast.error('Message text is required')
    if (!UserEmail) return toast.error('Sender email is required')
    if (!RecipentEmail) return toast.error('Recipient email is required')
    if (!UserID) return toast.error('Sender ID is required')
    if (!RecipentID) return toast.error('Recipient ID is required')
    // API request
    const response = await axios.post(`${ApiUrl}Api/Message/SendMessage`, {
      text,
      UserEmail,
      RecipentEmail,
      UserID,
      RecipentID,
    })
    // Success response
    if (response.status === 201) {
      toast.success(response.data.message)
    }
  } catch (error) {
    console.error('Error sending message:', error)
    toast.error('Failed to send message')
  }
}

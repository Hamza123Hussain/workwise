import axios from 'axios'
import toast from 'react-hot-toast'
// Define the fetchMessages function with TypeScript compatibility
export const fetchMessages = async (UserID: string, RecipentID: string) => {
  try {
    if (!UserID) return toast.error('Sender ID is required')
    if (!RecipentID) return toast.error('Recipient ID is required')
    const response = await axios.get(
      `https://workwise-backend-puce.vercel.app/Api/Message/GetMessages?RecipentID=${RecipentID}&UserID=${UserID}`
    )
    console.log('Messages:', response.data.messages)
    return response.data.messages
  } catch (err) {
    console.error('Error fetching messages:', err)
  }
}

import axios from 'axios'
// Define the fetchMessages function with TypeScript compatibility
export const fetchMessages = async (UserID: string, RecipentID: string) => {
  try {
    const response = await axios.get(
      `https://workwise-backend-puce.vercel.app/Api/Message/GetMessages?RecipentID=${UserID}&UserID=${RecipentID}`
    )
    console.log('USER MESSAGES : ', response.data.messages)
    return response.data.messages
  } catch (err) {
    console.error('Error fetching messages:', err)
  }
}

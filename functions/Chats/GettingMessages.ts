import { Message } from '@/utils/MessageInterface'
import axios from 'axios'
// Define the fetchMessages function with TypeScript compatibility
export const fetchMessages = async (
  chatId: string,
  setMessages: (messages: Message[]) => void,
  setLoading: (isLoading: boolean) => void
): Promise<void> => {
  try {
    setLoading(true) // Set loading to true before fetching
    const response = await axios.get<{ messages: Message[] }>(
      `https://workwise-backend-puce.vercel.app/Api/Message/GetMessages`,
      {
        params: { chatId }, // Use query parameters for flexibility
      }
    )
    setMessages(response.data.messages) // Set the fetched messages
  } catch (err) {
    console.error('Error fetching messages:', err)
  } finally {
    setLoading(false) // Ensure loading is set to false after the fetch
  }
}

import axios from 'axios'
import toast from 'react-hot-toast'
export const SendMessage = async (
  text: string,
  userId: string,
  recipientId: string,
  chatId: string
) => {
  const sanitizedChatId = chatId.replace(/@/g, '-at-').replace(/\./g, '-dot-')
  const response = await axios.post(
    'https://workwise-backend-puce.vercel.app/Api/Message/SendMessage',
    {
      text,
      userId,
      recipientId,
      chatId: sanitizedChatId,
    }
  )
  if (response.status === 201) toast.success(response.data.message)

  try {
  } catch (error) {
    console.log(error)
  }
}

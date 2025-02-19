import { fetchMessages } from '@/functions/Chats/GettingMessages'
import { SetRecipentDetails } from '@/utils/Redux/Slice/chatslice/chatslice'
import {
  clearMessages,
  FillUpMessages,
} from '@/utils/Redux/Slice/MessageSlice/MessageSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Define the expected props for this component
interface SingleUserProps {
  UserName: string
  UserEmail: string
  UserID: string
}
// Define the SingleUser component
const SingleUser: React.FC<SingleUserProps> = ({
  UserName,
  UserEmail,
  UserID,
}) => {
  const dispatch = useDispatch()
  // Get the current user from Redux store
  const User = useSelector((state: RootState) => state.user)
  // Get the selected recipient details from Redux store
  const recipientDetails = useSelector(
    (state: RootState) => state.Chat.recipientDetails
  )
  // 🔹 Fetch messages whenever the recipient changes
  useEffect(() => {
    const fetchUserMessages = async () => {
      // Ensure both user ID and recipient ID exist before fetching messages
      if (!User._id || !recipientDetails?.UserID) return
      // Fetch messages for the selected recipient
      const userMessages = await fetchMessages(
        User._id,
        recipientDetails.UserID
      )
      // If messages are received, update the Redux store
      if (userMessages) {
        dispatch(FillUpMessages(userMessages))
      }
    }
    fetchUserMessages()
  }, [recipientDetails, User._id, dispatch]) // Dependency array ensures this runs when recipient changes
  // Function to update the selected recipient
  const setRecipientData = (Name: string, Email: string, UserID: string) => {
    dispatch(clearMessages()) // Clear previous messages before fetching new ones
    dispatch(SetRecipentDetails({ Name, Email, UserID })) // Set the new recipient in Redux
  }
  return (
    <div
      key={UserEmail}
      onClick={() => setRecipientData(UserName, UserEmail, UserID)}
      className={`flex items-center ${
        recipientDetails?.UserID === UserID ? 'bg-green-700' : '' // ✅ Highlight only the selected user
      } cursor-pointer gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors`}
    >
      <h6 className="text-white font-medium">{UserName}</h6>
    </div>
  )
}
export default SingleUser

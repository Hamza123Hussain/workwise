import { fetchMessages } from '@/functions/Chats/GettingMessages'
import { SetRecipentDetails } from '@/utils/Redux/Slice/chatslice/chatslice'
import {
  clearMessages,
  FillUpMessages,
} from '@/utils/Redux/Slice/MessageSlice/MessageSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
interface SingleUserProps {
  UserName: string
  UserEmail: string
  UserID: string
}
const SingleUser: React.FC<SingleUserProps> = ({
  UserName,
  UserEmail,
  UserID,
}) => {
  const User = useSelector((state: RootState) => state.user)
  const Recipient = useSelector(
    (state: RootState) => state.Chat.recipientDetails
  )
  const Dispatch = useDispatch()
  const [UserActive, SetUserActive] = useState('')
  const SetRecipentData = async (
    Name: string,
    Email: string,
    UserID: string
  ) => {
    Dispatch(clearMessages())
    Dispatch(
      SetRecipentDetails({
        Name,
        Email,
        UserID,
      })
    )
    SetUserActive(Name)
    const UserMessages = await fetchMessages(User._id, Recipient.UserID)
    if (UserMessages) {
      Dispatch(FillUpMessages(UserMessages))
    }
  }
  return (
    <div
      key={UserEmail}
      onClick={() => SetRecipentData(UserName, UserEmail, UserID)}
      className={`flex items-center ${
        UserName === UserActive ? 'bg-gray-700' : ''
      } cursor-pointer gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors`}
    >
      <h6 className="text-white font-medium">{UserName}</h6>
    </div>
  )
}
export default SingleUser

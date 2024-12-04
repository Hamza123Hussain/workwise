// 'use client'

// import React, { useState } from 'react'
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
// import { v4 as uuid } from 'uuid'

// const CreateMeeting = () => {
//   const [roomID, setRoomID] = useState<string | null>(null)

//   const createRoom = async () => {
//     try {
//       const appID = 1506695392
//       const serverSecret = 'e822d72e405e1625b6f1a90e693dae3b'

//       // Generate a unique room ID
//       const roomID = uuid()
//       setRoomID(roomID)

//       // Generate Kit Token for room creation
//       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//         appID,
//         serverSecret,
//         roomID,
//         uuid(),
//         'host' + Date.now(),
//         720
//       )

//       console.log('Room created with ID:', roomID)
//       console.log('Kit Token:', kitToken)

//       // Now you can use this roomID to join the room in the next step.
//       // You would store the roomID and share it with participants.
//     } catch (error) {
//       console.error('Error creating room:', error)
//     }
//   }

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div>
//         <button
//           onClick={createRoom}
//           className="px-6 py-3 bg-blue-500 text-white rounded"
//         >
//           Create Meeting
//         </button>
//         {roomID && <p>Room ID: {roomID}</p>}
//       </div>
//     </div>
//   )
// }

// export default CreateMeeting
import React from 'react'

const Room = () => {
  return <div>Room</div>
}

export default Room

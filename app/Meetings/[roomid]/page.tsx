'use client'
import React, { useEffect, useRef } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
const JoinMeeting = () => {
  const roomID = 'b099d095-42b7-4b9d-aa86-772f83521f6d'
  const meetingContainerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const joinMeeting = async () => {
      if (!meetingContainerRef.current) return
      try {
        const appID = 1506695392
        const serverSecret = 'e822d72e405e1625b6f1a90e693dae3b'
        // Generate Kit Token using the roomID
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          roomID, // unique user ID for joining
          'guest_' + Date.now(), // a unique user name
          720
        )
        // Create instance object from Kit Token
        const zp = ZegoUIKitPrebuilt.create(kitToken)
        // Start the meeting
        zp.joinRoom({
          container: meetingContainerRef.current,
          sharedLinks: [
            {
              name: 'Shareable link',
              url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          maxUsers: 10,
        })
      } catch (error) {
        console.error('Error joining room:', error)
      }
    }

    joinMeeting()

    return () => {
      // Cleanup if necessary
      if (meetingContainerRef.current) {
        meetingContainerRef.current.innerHTML = ''
      }
    }
  }, [roomID])

  return <div className="w-full h-screen" ref={meetingContainerRef}></div>
}

export default JoinMeeting

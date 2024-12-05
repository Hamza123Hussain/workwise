import React, { useState, useEffect } from 'react'
import NoticeCard from './NoticeCard'
import { fetchAllNotices } from '@/functions/Notice/GetNotices'
import { Notice } from '@/utils/NoticeInterface'
import Loader from '../Loader'

const NoticeSlider: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // Fetch notices from the server
  const fetchNotices = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAllNotices()
      setNotices(data)
    } catch (error) {
      console.error('Error fetching notices:', error)
      setError('Failed to fetch notices. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotices()
  }, [])

  return (
    <div className="mx-auto">
      {loading ? (
        <p className="flex justify-center items-center min-h-screen">
          <Loader />
        </p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : notices.length > 0 ? (
        notices.map((notice) => (
          <div
            key={notice._id}
            className="flex justify-center items-center px-4 py-6"
          >
            <NoticeCard
              title={notice.title}
              description={notice.description}
              author={notice.author}
              date={notice.date}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No notices available.</p>
      )}
    </div>
  )
}

export default NoticeSlider

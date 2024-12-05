import React, { useState, useEffect } from 'react'
import NoticeCard from './NoticeCard'
import { fetchAllNotices } from '@/functions/Notice/GetNotices'
import { Notice } from '@/utils/NoticeInterface'
import Loader from '../Loader'
import NoticeCreate from './NoticeCreate'
const NoticesPage: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Company Notices
      </h1>
      <div>
        <NoticeCreate />
        {loading ? (
          <p className="flex justify-center items-center min-h-screen ">
            <Loader />
          </p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : notices.length > 0 ? (
          notices.map((notice) => (
            <NoticeCard
              key={notice._id}
              title={notice.title}
              description={notice.description}
              author={notice.author}
              date={notice.date}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No notices available.</p>
        )}
      </div>
    </div>
  )
}
export default NoticesPage

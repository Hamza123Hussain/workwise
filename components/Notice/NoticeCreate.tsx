// {
//   /* Form to Add Notice */
// }
// ;<div className="bg-gray-100 shadow-md rounded-lg p-6 mb-6">
//   <h2 className="text-xl font-semibold mb-4 text-blue-600">Add a New Notice</h2>
//   <div className="mb-3">
//     <label className="block text-sm font-medium text-gray-700">Title</label>
//     <input
//       type="text"
//       className="w-full px-4 py-2 border rounded-md"
//       value={newNotice.title}
//       onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
//     />
//   </div>
//   <div className="mb-3">
//     <label className="block text-sm font-medium text-gray-700">
//       Description
//     </label>
//     <textarea
//       className="w-full px-4 py-2 border rounded-md"
//       value={newNotice.description}
//       onChange={(e) =>
//         setNewNotice({ ...newNotice, description: e.target.value })
//       }
//     />
//   </div>
//   <div className="mb-3">
//     <label className="block text-sm font-medium text-gray-700">Author</label>
//     <input
//       type="text"
//       className="w-full px-4 py-2 border rounded-md"
//       value={newNotice.author}
//       onChange={(e) => setNewNotice({ ...newNotice, author: e.target.value })}
//     />
//   </div>
//   <button
//     className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
//     onClick={createNotice}
//   >
//     Create Notice
//   </button>
// </div>
// const createNotice = async () => {
//   try {
//     await axios.post('/api/notices', newNotice)
//     setNewNotice({ title: '', description: '', author: '' })
//     // Optionally, refetch notices after creating a new one
//     await fetchNotices()
//   } catch (error) {
//     console.error('Error creating notice:', error)
//     setError('Error creating notice. Please try again later.')
//   }
// }
// const [newNotice, setNewNotice] = useState({
//   title: '',
//   description: '',
//   author: '',
// })
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const NoticeCreate = () => {
  return (
    <Dialog>
      <DialogTrigger className=" bg-blue-400 p-4 rounded-lg">
        Create Notice
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default NoticeCreate

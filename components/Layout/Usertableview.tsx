import React from 'react'

const Usertableview = ({
  isTableView,
  setIsTableView,
}: {
  isTableView: boolean
  setIsTableView: (view: boolean) => void
}) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        className={`mr-2 px-4 py-2 rounded ${
          !isTableView ? 'bg-[#dfd7e7] text-white' : 'bg-[#9225ff] text-black'
        }`}
        onClick={() => setIsTableView(true)}
      >
        Table View
      </button>
      <button
        className={`px-4 py-2 rounded ${
          isTableView ? 'bg-[#dfd7e7] text-white' : 'bg-[#9225ff] text-black'
        }`}
        onClick={() => setIsTableView(false)}
      >
        User View
      </button>
    </div>
  )
}
export default Usertableview

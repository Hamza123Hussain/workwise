import React from 'react'

const Buttons = ({ setIsModalOpen }: { setIsModalOpen: any }) => {
  return (
    <div className=" flex items-center gap-2">
      <button
        onClick={() => setIsModalOpen(true)}
        className=" rounded-[100px] text-[16px] text-[#FFFFFF] px-5 py-2 bg-[#2563EB] "
      >
        Add Invoice
      </button>
      <select
        name=""
        id=""
        className=" border-2 border-[#E0E0E0] py-2 px-[10px] rounded-[8px]"
      >
        <option value="">Sort By</option>
        <option value="">Octtoppus</option>
        <option value="">Global Grads</option>
        <option value="">Power Pulse</option>
      </select>
    </div>
  )
}

export default Buttons

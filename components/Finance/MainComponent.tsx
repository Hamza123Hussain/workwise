// import React, { useState } from 'react'
// import Modal from './Modal'
// import PaymentTable from './PaymentTable'
// import InvoiceSummary from './InvoiceSummary'
// // import Buttons from './Buttons'
// const MainFinanceComponent = () => {
//   const [Payments, SetPayments] = useState([
//     {
//       ID: 'INV00025',
//       Name: 'Hamza Hussain',
//       Createdon: '22 Feb 2025',
//       Amount: '50,000',
//       Paid: '50,000',
//       PaymentMode: 'Cash',
//       Status: 'Paid',
//       PaidTo: 'Global Grads',
//     },
//     {
//       ID: 'INV00025',
//       Name: 'Hamza Hussain',
//       Createdon: '22 Feb 2025',
//       Amount: '50,000',
//       Paid: '50,000',
//       PaymentMode: 'Cash',
//       Status: 'UnPaid',
//       PaidTo: 'Global Grads',
//     },
//     {
//       ID: 'INV00025',
//       Name: 'Hamza Hussain',
//       Createdon: '22 Feb 2025',
//       Amount: '50,000',
//       Paid: '50,000',
//       PaymentMode: 'Cash',
//       Status: 'Partially Paid',
//       PaidTo: 'Global Grads',
//     },
//   ])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   return (
//     <div className=" flex flex-col gap-3 px-3">
//       <InvoiceSummary />
//       <hr className=" w-full" />
//       <div className=" flex justify-between px-5">
//         <h3 className=" text-[20px] text-[#001A67] font-bold">Invoices</h3>
//         <Buttons setIsModalOpen={setIsModalOpen} />
//       </div>
//       <PaymentTable Payments={Payments} />
//       {isModalOpen && (
//         <Modal
//           Payments={Payments}
//           setPayments={SetPayments}
//           setIsModalOpen={setIsModalOpen}
//         />
//       )}
//     </div>
//   )
// }
// export default MainFinanceComponent

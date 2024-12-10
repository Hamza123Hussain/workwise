'use client'
import CandidateCard from '@/components/Candidate/Card/Main'
import Dropdowns from '@/components/Tasks/Dropdowns'
import { GetCandidates } from '@/functions/Candidates/GetAllCandidates'
import { CandidateData } from '@/utils/CandidateInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const Candidates = () => {
  const [Candidates, SetCandidates] = useState<CandidateData[]>()
  const User = useSelector((state: RootState) => state.user)
  const fetchAllCandidates = async () => {
    const data = await GetCandidates(User.Email)
    SetCandidates(data)
  }
  useEffect(() => {
    fetchAllCandidates()
  }, [])
  return (
    <div className="mt-10">
      <h1 className="text-4xl font-semibold text-center text-gradient bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text my-5">
        Candidates
      </h1>
      <Dropdowns />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5  my-2">
        {Candidates?.map((candidate: CandidateData) => (
          <CandidateCard key={candidate._id} candidate={candidate} />
        ))}
      </div>
    </div>
  )
}
export default Candidates

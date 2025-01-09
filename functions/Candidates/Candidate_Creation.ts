import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import { CreateCandidateData } from '@/utils/Interfaces/CandidateInterface'
import axios from 'axios'

export const createCandidate = async (CandidateData: CreateCandidateData) => {
  try {
    // Send the CandidateData directly, without wrapping it in an object
    const response = await axios.post(
      `${ApiUrl}Api/Candidate/CreateNewCandidate`,
      { CandidateData } // Sending CandidateData directly as the body
    )

    if (response.status === 201) {
      console.log('Candidate created successfully:', response.data.candidate)
    } else {
      console.error('Error creating candidate:', response.status)
    }
  } catch (error) {
    console.error('Error creating candidate:', error)
  }
}

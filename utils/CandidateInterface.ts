export interface CreateCandidateData {
  Resume: string
  Age: number
  Name: string
  Email: string
  Phone: string
  LinkedInProfile: string
  ImageUrl: string
  Portfolio: string
  Position: string
  Qualification: string
  ExpectedSalary: number
  CurrentSalary: number
  Address: string
  ReferralDetails: ReferralDetails
}

export interface CandidateData {
  _id: string
  Name: string
  Age: number
  Email: string
  Phone: string
  LinkedInProfile: string
  ImageUrl: string
  Portfolio: string
  Position: string
  Qualification: string
  ExpectedSalary: number
  CurrentSalary: number
  Address: string
  Progress: string
  RejectionReason: string | null
  OfferDetails: OfferDetails
  Tags: string[]
  InterviewDate: Date | null
  InterviewFeedback: string | null
  Rating: number | null
  Notes: Note[]
  Resume: string | null
  Source: string
  UpdatedBy: string
  IsActive: boolean
  ReferralDetails: ReferralDetails | null // Added
  LastContacted: string // Added
  ApplicationDate: Date | null // Added

}

export interface OfferDetails {
  OfferedSalary: number
  JoiningDate: Date
  Status: string
}

export interface Note {
  Comment: string
  AddedBy: AddedBy
  AddedAt: Date
}

export interface AddedBy {
  Name: string
  Email: string
}

export interface ReferralDetails {
  ReferrerName: string
  ReferrerEmail: string
}


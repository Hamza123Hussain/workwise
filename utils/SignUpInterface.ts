export interface InputValues {
  email: string
  password: string
  Name: string
  Image: File | null
  Salary: string
  JobDescription: string
  JobTitle: string
  Role: string
}

export interface UserData {
  _id: string
  name: string
  email: string
  createdAt: string
  imageUrl: string
}

export interface UserFetched {
  _id: string
  Email: string
  JobTitle: string
  Name: string
  Salary: string
  createdAt: string
  imageUrl: string
  JobDescription: string
  Role: string
}

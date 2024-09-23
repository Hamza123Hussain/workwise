export interface InputValues {
  email: string
  password: string
  Name: string
  Image: File | null
}

export interface UserData {
  _id: string
  name: string
  email: string
  createdAt: string
  imageUrl: string
}

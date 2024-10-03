import CryptoJS from 'crypto-js'
import { UserData } from './SignUpInterface'

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string // Type assertion for the secret key

if (!SECRET_KEY) {
  throw new Error('Secret key is not defined')
}

// Function to encrypt data
export const encryptData = (data: UserData): string => {
  if (!SECRET_KEY) {
    throw new Error('Encryption failed: Secret key is missing.')
  }

  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

// Function to decrypt data
export const decryptData = (ciphertext: string) => {
  if (!SECRET_KEY) {
    throw new Error('Decryption failed: Secret key is missing.')
  }

  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8)

  try {
    return JSON.parse(decryptedData)
  } catch (error) {
    console.log(error)
  }
}

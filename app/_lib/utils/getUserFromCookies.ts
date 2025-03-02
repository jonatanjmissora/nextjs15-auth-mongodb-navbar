import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { getErrorMessage } from "./getErrorMessage"

export default async function getUserFromCookie() {
  const cookie = (await cookies()).get("usertoken")?.value
  
  if (cookie) {
    try {
      const decoded = jwt.verify(cookie, process.env.JWTSECRET!) as { username: string, _id: string, iat: number, exp: number }
      return decoded.username
    } catch (err) {
      console.log(getErrorMessage(err))
      return "jwk_error"
    }
  }
  else return undefined
}
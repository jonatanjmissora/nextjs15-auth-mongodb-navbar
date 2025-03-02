"use server"

import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import setUserToCookie from "../_lib/utils/setUserToCookie";
import { getErrorMessage } from "../_lib/utils/getErrorMessage";
import { userSchema, UserType } from "../_lib/shema/user.schema";
import { getCollection } from "../_lib/mongodb/connect";

export type ResponseType = {
  success: boolean;
  prevState: { username: string, userpassword: string },
  errors: { username: string, userpassword: string }
} | null

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getUserByName = async (name: string) => {
  const usersCollection = await getCollection("users")
  return await usersCollection.findOne({ username: name }) as UserType
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const insertUser = async (newUser: UserType) => {
  const usersCollection = await getCollection("users")
  return await usersCollection.insertOne(newUser)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const logout = async function () {
  const cookie = await cookies()
  cookie.delete("usertoken")
  redirect("/")
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const register = async (prevState: ResponseType, formData: FormData) => {

  let username = formData.get("username") as string
  let userpassword = formData.get("userpassword") as string

  const registerResponse = {
    success: false,
    prevState: { username, userpassword },
    errors: { username: "", userpassword: "" }
  }

  // data-validation
  const { success, data, error } = userSchema.safeParse({ username, userpassword })
  if (!success) {
    const { username: userError, userpassword: passwordError } = error.flatten().fieldErrors
    registerResponse.errors = { 
      username: userError ? userError[0] : "", 
      userpassword: passwordError ? passwordError[0] : "" 
    }
    return registerResponse
  }

  const obj = {name: "hola", last: "manola"}
  const obj2 = {...obj}

  // verificacion de nombre registrado
  const user = await getUserByName(username)
  if (user) {
    registerResponse.errors.username = "nombre ya registrado"
    registerResponse.errors.userpassword = ""
    return registerResponse
  }

  // si todo esta bien creo el usuario en la base de datos
  const salt = bcrypt.genSaltSync(10)
  userpassword = bcrypt.hashSync(userpassword, salt)

  let redirectPath = null

  try {
    //insertar en DB
    const res = await insertUser(data)
    if (!res.insertedId.toString()) {
      registerResponse.errors.username = ""
      registerResponse.errors.userpassword = "Error en el servidor"
      return registerResponse
    }
    await setUserToCookie(username, res.insertedId.toString())
    console.log("HASTA ACA LLEGO")
    redirectPath = "/"
  } catch (error) {
    registerResponse.errors.userpassword = getErrorMessage(error)
    redirectPath = "/register"
    return registerResponse
  }
  finally {
    if (redirectPath)
      redirect(redirectPath)
    else return registerResponse
  }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const login = async function (prevState: ResponseType, formData: FormData) {

  let username = formData.get("username") as string
  let userpassword = formData.get("userpassword") as string

  const loginResponse = {
    success: false,
    prevState: { username, userpassword },
    errors: { username: "", userpassword: "" }
  }

  // server-validation
  const { success, data, error } = userSchema.safeParse({ username, userpassword })
  if (!success) {
    const { username: userError, userpassword: passwordError } = error.flatten().fieldErrors
    loginResponse.errors = { 
      username: userError ? userError[0] : "", 
      userpassword: passwordError ? passwordError[0] : "" 
    }
    return loginResponse
  }

  // verificacion de usuario registrado
  const user = await getUserByName(username)
  if (!user) {
    loginResponse.errors.username = "usuario no registrado"
    loginResponse.errors.userpassword = ""
    return loginResponse
  }

  // verificacion de contraseña almacenada
  const matchOrNot = bcrypt.compareSync(userpassword, user.userpassword)
  if (!matchOrNot) {
    loginResponse.errors.username = ""
    loginResponse.errors.userpassword = "La contraseña no corresponde al usuario"
    return loginResponse
  }

  // si todo esta bien
  if (user._id) {
    await setUserToCookie(username, user._id.toString() || "")
    redirect("/")
  }
  redirect("/login")

}
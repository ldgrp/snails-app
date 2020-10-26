import { UserModel, TokenResponse } from "../model/user"

import { axios_ } from "./index"
import { AxiosResponse, AxiosError } from "axios"

export const register = (name: string, username: string, password: string) : Promise<string> => 
  new Promise((resolve, reject) => {
    const data = {"name": name, "username": username, "password": password}
    axios_.post<TokenResponse>('/user/register', data)
      .then((response: AxiosResponse<TokenResponse>) => 
        resolve(response.data.access_token)
      )
      .catch((error: AxiosError) => {
        console.log(error.response?.data)
        console.log(error.response?.status)
        reject(error.response?.data)
      })
  })


export const login = (username: string, password: string) : Promise<string> => 
  new Promise((resolve, reject) => {
    const data = {"username": username, "password": password}
    axios_.post<TokenResponse>('/user/login', data)
      .then((response: AxiosResponse<TokenResponse>) => 
        resolve(response.data.access_token)
      )
      .catch((error: AxiosError) => {
        console.log(error.response?.data)
        console.log(error.response?.status)
        reject(error.response?.data)
      })
  })


export const getUser = (username: string) : Promise<UserModel> => 
  new Promise((resolve, reject) => {
    axios_.get<UserModel>(`/user/${username}`)
      .then((response: AxiosResponse<UserModel>) => 
        resolve(response.data)
      )
      .catch((error: AxiosError) => {
        console.log(error.response?.data)
        console.log(error.response?.status)
        reject(error.message)
      })
  })
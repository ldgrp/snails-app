import { axios_ } from "."
import { AxiosResponse, AxiosError } from "axios"
import { MessageId, MessageModel, ThreadModel } from "../model/message" 
import { UserId } from "../model/user" 

export const getMessage = (message_id: MessageId): Promise<MessageModel> =>
  new Promise((resolve, reject) => {
    axios_.get<MessageModel>(`/message/${message_id}`)
      .then((response: AxiosResponse<MessageModel>) => {
        resolve(response.data)
      })
      .catch((error: AxiosError) => {
        console.log(error.response?.data)
        console.log(error.response?.status)
        reject(error.message)
      })
  })

export const getMessages = (): Promise<ThreadModel[]> =>
  new Promise((resolve, reject) => {
    axios_.get<ThreadModel[]>(`/messages`)
      .then((response: AxiosResponse<ThreadModel[]>) => {
        resolve(response.data)
      })
      .catch((error: AxiosError) => {
        console.log(error.response?.data)
        console.log(error.response?.status)
        reject(error.message)
      })
  })

export const getMessagesByUser = (user_id: UserId): Promise<MessageModel[]> =>
  new Promise((resolve, reject) => {
    axios_.get<MessageModel[]>(`/messages/${user_id}`)
      .then((response: AxiosResponse<MessageModel[]>) => {
        resolve(response.data)
      })
      .catch((error: AxiosError) => {
        console.log(error.response?.data)
        console.log(error.response?.status)
        reject(error.message)
      })
  })

export const createMessage = (user_id: UserId, content: string): Promise<MessageModel> =>
  new Promise((resolve, reject) => {
    axios_.post<MessageModel>(`/message/user/${user_id}?content=${content}`)
      .then((response: AxiosResponse<MessageModel>) => {
        resolve(response.data)
      })
      .catch((error: AxiosError) => {
        console.log(error.response?.data)
        console.log(error.response?.status)
        reject(error.message)
      })
  })
import { EntryModel, EntryId } from "../model/entry"
import { UserModel } from "../model/user"

import { axios_ } from "./index"
import { AxiosResponse, AxiosError } from "axios"


// Get `count` entries starting from `beforeId` and/or to `afterId` 
export const getEntries = (count?: number, before_id?: string, after_id?: string) : Promise<EntryModel[]> =>
  new Promise((resolve, reject) => {
      const count_ = count ? `count=${count}&` : ""
      const before_id_ = before_id ? `count=${before_id}&` : ""
      const after_id_ = after_id ? `count=${after_id}&` : ""
      const query_string = count || before_id || after_id ? `?${count_}${before_id_}${after_id_}` : ""

      axios_.get<EntryModel[]>(`/entries${query_string}`)
        .then((response: AxiosResponse<EntryModel[]>) => {
          resolve(response.data)
        })
        .catch((error: AxiosError) => {
          console.log(error.response?.data)
          console.log(error.response?.status)
          reject(error.message)
        })
      })

export const getReplies = (entry_id: string) : Promise<EntryModel[]> =>
  new Promise((resolve, reject) => {
      axios_.get<EntryModel[]>(`/entry/replies/${entry_id}`)
        .then((response: AxiosResponse<EntryModel[]>) => {
          console.log(response.data)
          resolve(response.data)
        })
        .catch((error: AxiosError) => {
          console.log(error.response?.data)
          console.log(error.response?.status)
          reject(error.message)
        })
      })

export const createEntry = (content: string, reply_to?: EntryId): Promise<EntryModel> => 
  new Promise((resolve, reject) => {
    const reply_to_ = reply_to ? `reply_to=${reply_to}` : ""
    console.log(`/entry?content=${content}&${reply_to_}`)
    axios_.post<EntryModel>(`/entry?content=${content}&${reply_to_}`)
        .then((response:AxiosResponse<EntryModel>) => {
          resolve(response.data)
        })
        .catch((error: AxiosError) => {
          console.log(error.response?.data)
          console.log(error.response?.status)
          reject(error.message)
        })
      })

export const likeEntry = (entry_id: string): Promise<EntryModel> => 
  new Promise((resolve, reject) => {
    axios_.post<EntryModel>(`/entry/like/${entry_id}`)
        .then((response:AxiosResponse<EntryModel>) => {
          resolve(response.data)
        })
        .catch((error: AxiosError) => {
          console.log(error.response?.data)
          console.log(error.response?.status)
          reject(error.message)
        })
      })

export const unlikeEntry = (entry_id: string): Promise<EntryModel> => 
  new Promise((resolve, reject) => {
    axios_.post<EntryModel>(`/entry/unlike/${entry_id}`)
        .then((response:AxiosResponse<EntryModel>) => {
          resolve(response.data)
        })
        .catch((error: AxiosError) => {
          console.log(error.response?.data)
          console.log(error.response?.status)
          reject(error.message)
        })
      })
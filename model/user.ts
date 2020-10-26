import { Computed, computed, Thunk, Action, thunk, action } from "easy-peasy"
import { Injections } from '../store'

import { axios_ } from '../services/index'

export type UserId = string
export interface UsersModel {
  items: Record<UserId, UserModel>
  user: UserModel | null
  token: string | null
  login: Thunk<UsersModel, {username: string, password: string}, Injections>
  register: Thunk<UsersModel, {username: string, password: string}, Injections>
  addToken: Action<UsersModel, {user: UserModel, token: string}>
  clear: Action<UsersModel>
  isLoggedIn: Computed<UsersModel, boolean>
}

export interface UserModel {
  created_at: Date
  name: string
  username: string
  user_id: UserId
}

export interface TokenResponse {
  access_token: string
}


const usersModel: UsersModel = {
  items: {},
  user: null,
  token: null,

  login: thunk(async (actions, {username, password}, { injections }) => {
    const { userService } = injections
    actions.clear()
    const token = await userService.login(username, password)
    const user = await userService.getUser(username)
    actions.addToken({user, token})
  }),

  register: thunk(async (actions, {username, password}, { injections }) => {
    const { userService } = injections
    actions.clear()
    const token = await userService.login(username, password)
    const user = await userService.getUser(username)
    actions.addToken({user, token})
  }),

  clear: action((state) => {
    state.user = null
    state.token = null
  }),

  addToken: action((state, {user, token}) => {
    state.user = user
    state.token = token

    axios_.defaults.headers['Authorization'] = `Bearer ${token}`
  }),

  isLoggedIn: computed(state => state.token != null)
}

export default usersModel
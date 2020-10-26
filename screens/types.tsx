import { UserModel } from "../model/user"

export type MainStackParamList = {
  Home: undefined
  Profile: { id: string }
  Camera: undefined
  MessageStack: undefined
}

export type MessageStackParamList = {
  Messages: undefined
  Message: { receiver: UserModel }
}

export type OnboardStackParamList = {
  Login: undefined
  Register: undefined
}

export type RootStackParamList = {
  Main: undefined
  CreatePost: undefined
}


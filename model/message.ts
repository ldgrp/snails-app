import { Action, action, Thunk, thunk, Computed, computed } from "easy-peasy";
import { Injections } from '../store';
import { UserId, UserModel } from "./user";
import { StoreModel } from ".";
import { useLinkBuilder } from "@react-navigation/native";
import { getMessage, getMessages } from "../services/message-service";

export type MessageId = string

export interface MessagesModel {
  // a map from ids to entries in insertion order
  threads: Record<UserId, ThreadModel>,
  // add an item to the store
  //addItem: Action<MessagesModel, MessageModel>,
  // add items to the store
  //addItems: Action<MessagesModel, MessageModel[]>

  updateThread: Action<MessagesModel, ThreadModel>,

  createMessage: Thunk<MessagesModel, {user_id: UserId, content: string}, Injections>
  //getMessage: Thunk<MessagesModel, {message_id: MessageId}, Injections>,
  getMessages: Thunk<MessagesModel, {}, Injections>,
}

export interface MessageModel {
  content: string
  created_at: Date
  message_id: MessageId
  _from: UserModel
  to: UserModel
}

export interface ThreadModel {
  _from: UserModel
  to: UserModel
  messages: MessageModel[]
}

const messagesModel: MessagesModel = {
  threads: {},
  //addItem: action((state, message) => {
  //  state.items[message.message_id] = message
  //}),
  //addItems: action((state, messages) => {
  //  messages.forEach(message => state.items[message.message_id] = message);
  //}),
  updateThread: action((state, thread) => {
    state.threads[thread.to.user_id] = thread
  }),
  createMessage: thunk(async (actions, payload, {injections}) => {
    const { user_id, content } = payload
    const { messageService: messageService } = injections
    const message = await messageService.createMessage(user_id, content)
    //actions.addItem(message)
  }),
  //getMessage: thunk(async (actions, payload, {injections}) => {
  //  const { message_id } = payload
  //  const { messageService: messageService } = injections
  //  const message = await messageService.getMessage(message_id)
  //  actions.addItem(message)
  //}),
  getMessages: thunk(async (actions, payload, {injections}) => {
    const { messageService: messageService } = injections
    const messages = await messageService.getMessages()
    //actions.addItems(messages.flatMap(m => m.messages))
    messages.forEach(m => actions.updateThread(m))
  }),
}

export default messagesModel
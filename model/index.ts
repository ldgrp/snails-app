import entriesModel, { EntriesModel } from './entry'
import usersModel, { UsersModel } from './user'
import messagesModel, { MessagesModel } from './message'

export interface StoreModel {
  entries: EntriesModel
  users: UsersModel
  messages: MessagesModel
}

const storeModel: StoreModel = {
  entries: entriesModel,
  users: usersModel,
  messages: messagesModel,
}

export default storeModel
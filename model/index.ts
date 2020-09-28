import entriesModel, { EntriesModel } from './entry'

export interface StoreModel {
  entries: EntriesModel
}

const storeModel: StoreModel = {
  entries: entriesModel
}

export default storeModel
import { Action, action, Thunk, thunk, Computed, computed } from "easy-peasy";
import { Injections } from '../store';
import { UserModel } from "./user";

export type EntryId = string
export interface EntriesModel {
  // a map from ids to entries in insertion order
  items: Record<EntryId, EntryModel>,
  replies: Record<EntryId, EntryModel[]>,
  // liked
  // add an item to the store
  addItem: Action<EntriesModel, EntryModel>,
  // add items to the store
  addItems: Action<EntriesModel, EntryModel[]>
  addReplies: Action<EntriesModel, {entry_id: EntryId, replies: EntryModel[]}>
  likeEntry: Thunk<EntriesModel, {entry_id: EntryId, set: boolean}>
  createEntry: Thunk<EntriesModel, {content: string, reply_to?: EntryId}>
  getEntry: Thunk<EntriesModel, EntryId, Injections, EntryModel>,
  getEntries: Thunk<EntriesModel, {count?: number, beforeId?: string, afterId?: string}, Injections>,
  getReplies: Thunk<EntriesModel, {entry_id: EntryId} , Injections>,
}

export interface EntryModel {
  content: string
  created_at: Date
  entry_id: EntryId
  liked_by: UserModel[]
  replies: EntryId[]
  reply_to?: EntryId
  author: UserModel
}

const entriesModel: EntriesModel = {
  items: {},
  replies: {},
  // retrieve the n most recent entries
  getEntries: thunk(async (actions, payload, { injections }) => {
    const { count, beforeId, afterId } = payload
    const { entryService: entryService } = injections
    const entries: EntryModel[] = await entryService.getEntries(count, beforeId, afterId)
    actions.addItems(entries)
  }),
  getReplies: thunk(async (actions, payload, { injections }) => {
    const { entry_id } = payload
    const { entryService: entryService } = injections
    const replies: EntryModel[] = await entryService.getReplies(entry_id)
    actions.addReplies({entry_id, replies})
  }),
  addReplies: action((state, {entry_id, replies}) => {
    state.replies[entry_id] = replies
  }),
  addItems: action((state, entries) => {
    entries.forEach(entry => state.items[entry.entry_id] = entry)
  }),
  addItem: action((state, entry) => {
    state.items[entry.entry_id] = entry
  }),
  createEntry: thunk(async (actions, {content, reply_to}, { injections }) => { 
    const { entryService } = injections
    const entry: EntryModel = await entryService.createEntry(content, reply_to)
    actions.getEntries({})
  }),
  likeEntry: thunk(async (actions, payload, { getState, injections }) => {
    const { entry_id, set } = payload
    const { entryService } = injections
    if (set) {
      const entry: EntryModel = await entryService.likeEntry(entry_id)
      actions.addItem(entry)
    } else {
      const entry: EntryModel = await entryService.unlikeEntry(entry_id)
      actions.addItem(entry)
    }
  }),
  getEntry: thunk(async(actions, id, { getState, injections }) => {
    const { entryService } = injections
    return getState().items[id]
  })
}

export default entriesModel;
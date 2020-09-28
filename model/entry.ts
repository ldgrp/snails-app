import { Action, action, Thunk, thunk } from "easy-peasy";
import { Injections } from '../store';

export interface EntriesModel {
  items: Map<string, EntryModel>,
  retrievedEntries: Action<EntriesModel, EntryModel[]>,
  retrieveEntries: Thunk<EntriesModel, {count?: number, from_id?: string}, Injections>,
  addEntry: Thunk<EntriesModel, string>
  addedEntry: Action<EntriesModel, EntryModel>,
  likeEntry: Thunk<EntriesModel, string>
  likedEntry: Action<EntriesModel, EntryModel>
}

export interface EntryModel {
  content: string
  created_at: Date
  entry_id: string
  liked_by: AuthorModel[]
  replies: string[]
  reply_to?: string
  author: AuthorModel
};

export interface AuthorModel {
  created_at: Date
  name: string
  user_id: number
  username: string
};

const entriesModel: EntriesModel = {
  items: new Map(),
  // append retrieved entries
  retrievedEntries: action((state, entry) => {
    entry.forEach(entry => state.items.set(entry.entry_id, entry))
  }),
  // retrieve the n most recent entries
  retrieveEntries: thunk(async (actions, payload, { injections }) => {
    const { count, from_id } = payload
    const { entryService: entryService } = injections
    const entries: EntryModel[] = await entryService.retrieve(count, from_id)
    actions.retrievedEntries(entries)
  }),
  addedEntry: action((state, entry) => {
    state.items.set(entry.entry_id, entry)
  }),
  addEntry: thunk(async (actions, content, { injections }) => { 
    const { entryService } = injections
    const entry: EntryModel = await entryService.add(content)
    actions.addedEntry(entry)
  }),
  likeEntry: thunk(async (actions, id, { injections }) => {
    const { entryService } = injections
    const entry: EntryModel = await entryService.like(id)
    actions.likedEntry(entry)
  }),
  likedEntry: action((state, entry) => {
    state.items.set(entry.entry_id, entry)
  })
}

export default entriesModel;
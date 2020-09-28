import * as entryService from './services/entry-service'
import { createStore } from 'easy-peasy';
import storeModel from './model';

export interface Injections {
  entryService: typeof entryService
}
const store = createStore(storeModel, {
  injections: { entryService: entryService }
});

export default store;
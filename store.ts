import * as entryService from './services/entry-service'
import * as userService from './services/user-service'
import * as messageService from './services/message-service'
import { createStore } from 'easy-peasy';
import storeModel from './model';

export interface Injections {
  entryService: typeof entryService
  userService: typeof userService
  messageService: typeof messageService
}
const store = createStore(storeModel, {
  injections: { 
    entryService: entryService, 
    userService: userService, 
    messageService: messageService 
  }
});

export default store;
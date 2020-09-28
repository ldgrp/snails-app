import { EntryModel, AuthorModel } from "../model/entry"
import 'react-native-get-random-values'
import { v4 as uuid } from "uuid"

const amityAuthor: AuthorModel =
  {
    "created_at": new Date(),
    "name": "Amity Blight",
    "user_id": 0,
    "username": "amityblight",
  }
const edaAuthor: AuthorModel =
  { "created_at": new Date(),
    "name": "Eda Clawthorne",
    "user_id": 1,
    "username": "theowllady",
  }
const kingAuthor: AuthorModel =
  { "created_at": new Date(),
    "name": "King",
    "user_id": 2,
    "username": "billcipher",
  }
const gusAuthor: AuthorModel =
  { "created_at": new Date(),
    "name": "Gus",
    "user_id": 3,
    "username": "itsgus",
  }
const hootyAuthor: AuthorModel = 
  { "created_at": new Date(),
    "name": "Hooty",
    "user_id": 3,
    "username": "alexhirsch",
  }


const content = Array.from(Array(100).keys()).map(x => x.toString())
const amityContent: string[] = [
  "I bet you did. I've got my eyes on you, Half-a-Witch. That badge is mine.",
  "Lets see what kind of witch you are.",
  "Shut up.",
  "Me, on a team- with you? Running around in cute uniforms- sweating? I gotta go!",
];
const edaContent: string[] = [
  "I'm Eda, the Owl Lady. The most powerful witch on the Boiling Isles.",
  "Alright, kid, listen to me. I'm going away, and I don't know if I can bounce back this time. Watch over King, remember to feed Hooty, and Luz, thank you, for being in my life.",
];
const kingContent: string[] = [
  "Bap!",
  "The King of Demons is back!",
  "Finally, all that mean-spirited laughter made me sleepy",
  "That was actually one of her better breakups"
];
const gusContent: string[] = [
  "Should i turn to forbidden sources?",
];

const makeEntries = (contents: string[], author: AuthorModel): EntryModel[] => 
  contents.map(content => ({
      content: content,
      created_at: new Date(),
      entry_id: uuid(),
      liked_by: [],
      replies: [],
      reply_to: "",
      author: author,
  }))

const amityPosts = makeEntries(amityContent, amityAuthor)
const edaPosts = makeEntries(edaContent, edaAuthor)
const kingPosts = makeEntries(kingContent, kingAuthor)
const gusPosts = makeEntries(gusContent, gusAuthor)

const shuffle = (array:any) => 
  [...Array(array.length)]
    .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
    .reduce( (a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);

var posts: EntryModel[] = shuffle([...amityPosts, ...edaPosts, ...kingPosts, ...gusPosts])
var posts = posts.concat(makeEntries(content, amityAuthor))

var x = posts.length;
posts = posts.map(post => {var d = new Date(); d.setHours(x--); post.created_at=d; return post})

export const retrieve = (count?: number, from_id?: string) : Promise<EntryModel[]> =>
  new Promise((resolve, reject) => 
    setTimeout(() => {
      if (from_id === undefined) {
        resolve(posts.slice(0, count))
      } else {
        const from = posts.filter(post => post.entry_id === from_id)[0].created_at
        resolve(posts.filter(post => post.created_at <= from && post.entry_id !== from_id).slice(0, count))
      }
    }, 1000))

export const add = (content: string): Promise<EntryModel> => 
  new Promise((resolve, reject) => 
    setTimeout(() => resolve(makeEntries([content], hootyAuthor)[0]), 5000))

export const like = (id: string): Promise<EntryModel> => 
  new Promise((resolve, reject) => {
    const post = posts.filter(post => post.entry_id === id)[0]

    if (post == null) {
      reject("Invalid post")
    }

    // unlike
    if (post.liked_by.some(author => author === hootyAuthor)) {
      post.liked_by.splice(post.liked_by.indexOf(hootyAuthor))
      const newPost = Object.assign({}, post)
      setTimeout(() => resolve(newPost), 500)
    } else {
    // like
      post.liked_by.push(hootyAuthor);
      const newPost = Object.assign({}, post);
      
      setTimeout(() => resolve(newPost), 500)
    }
  })
import { FETCH_USERS, ADD_GROUP, FETCH_GROUPS, CLEAR_GROUPS, FETCH_MESSAGES, SELECT_USER, SELECT_GROUP } from "../types"

const handlers = {
  [FETCH_USERS]: (state, {payload}) => ({...state, users: payload }),
  [FETCH_GROUPS]: (state, {payload}) => ({...state, groupsList: payload }),
  [ADD_GROUP]: (state, {payload}) => ({...state, groupsList: [...state.groupsList, payload]}),
  [CLEAR_GROUPS]: (state) => ({...state, groupsList: []}),
  [FETCH_MESSAGES]: (state, {payload}) => ({...state, messages: payload}),
  [SELECT_USER]: (state, {payload}) => ({...state, currentUserInfo: payload}),
  [SELECT_GROUP]: (state, {payload}) => ({...state, currentGroup: payload}),
  DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
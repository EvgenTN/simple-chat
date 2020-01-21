import { ADD_USER, FETCH_USERS } from "../types"

const handlers = {
  [ADD_USER]: (state, {payload}) => ({
    ...state,
    users: [...state.users, payload]
  }),
  [FETCH_USERS]: (state, payload) => ({...state, users: payload }),
  DEFAULT: state => state
}


export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
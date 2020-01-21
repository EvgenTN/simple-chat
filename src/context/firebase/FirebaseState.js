import React, { useReducer } from 'react'
import firebase from '../../firebase'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { FETCH_USERS } from '../types'

export const FirebaseState = ({children}) => {
  const initialState = {
    users: []
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const fetchUsers = () => {
    firebase.firestore().collection('users').onSnapshot((snapshot) => {
      const payload = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      dispatch({type: FETCH_USERS, payload})
    })
  }

  return (
    <FirebaseContext.Provider value={{
      fetchUsers,
      users: state.users
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}


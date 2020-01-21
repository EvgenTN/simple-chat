import React, { useReducer } from 'react'
import firebase from '../firebase'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { FETCH_USERS } from '../types'

export const FirebaseState = ({children}) => {
  const initialState = {
    users: []
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const fetchUsers = () => {
    firebase.fireStore().collection('users').onSnapshot((snapshot) => {
      const newUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      dispatch({types: FETCH_USERS, newUsers})
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


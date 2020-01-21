import React, { useReducer } from 'react'
import firebase from '../../firebase'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { FETCH_USERS, ADD_USER } from '../types'

export const FirebaseState = ({ children }) => {
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

      dispatch({ type: FETCH_USERS, payload })
    })
  }

  const addUser = async (name, email) => {
    firebase
      .firestore()
      .collection('users')
      .add({
        name,
        email,
        groupIdList: []
      })
    // .then(payload => dispatch({ type: ADD_USER, payload }));




  }

  return (
    <FirebaseContext.Provider value={{
      fetchUsers,
      addUser,
      users: state.users
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}


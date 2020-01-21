import React, { useReducer } from 'react'
import firebase from '../../firebase'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { FETCH_USERS, ADD_USER, ADD_GROUP } from '../types'

export const FirebaseState = ({ children }) => {
  const initialState = {
    users: [],
    groupsList: []
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
  }

  const loadGroupList = (gListIds) => {
    gListIds.forEach(i => {
      firebase.firestore().collection('groups').doc(i).onSnapshot({
        includeMetadataChanges: true
      }, doc => {
        const payload = doc
        dispatch({ type: ADD_GROUP, payload })
      })
    })
  }

  return (
    <FirebaseContext.Provider value={{
      fetchUsers, addUser, loadGroupList,
      users: state.users,
      groupsList: state.groupsList
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}


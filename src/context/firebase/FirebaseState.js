import React, { useReducer, useEffect, useState } from 'react'
import firebase from '../../firebase'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { ADD_GROUP, CLEAR_GROUPS, FETCH_MESSAGES, SELECT_USER, SELECT_GROUP } from '../types'

export const FirebaseState = ({ children }) => {
  const initialState = {
    users: [],
    groupsList: [],
    messages: [],
    currentGroup: {}
  }

  const [currentUser, setCurrentUser] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setCurrentUser);
    return () => unsubscribe()
  }, [currentUser]);

  const loadSearchResult = (searchValue) => {
    if (!searchValue) {
      setSearchResult(null)
      return;
    };
    firebase.firestore().collection('groups').where('name', '>=', searchValue)
      .onSnapshot(snapShot => {
        const result = [];
        if (snapShot.empty) return;
        snapShot.docs.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setSearchResult(result);
      })
  }

  const loadGroupList = async (user) => {
    dispatch({ type: CLEAR_GROUPS })
    firebase.firestore().collection('users').where('email', '==', user.email)
      .onSnapshot(snapShot => {
        if (!snapShot.docs.length) return;
        snapShot.docs[0].data().groupIdList.forEach(i => {
          firebase.firestore().collection('groups').doc(i).onSnapshot({
            includeMetadataChanges: false
          }, doc => {
            const payload = {
              id: doc.id,
              ...doc.data()
            }
            dispatch({ type: ADD_GROUP, payload })
          })
        })
      })
  }

  const signIn = async ({ email, password }) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  }

  const signUp = async ({ email, password, name }) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = firebase.auth().currentUser;
    await user.updateProfile({
      displayName: name
    })
    await firebase
      .firestore()
      .collection('users')
      .add({
        email,
        groupIdList: []
      })
  }

  const signOut = () => {
    firebase.auth().signOut()
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  // const fetchUsers = () => {
  //   firebase.firestore().collection('users').onSnapshot((snapshot) => {
  //     const payload = snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }))

  //     dispatch({ type: FETCH_USERS, payload })
  //   })
  // }

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

  const selectUser = (payload) => {
    dispatch({ type: SELECT_USER, payload })
  }

  const selectGroup = (payload) => {
    dispatch({ type: SELECT_GROUP, payload })
  }

  const fetchMessages = (groupId) => {
    firebase.firestore().collection('messages').where('groupId', '==', groupId).orderBy('createdAt', 'asc')
      .onSnapshot(function (querySnapshot) {
        const payload = []
        querySnapshot.forEach(function (doc) {
          payload.push({
            id: doc.id,
            ...doc.data()
          });
        });

        dispatch({ type: FETCH_MESSAGES, payload })
      });
  }

  const addMessage = async ({ text, groupId, userId, userName }) => {
    firebase
      .firestore()
      .collection('messages')
      .add({
        createdAt: new Date(),
        text,
        groupId,
        userId,
        userName
      })
  }

  return (
    <FirebaseContext.Provider value={{
      currentUser, searchResult,
      addUser, loadGroupList, fetchMessages, selectGroup, addMessage, selectUser, signIn, signOut, signUp, loadSearchResult,
      users: state.users,
      groupsList: state.groupsList,
      messages: state.messages,
      currentGroup: state.currentGroup
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}


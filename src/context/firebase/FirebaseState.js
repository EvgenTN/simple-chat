import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import { FirebaseContext } from './firebaseContext'

export const FirebaseState = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [groupsList, setGroupsList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
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
    setGroupsList([])
    setMessages([])
    setCurrentGroup({})
    setSearchResult(null)
    firebase.firestore().collection('users').where('email', '==', user.email)
      .onSnapshot(snapShot => {
        if (!snapShot.docs.length) return;
        console.log(snapShot.docs[0].data())
        snapShot.docs[0].data().groupIdList.forEach(i => {
          firebase.firestore().collection('groups').doc(i).onSnapshot({
            includeMetadataChanges: false
          }, doc => {
            console.log('doc', doc)
            const payload = {
              id: doc.id,
              ...doc.data()
            }
            setGroupsList(prevState => {
              console.log('pS', prevState)
              const groupIndex = prevState.findIndex(group => group.id === payload.id)
              if (~groupIndex) {
                prevState[groupIndex] = payload
                return prevState
              } else {
                return [...prevState, payload]
              }

            })

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

  const selectGroup = (payload) => {
    setCurrentGroup(payload)
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
        setMessages(payload)
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
    firebase
      .firestore()
      .collection('groups')
      .doc(groupId)
      .update({
        lastMessage: text
      })
  }

  return (
    <FirebaseContext.Provider value={{
      currentUser, searchResult,
      addUser, loadGroupList, fetchMessages, selectGroup, addMessage, signIn, signOut, signUp, loadSearchResult,
      groupsList,
      messages,
      currentGroup
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}


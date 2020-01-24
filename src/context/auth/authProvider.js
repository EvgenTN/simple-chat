import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import { AuthContext } from './authContext'

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setCurrentUser);
    return () => unsubscribe()
  }, []);

  const loadCurrentUserInfo = async (user) => {
    firebase.firestore().collection('users').where('email', '==', user.email)
      .onSnapshot(snapShot => {
        const payload = snapShot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setCurrentUserInfo(payload[0])
      })
  }

  const signIn = async ({ email, password }) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    const user = firebase.auth().currentUser;
    await loadCurrentUserInfo(user)
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
    // await loadCurrentUserInfo(user)
  }

  const signOut = () => {
    firebase.auth().signOut()
  }

  console.log('cUser', currentUser)

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserInfo,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
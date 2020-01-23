import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import { AuthContext } from './authContext'

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  const signIn = async ({ email, password }) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  }

  const signUp = async ({ email, password, name }) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const user = firebase.auth().currentUser;
    await user.updateProfile({
      displayName: name
    })
    firebase
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

  console.log('cUser', currentUser)

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
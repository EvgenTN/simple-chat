import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import {AuthContext} from './authContext'

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  const login = ({email, password}) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  }

  const signUp = ({email, password}) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  console.log('cUser', currentUser)

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
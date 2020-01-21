import React, { useState } from 'react'
import firebase from '../firebase'

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addNewUser = (e) => {
    e.preventDefault()
    if (name.length && email.length) {
      firebase.firestore().collection('users').add({
        name,
        email,
        groupIdList: []
      })
    } else {alert('Incorrect data')}
  }
  return (
    <div className="Register-form">
      <h3>Add new user: </h3>
      <form name="register" onSubmit={addNewUser}>
        <input type="text" name="newUserName" placeholder="Enter your name" onChange={e => setName(e.target.value)} />
        <input type="email" name="newUserEmail" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
        <button type="submit">Add new user</button>
      </form>
    </div>
  )
}
import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../context/firebase/firebaseContext';

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { addUser } = useContext(FirebaseContext)


  const addNewUser = (e) => {
    e.preventDefault()
    if (name.length && email.length) {
      addUser(name, email)
        .then(_ => {
          setName('');
          setEmail('')
        });
    } else { alert('Incorrect data') }
  }
  return (
    <div className="Register-form">
      <h3>Add new user: </h3>
      <form name="register" onSubmit={addNewUser}>
        <input type="text" value={name} name="newUserName" placeholder="Enter your name" onChange={e => setName(e.target.value)} />
        <input type="email" value={email} name="newUserEmail" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
        <button type="submit">Add new user</button>
      </form>
    </div>
  )
}
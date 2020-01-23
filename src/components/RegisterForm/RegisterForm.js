import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { AuthContext } from '../../context/auth/authContext';

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  // const { addUser } = useContext(FirebaseContext)
  const { signUp, currentUser } = useContext(AuthContext)


  const addNewUser = (e) => {
    e.preventDefault()
    if (password.length && email.length) {
      // addUser(name, email)
      //   .then(_ => {
      //     setName('');
      //     setEmail('')
      //   });
      signUp({email, password})
    } else { alert('Incorrect data') }
  }

  const addName = (e) => {
    e.preventDefault()
    if (currentUser) {
      currentUser.updateProfile({
        displayName: name
      })
    }
  }

  return (
    <div className="Register-form">
      <h3>Add new user: </h3>
      <form name="register" onSubmit={addNewUser}>
        <input type="email" value={email} name="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Add new user</button>
      </form>
      <hr></hr>
      <form onSubmit={addName} >
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">Add name</button>
      </form>
    </div>
  )
}
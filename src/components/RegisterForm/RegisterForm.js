import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { AuthContext } from '../../context/auth/authContext';

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  // const { addUser } = useContext(FirebaseContext)
  const { signUp, signOut, currentUser } = useContext(AuthContext)


  const addNewUser = (e) => {
    e.preventDefault()
    if (password.length && email.length && name.length) {
      // addUser(name, email)
      //   .then(_ => {
      //     setName('');
      //     setEmail('')
      //   });
      signUp({ email, password, name }).then(() => {
        setName('');
        setEmail('');
        setPassword('')
      })
    } else { alert('Incorrect data') }
  }

  // const addName = (e) => {
  //   e.preventDefault()
  //   if (currentUser) {
  //     currentUser.updateProfile({
  //       displayName: name
  //     }).then(() => setName(''))
  //   }
  // }

  return (
    <div className="Register-form">
      <h3>Add new user: </h3>
      <form name="register" onSubmit={addNewUser}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} name="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Add new user</button>
      </form>
      <hr></hr>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
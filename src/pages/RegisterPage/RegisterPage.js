import React, { useState, useContext } from 'react'
import { Redirect, useHistory, Link } from 'react-router-dom';
import { FirebaseContext } from '../../context/firebase/firebaseContext';

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  const history = useHistory();
  const { signUp, currentUser } = useContext(FirebaseContext)

  const addNewUser = (e) => {
    e.preventDefault()
    if (password.length && email.length && name.length) {
      signUp({ email, password, name }).then(() => {
        history.push("/")
      })
    } else { alert('Incorrect data') }
  }

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Register-form">
      <h3>Add new user: </h3>
      <form name="register" onSubmit={addNewUser}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} name="email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} name="password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Add new user</button>
      </form>
      <hr></hr>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  )
}
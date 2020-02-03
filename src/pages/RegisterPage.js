import React, { useState, useContext } from 'react'
import { Redirect, useHistory, Link } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase/firebaseContext';

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
    <div className="w-full bg-gray-100 h-screen flex flex-col justify-center items-center">
      <h3 className="text-3xl mb-4 font-bold">Sign up</h3>
      <form name="register" className="bg-white border border-gray-400 rounded px-8 py-8 pt-8" onSubmit={addNewUser}>
        <label htmlFor="name" className="text-sm block font-bold  pt-2">Username</label>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400"/>
        <label htmlFor="email" className="text-sm block font-bold  pt-2">Email</label>
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400" />
        <label htmlFor="password" className="text-sm block font-bold pt-2">Password</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400" />
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Add new user</button>
        <p className="mt-8">
          Have account already? 
          <Link to="/login">
            <button className="bg-white hover:text-blue-600 text-blue-500 focus:outline-none focus:text-blue-700 font-semibold py-2 px-4 border-none">Login</button>
          </Link>
        </p>
      </form>
    </div>
  )
}
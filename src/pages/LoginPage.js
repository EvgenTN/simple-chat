import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { Redirect, useHistory, Link } from 'react-router-dom';

export const LoginPage = () => {

  const { signIn, currentUser} = useContext(FirebaseContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    signIn({email, password}).then(() => {
      history.push("/")
    })
  }

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="w-full bg-gray-100 h-screen flex flex-col justify-center items-center">
      <h3 className="text-3xl mb-4 font-bold">Sign in</h3>
      <form name="login" className="bg-white border border-gray-400 rounded px-8 py-8 pt-8" onSubmit={handleLogin}>
        <label htmlFor="email" className="text-sm block font-bold  pt-2">Email</label>
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400" />
        <label htmlFor="password" className="text-sm block font-bold pt-2">Password</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400" />
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
        <p className="mt-8">
          First time here?
          <Link to="/sign-up">
            <button className="bg-white hover:text-blue-600 text-blue-500 font-semibold focus:outline-none focus:text-blue-700 py-2 px-4 border-none">Sign Up</button>
          </Link>
        </p>
      </form>

    </div>
  )
}
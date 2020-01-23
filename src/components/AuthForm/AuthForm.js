import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { AuthContext } from '../../context/auth/authContext';

export const AuthForm = () => {

  // const [selectedUser, setSelectedUser] = useState({});
  const { loadGroupList, currenUserInfo } = useContext(FirebaseContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useContext(AuthContext)

  // useEffect(() => { 
  //   const unsubscribe = fetchUsers()
  //   return () => unsubscribe()
  //   // eslint-disable-next-line
  // }, []);

  const handleLogin = (e) => {
    e.preventDefault()
    signIn({email, password}).then(() => {
      loadGroupList(currenUserInfo.groupIdList)
    })
    // const list = users.find(user => user.id === selectedUser)
    // console.log('su', users.find(user => user.id === selectedUser))
  }

  return (
    <div className="Login-form">
      <h3>Who are you? </h3>
      <form name="login" onSubmit={handleLogin}>
        {/* <select placeholder="Select user" onChange={e => setSelectedUser(e.target.value)} name="uName" >
          <option>Select User</option>
          {
            users && users.map(i => (<option value={i.id} key={i.id}>{i.name}</option>))
          }
        </select> */}
        <input type="email" name="email" placeholder="Email" value={email} onChange={(e => setEmail(e.target.value))} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e => setPassword(e.target.value))} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

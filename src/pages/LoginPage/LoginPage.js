import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { Redirect, useHistory, Link } from 'react-router-dom';

export const LoginPage = () => {

  // const [selectedUser, setSelectedUser] = useState({});
  const { signIn, currentUser, currentUserInfo, loadGroupList } = useContext(FirebaseContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  
  // useEffect(() => { 
  //   const unsubscribe = fetchUsers()
  //   return () => unsubscribe()
  //   // eslint-disable-next-line
  // }, []);

  const handleLogin = (e) => {
    e.preventDefault()
    signIn({email, password}).then(() => {
      // currentUserInfo && loadGroupList(currentUserInfo.groupIdList)
      history.push("/")
    })
    // const list = users.find(user => user.id === selectedUser)
    // console.log('su', users.find(user => user.id === selectedUser))
  }

  if (currentUser) {
    return <Redirect to="/" />;
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
      <hr></hr>
      <Link to="/sign-up">
        <button>Sign Up</button>
      </Link>
    </div>
  )
}
import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../context/firebase/firebaseContext';

export const AuthForm = () => {

  const [selectedUser, setSelectedUser] = useState({});
  const { users, fetchUsers, loadGroupList, selectUser } = useContext(FirebaseContext)

  useEffect(() => { 
    const unsubscribe = fetchUsers()
    return () => unsubscribe()
    // eslint-disable-next-line
  }, []);

  const submit = (e) => {
    e.preventDefault()
    selectUser(users.find(user => user.id === selectedUser))
    // const list = users.find(user => user.id === selectedUser)
    // console.log('su', users.find(user => user.id === selectedUser))
    loadGroupList(users.find(user => user.id === selectedUser).groupIdList)
  }

  return (
    <div className="Login-form">
      <h3>Who are you? </h3>
      <form name="login" onSubmit={submit}>
        <select placeholder="Select user" onChange={e => setSelectedUser(e.target.value)} name="uName" >
          <option>Select User</option>
          {
            users && users.map(i => (<option value={i.id} key={i.id}>{i.name}</option>))
          }
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

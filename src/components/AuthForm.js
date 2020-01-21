import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const AuthPage = () => {

  const [userName, setUserName] = useState("evgen");
  const { users, fetchUsers } = useContext(FirebaseContext)

  useEffect(() => { 
    fetchUsers()
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Login-form">
      <h3>Who are you? </h3>
      <form name="login" >
        <select placeholder="Select user" onChange={e => setUserName(e.target.value)} name="uName" >
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

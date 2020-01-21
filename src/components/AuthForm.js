import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const AuthPage = () => {

  const [userName, setUserName] = useState("evgen");
  const { users, fetchUsers } = useContext(FirebaseContext)

  useEffect(_ => { fetchUsers() }, []);
  // const [userGroupListId, setUserGroupListId] = useState([]);
  // const [userGroupList, setUserGroupList] = useState([]);


  // const users = [
  //   { name: 'Evgen', id: '0' },
  //   { name: 'Yehor', id: '1' },
  // ]


  // const updateUserGroupListId = glid => {
  //   setUserGroupListId(glid);
  // console.log('ugl', userGroupList)
  // }
  // const updateUserGroupList = gl => {
  //   setUserGroupList(gl);
  //   console.log('ugl', userGroupList)
  // }

  return (
    <div className="Login-form">
      <h3>Who are you? </h3>
      <form name="login" >
        <select placeholder="Select user" onChange={e => setUserName(e.target.value)} name="uName" >
          <option></option>
          {
            users.map(i => (<option value={i.id}>{i.name}</option>))
          }
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

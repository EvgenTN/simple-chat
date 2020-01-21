import React, { useState } from 'react';
import firebase from '../firebase';

export const AuthPage = () => {

  const [userName, setUserName] = useState("evgen");
  // const [userGroupListId, setUserGroupListId] = useState([]);
  // const [userGroupList, setUserGroupList] = useState([]);

  const loadUserPage = async (e) => {    
    e.preventDefault()
    let uList;

    await firebase.firestore().collection('users').where('name', '==', userName).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          uList = doc.data()
        })
      })
    // updateUserGroupListId(uList.groupIdList)
    // loadUserGrops(uList.groupIdList)
    // console.log(uList)
  }
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
      <form name="login" onSubmit={loadUserPage}>
        <select placeholder="Select user" onChange={e => setUserName(e.target.value)} name="uName" >
          <option value="evgen" >evgen</option>
          <option value="yehor">yehor</option>
          <option value="third user">third user</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

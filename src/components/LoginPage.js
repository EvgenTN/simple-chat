import React, { useState } from 'react';
import firebase from '../firebase';
import { RegisterForm } from './RegisterForm';
import { AuthPage } from './AuthForm';

function LoginPage() {
  const [userName, setUserName] = useState("evgen");
  const [userGroupListId, setUserGroupListId] = useState([]);
  const [userGroupList, setUserGroupList] = useState([]);
  

  const updateUserGroupListId = glid => {
    setUserGroupListId(glid);
    // console.log('ugl', userGroupList)
  }
  const updateUserGroupList = gl => {
    setUserGroupList(gl);
    console.log('ugl', userGroupList)
  }

  const loadUserGrops = async () => {
    userGroupListId.map(id => {
      let gList
      let docRef = firebase.firestore().collection('groups').doc(id)
      docRef.get().then(function (doc) {
        console.log('dd', doc.data())
        gList = doc.data()
      })
      updateUserGroupList(gList)
      return gList
    })
    // updateUserGroupList()
  }

  const loadUserPage = async (e) => {
    e.preventDefault()
    let uList;
    await firebase.firestore().collection('users').where('name', '==', userName).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          uList = doc.data()
        })
      })
    updateUserGroupListId(uList.groupIdList)
    // loadUserGrops(uList.groupIdList)
    // console.log(uList)
  }

  return (
    <div className="Login-page">

      {/* <div className="Login-form">
        <h3>Who are you? </h3>
        <form name="login" onSubmit={loadUserPage}>
          <select placeholder="Select user" onChange={e => setUserName(e.target.value)} name="uName" >
            <option value="evgen" >evgen</option>
            <option value="yehor">yehor</option>
            <option value="third user">third user</option>
          </select>
          <button type="submit">Login</button>
        </form>
      </div> */}
      <AuthPage />

      {userGroupListId}
      <button onClick={loadUserGrops}>show group</button>
      {userGroupList}
      <hr></hr>
      <RegisterForm />
    </div>    
  )
}

export default LoginPage;
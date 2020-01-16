import React, { useState } from 'react';
import firebase from '../firebase';

function LoginPage() {
  const [userName, setUserName] = useState("evgen");
  const [userGroupList, setUserGroupList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addNewUser = (e) => {
    e.preventDefault()
    if (name.length && email.length) {
      firebase.firestore().collection('users').add({
        name,
        email,
        groupIdList: []
      })
    } else {alert('Incorrect data')}
  }

  const updateUserGroupList = gl => {
    setUserGroupList(gl);
    console.log('ugl', userGroupList)

  }

  const loadUserPage = async (e) => {
    e.preventDefault()
    let uList;
    await firebase.firestore().collection('users').where('name', '==', userName).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          uList = doc.data()
      })})
    updateUserGroupList(uList.groupIdList)
    console.log(uList)
  }

  return (
    <div className="Login-page">
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
      <hr></hr>
      <div className="Register-form">
        <h3>Add new user: </h3>
        <form name="register" onSubmit={addNewUser}>
          <input type="text" name="newUserName" placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
          <input type="email" name="newUserEmail" placeholder="Enter your email" onChange={e => setEmail(e.target.value)}/>
          <button type="submit">Add new user</button>
        </form>
      </div>
    </div>    
  )
}

export default LoginPage;
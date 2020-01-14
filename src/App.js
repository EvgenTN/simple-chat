import React, { useState} from 'react';
import './App.css';
import firebase from './firebase';

// firebase.firestore().collection('users').add({
//   name: "Yehor",
//   email: "yehor@gmail.com",
//   groupIdList: []
// })

function App() {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [message, setMessage] = useState("");

  const addUser = (e) => {
    e.preventDefault()
    firebase.firestore().collection('users').add({
        name,
        email: "yehor@gmail.com",
        groupIdList: []
      })
  }
  const addGroup = (e) => {
    e.preventDefault()
    firebase.firestore().collection('groups').add({
        name: group,
      })
  }

  const addMessage = async (e) => {
    e.preventDefault()
    let userId
    await firebase.firestore().collection('users').get().then(uList => {
      userId = uList.docs[1].id
    })
    let groupId
    await firebase.firestore().collection('groups').get().then(gList => {
      groupId = gList.docs[0].id
    })
    // console.log(groupId)
    firebase.firestore().collection('messages').add({
        text: message,
        createdAt: new Date(),
        groupId,
        userId
      })
  }

  const getU = async () => {
    let uList;
    await firebase.firestore().collection('users').where('email', '==', 'evgen@gmail.com').get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          uList = doc.data()
      })})
    console.log(uList)
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={addUser}>
          <input id="uName" placeholder="user name" onChange={e => setName(e.target.value)}/>
          <button type="submit">Add User</button>
        </form>
        <form onSubmit={addGroup}>
          <input id="gName" placeholder="group name" onChange={e => setGroup(e.target.value)}/>
          <button type="submit">Add Group</button>
        </form>
        <form onSubmit={addMessage}>
          <input id="mesName" placeholder="message" onChange={e => setMessage(e.target.value)}/>
          <button type="submit">Add Message</button>
        </form>
        <button onClick={getU}>Get user</button>
      </header>
    </div>
  );
}

export default App;

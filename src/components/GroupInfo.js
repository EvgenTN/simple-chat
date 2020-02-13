import React, { useContext } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'
// import {storage} from '../firebase'

export const GroupInfo = () => {

  const { currentGroup } = useContext(FirebaseContext)

  // const loadFile = (e) => {
  //   let file = e.target.files[0]
  //   console.log(e.target.files)
  //   // const storageRef = firebase.storage().ref()
  //   // var mountainImagesRef = storageRef.child('images/mountains.jpg');
  //   let filePath = 'images/' + file.name
  //   storage.ref(filePath).put(file).then(function(snapshot) {
  //     console.log('snapshot', snapshot)
  //     snapshot.ref.getDownloadURL().then(url => {
  //       console.log('url', url)
  //     });
  //   });
  // }

  // const showStorage = () => {
  //   console.log('aaa')
  // }
  
  return (
    <div>
      <h3 className="text-center uppercase text-lg font-bold" >{currentGroup.name}</h3>
      {/* <div>
        <input className="" type="file" onChange={(e) => loadFile(e)} />
      </div>
      <button className="sm bg-red-400" onClick={showStorage}>Show console</button> */}
    </div>
  )
}
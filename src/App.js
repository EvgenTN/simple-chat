import React from 'react';
import './App.scss';

import LoginPage from './components/LoginPage/LoginPage';
import { FirebaseState } from './context/firebase/FirebaseState';

function App() {
  // const [group, setGroup] = useState("");

  // const addGroup = (e) => {
  //   e.preventDefault()
  //   firebase.firestore().collection('groups').add({
  //     name: group,
  //   })
  // }

  return (
    <FirebaseState>
      <div className="App">
        <LoginPage />
      </div>
    </FirebaseState>

  );
}

export default App;

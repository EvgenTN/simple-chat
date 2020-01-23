import React from 'react';
import './App.scss';

import { LoginPage } from './pages/LoginPage/LoginPage';
import { FirebaseState } from './context/firebase/FirebaseState';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { AuthProvider } from './context/auth/authProvider';

function App() {
  // const [group, setGroup] = useState("");

  // const addGroup = (e) => {
  //   e.preventDefault()
  //   firebase.firestore().collection('groups').add({
  //     name: group,
  //   })
  // }

  return (
    <AuthProvider>
      <FirebaseState>
        <Router>
          <div className="App">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
          </div>
        </Router>
      </FirebaseState>
    </AuthProvider>
  );
}

export default App;

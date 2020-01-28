import React from 'react';
// import './App.scss';

import { LoginPage } from './pages/LoginPage/LoginPage';
import { FirebaseState } from './context/firebase/FirebaseState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { PrivateRoute } from './PrivateRoute';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

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
        <Router>
          <div className="App w-full h-screen">
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/sign-up" component={RegisterPage} />
            </Switch>
          </div>
        </Router>
      </FirebaseState>
  );
}

export default App;

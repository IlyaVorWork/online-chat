import React from 'react'
import './App.css';
import LoggedIn from './components/loggedIn/loggedIn'

import firebase from 'firebase'
import "firebase/auth"

import { useAuthState } from 'react-firebase-hooks/auth'

firebase.initializeApp({
  apiKey: "AIzaSyCIP-aH2JCHNd1O1NOjLJ_TVFLI-si3E8U",
  authDomain: "chat-ec583.firebaseapp.com",
  projectId: "chat-ec583",
  storageBucket: "chat-ec583.appspot.com",
  messagingSenderId: "727996685656",
  appId: "1:727996685656:web:2540f107d7433e0ab8192d"
});

const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()

function App() {

  const [user] = useAuthState(auth)

  const login = () => {
    auth.signInWithRedirect(provider)
    console.log(user)
  }

  const logout = () => {
    auth.signOut()
  }

  return (
    <div className="App">
      <header className="App-header">
        {user ? <button className="authButton" onClick={logout}>Выйти</button> : (<button className="authButton" onClick={login}>Войти</button>)}
        {user ? <LoggedIn data={user}/> : null}
      </header>
    </div>
  );
}

export default App

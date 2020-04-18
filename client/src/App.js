import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from 'react-router-dom'
import './App.css';

import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Post from './components/posts/Post'

import Authenticate from './components/auth/Authenticate';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Authenticate>
          <header className="header">
            <h3 className="logo">GamersSite</h3>

            <nav className="menu">
              <ul className="nav">
                <li className="nav-item">
                  <Link className="nav-item__link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-item__link" to="/posts">Post</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-item__link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <AuthButton />
                </li>
              </ul>
            </nav>
          </header>

          <main className="main">
            <Route exact path="/" component={Home} />
            <Route path="/posts" component={Post} />
            <Route path="/profile" component={Profile} />
          </main>
          <Redirect to="/" />
        </Authenticate>
      </Switch>
    </Router>
  )
}




function AuthButton() {
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("jwt")
    history.push("/login")
  }

  return (
    <button onClick={logout}>Logout</button>
  )
}



function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

function Profile() {
  return <h3>Protected</h3>;
}

export default App;

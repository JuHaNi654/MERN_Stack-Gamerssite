import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'

import fakeAuth from './components/Auth/Auth'
import Login from './components/Login/Login';
import Authenticate from './components/Auth/Authenticate'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Authenticate>
          <AuthButton />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">DashBoard</Link>
            </li>
            <li>
              <Link to="/protected">Protected page</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/protected" component={ProtectedPage} />
        </Authenticate>
      </Switch>
    </Router>
  )
}




function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button onClick={() => {
        fakeAuth.signout(() => history.push("/login"))
      }}>Sign out</button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    )
}



function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

export default App;

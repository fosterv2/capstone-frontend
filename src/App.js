import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './containers/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import About from './components/About'

class App extends Component {
  state = {
    posts: [],
    currentUser: {},
    loggedIn: false,
  }

  render() {
    return (
      <Router>
        <Navbar loggedIn={this.state.loggedIn} />
        <div>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/signup" render={props => <Signup {...props} />} />
          <Route exact path="/about" render={props => <About {...props} />} />
        </div>
      </Router>
    )
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import './css/Navbar.css'
import Home from './containers/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import About from './components/About'
import Post from './containers/Post'
import ProfileForm from './forms/ProfileForm'

class App extends Component {
  state = {
    posts: [],
    currentUser: {},
    loggedIn: !!localStorage.getItem("token"),
  }

  componentDidMount() {
    this.fetchPosts()
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/auth", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token
        }
      })
      .then(resp => resp.json())
      .then(user => {
        this.setState({ currentUser: user.user })
      })
    }
  }

  fetchPosts = () => {
    fetch("http://localhost:3000/posts")
    .then(resp => resp.json())
    .then(posts => this.setState({ posts }))
  }

  onLogin = response => {
    localStorage.setItem("token", response.jwt)
    this.setState({
      currentUser: response.user,
      loggedIn: true
    })
  }

  onSignOut = () => {
    localStorage.removeItem("token")
    this.setState({
      loggedIn: false,
      currentUser: {}
    })
  }

  handleUpdateUser = userInfo => {
    fetch(`http://localhost:3000/users/${userInfo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(resp => resp.json())
    .then(user => {
      this.setState({ currentUser: user })
    })
  }

  render() {
    const { loggedIn, posts, currentUser } = this.state
    return (
      <Router>
        <Navbar loggedIn={loggedIn} signOut={this.onSignOut} />
        <div>
          <Route exact path="/" render={props => <Home {...props} posts={posts} user={currentUser} loggedIn={loggedIn} />} />
          <Route exact path="/login" render={props => <Login {...props} onLogin={this.onLogin} />} />
          <Route exact path="/signup" render={props => <Signup {...props} onLogin={this.onLogin} />} />
          <Route exact path="/about" component={About} />
          <Route exact path="/posts/:post_id" render={props => <Post {...props} />} />
          <Route exact path="/update_user" render={props => <ProfileForm {...props} user={this.state.currentUser} handleUpdateProfile={this.handleUpdateUser} />} />
        </div>
      </Router>
    )
  }
}

export default App;

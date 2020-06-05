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

  render() {
    return (
      <Router>
        <Navbar loggedIn={this.state.loggedIn} />
        <div>
          <Route exact path="/" render={props => <Home {...props} posts={this.state.posts} />} />
          <Route exact path="/login" render={props => <Login {...props} onLogin={this.onLogin} />} />
          <Route exact path="/signup" render={props => <Signup {...props} onLogin={this.onLogin} />} />
          <Route exact path="/about" render={props => <About {...props} />} />
          <Route exact path="/posts/:post_id" render={props => <Post {...props} posts={this.state.posts} />} />
        </div>
      </Router>
    )
  }
}

export default App;

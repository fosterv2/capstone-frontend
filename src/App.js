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
import Group from './containers/Group'

class App extends Component {
  state = {
    posts: [],
    currentUser: {},
    loggedIn: !!localStorage.getItem("token"),
    groups: []
  }

  componentDidMount() {
    this.fetchPosts()
    this.fetchGroups()
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
    .then(posts => {
      posts.sort((a, b) => {
        if (a.created_at > b.created_at) {
          return -1
        } else if (a.created_at < b.created_at) {
          return 1
        } else {
          return 0
        }
      })
      this.setState({ posts })
    })
  }

  fetchGroups = () => {
    fetch("http://localhost:3000/groups")
    .then(resp => resp.json())
    .then(groups => this.setState({ groups }))
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

  handlePostSubmit = event => {
    const body = {
      content: event.target.content.value,
      post_img: event.target.img_url.value,
      user_id: this.state.currentUser.id,
      group_id: 2
    }
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(post => this.setState(prev => {
      return { posts: [post, ...prev.posts] }
    }))
  }
  
  handleLike = (id, likes) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    })
    .then(resp => resp.json())
    .then(postReturn => {
      this.setState(prev => {
        return { posts: prev.posts.map(post => post.id === id ? postReturn : post) }
      })
    })
  }

  render() {
    const { loggedIn, posts, currentUser, groups } = this.state
    return (
      <Router>
        <Navbar loggedIn={loggedIn} signOut={this.onSignOut} />
        <div>
          <Route exact path="/"
            render={props => <Home
              {...props}
              posts={posts}
              user={currentUser}
              loggedIn={loggedIn}
              handleSubmit={this.handlePostSubmit}
              handleLike={this.handleLike}
              groups={groups}
            />}
          />
          <Route exact path="/login" render={props => <Login {...props} onLogin={this.onLogin} />} />
          <Route exact path="/signup" render={props => <Signup {...props} onLogin={this.onLogin} />} />
          <Route exact path="/about" component={About} />
          <Route exact path="/posts/:post_id"
            render={props => <Post
              {...props}
              user={this.state.currentUser}
              handleLike={this.handleLike}
            />}
          />
          <Route exact path="/update_user"
            render={props => <ProfileForm
              {...props}
              user={this.state.currentUser}
              handleUpdateProfile={this.handleUpdateUser}
            />}
          />
          <Route exact path="/groups/:group_id" render={props => <Group {...props} />} />
        </div>
      </Router>
    )
  }
}

export default App;

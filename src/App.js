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
import AllGroups from './containers/AllGroups'
import PostForm from './forms/PostForm'
import { connect } from "react-redux";
import { fetchPosts, fetchGroups } from "./redux";

class App extends Component {
  state = {
    currentUser: {
      id: "",
    },
    loggedIn: !!localStorage.getItem("token")
  }

  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchGroups()
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
        this.setState({
          currentUser: user.user
        })
      })
    }
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
    const { loggedIn, currentUser } = this.state
    return (
      <Router>
        <Navbar loggedIn={loggedIn} signOut={this.onSignOut} />
        <div className="main">
          <Route exact path="/"
            render={props => <Home
              {...props}
              user={currentUser}
              loggedIn={loggedIn}
              handleLike={this.handleLike}
            />}
          />
          <Route exact path="/login" render={props => <Login {...props} onLogin={this.onLogin} />} />
          <Route exact path="/signup" render={props => <Signup {...props} onLogin={this.onLogin} />} />
          <Route exact path="/about" component={About} />
          <Route exact path="/posts/:post_id"
            render={props => <Post
              {...props}
              user={currentUser}
              posts={this.props.posts}
              handleLike={this.handleLike}
              loggedIn={loggedIn}
            />}
          />
          <Route exact path="/new_post"
            render={props => <PostForm
              {...props}
              user={currentUser}
            />}
          />
          <Route exact path="/update_user"
            render={props => <ProfileForm
              {...props}
              user={currentUser}
              handleUpdateProfile={this.handleUpdateUser}
            />}
          />
          <Route exact path="/groups"
            render={props => <AllGroups
              {...props}
              user={currentUser}
              handleSubmit={this.handleGroupSubmit}
              handleJoinClick={this.handleJoinGroup}
              handleLeaveClick={this.handleLeaveGroup}
            />}
          />
          <Route exact path="/groups/:group_id"
            render={props => <Group
              {...props}
              handleClickLeave={this.handleLeaveGroup}
            />}
          />
        </div>
      </Router>
    )
  }
}

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { fetchPosts } from "./redux";

// class App extends Component {
//   componentDidMount() {
//     this.props.fetchPosts()
//   }

//   render() {
//     return (
//       <div>There are {this.props.posts.length} posts</div>
//     )
//   }
// }

const mapStateToProps = state => {
  return {
    // posts: state.posts,
    groups: state.groups
    // user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchGroups: () => dispatch(fetchGroups())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

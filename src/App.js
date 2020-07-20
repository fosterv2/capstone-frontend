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
import Followee from './containers/Followee'
import Likes from './containers/Likes'
import { connect } from "react-redux";
import { fetchPosts, fetchGroups, setUser, clearUser, addPost, BASE_URL } from "./redux";

// const BASE_URL = "https://cat-space-backend.herokuapp.com/"
// const BASE_URL = "http://localhost:3000/"

class App extends Component {

  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchGroups()
    const token = localStorage.getItem("token")
    if (token) {
      fetch(`${BASE_URL}auth`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token
        }
      })
      .then(resp => resp.json())
      .then(response => this.props.setUser(response.user))
    }
  }

  onSignOut = () => {
    localStorage.removeItem("token")
    this.props.clearUser()
  }

  render() {
    const { groups, currentUser, loggedIn, addPost } = this.props
    return (
      <Router>
        <Navbar loggedIn={loggedIn} signOut={this.onSignOut} />
        <div className="main">
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/signup" render={props => <Signup {...props} />} />
          <Route exact path="/about" component={About} />
          <Route exact path="/posts/:post_id" render={props => <Post {...props} />} />
          <Route exact path="/new_post"
            render={props => <PostForm
                {...props}
                user={currentUser}
                groups={groups}
                handleSubmit={addPost}
                postInfo={{content: "", post_img: "", groups: []}}
            />}
          />
          <Route exact path="/update_user" render={props => <ProfileForm {...props} />} />
          <Route exact path="/groups"  render={props => <AllGroups {...props} />} />
          <Route exact path="/groups/:group_id" render={props => <Group {...props} />} />
          <Route exact path="/users/:user_id" render={props => <Followee {...props} />} />
          <Route exact path="/liked_posts" render={props => <Likes {...props} />} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups,
    currentUser: state.currentUser,
    loggedIn: !!state.currentUser.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchGroups: () => dispatch(fetchGroups()),
    setUser: data => dispatch(setUser(data)),
    clearUser: () => dispatch(clearUser()),
    addPost: (body) => dispatch(addPost(body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

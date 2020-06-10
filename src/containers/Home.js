import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import Profile from './Profile'
import GroupList from './GroupList'
// import PostForm from '../forms/PostForm'
import { fetchLike } from '../services/FormHook'
import '../css/Home.css'

class Home extends Component {
    state = {
        posts: [],
        addClicked: false
    }

    componentDidMount() {
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

    handleLike = (id, likes) => {
        fetchLike(id, likes)
        .then(postReturn => {
            this.setState(prev => {
                return { posts: prev.posts.map(post => post.id === id ? postReturn : post) }
            })
        })
    }

    renderPosts = () => {
        return this.state.posts.map(post => {
            return <PostCard key={post.id} handleClickLike={this.handleLike} postInfo={post} />
        })
    }

    userGroups = () => {
        return this.props.groups.filter(group => !!group.users.find(user => user.id === this.props.user.id))
    }

    // handleClick = () => {
    //     this.setState(prev => {
    //         return { addClicked: !prev.addClicked }
    //     })
    // }

    // handleSubmit = event => {
    //     event.preventDefault()
    //     this.props.handleSubmit(event)
    //     this.setState({ addClicked: false })
    // }

    render() {
        const { user, history, loggedIn } = this.props
        return (
            <div className="home">
                <div className="profile">
                    {loggedIn ? <Profile user={user} history={history} /> : null}
                </div>
                <div className="posts">
                    {/* {loggedIn ?
                    (
                        this.state.addClicked ?
                        <PostForm handleSubmit={this.handleSubmit} handleBack={this.handleClick} />
                        : <button onClick={this.handleClick}>Make a Post</button>
                    )
                    : null} */}
                    {this.renderPosts()}
                </div>
                <div className="groups">
                    {user.id ? <GroupList groups={this.userGroups()} history={history} /> : null}
                </div>
            </div>
        )
    }
}

export default Home

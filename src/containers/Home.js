import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import Profile from './Profile'
import GroupList from './GroupList'
import PostForm from '../forms/PostForm'
import '../css/Home.css'

class Home extends Component {
    state = {
        addClicked: false
    }

    renderPosts = () => {
        const { posts, handleLike } = this.props
        return posts.map(post => <PostCard key={post.id} handleClickLike={handleLike} postInfo={post} />)
    }

    userGroups = () => {
        return this.props.groups.filter(group => !!group.users.find(user => user.id === this.props.user.id))
    }

    handleClick = () => {
        this.setState(prev => {
            return { addClicked: !prev.addClicked }
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.handleSubmit(event)
        this.setState({ addClicked: false })
    }

    render() {
        const { user, history, loggedIn } = this.props
        return (
            <div className="home">
                <div className="profile">
                    {loggedIn ? <Profile user={user} history={history} /> : null}
                </div>
                <div className="posts">
                    {loggedIn ?
                    (this.state.addClicked ? <PostForm handleSubmit={this.handleSubmit} /> : <span onClick={this.handleClick}>Make a Post</span>)
                    : null}
                    {this.renderPosts()}
                </div>
                <div className="groups">
                    {user.id ? <GroupList groups={this.userGroups()} /> : null}
                </div>
            </div>
        )
    }
}

export default Home

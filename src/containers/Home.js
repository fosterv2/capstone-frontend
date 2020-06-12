import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import Profile from './Profile'
import GroupList from './GroupList'
import '../css/Home.css'

class Home extends Component {
    state = {
        addClicked: false
    }

    renderPosts = () => {
        const { posts, handleLike, user, loggedIn } = this.props
        return posts.map(post => {
            return <PostCard key={post.id} handleClickLike={handleLike} postInfo={post} user={user} loggedIn={loggedIn} />
        })
    }

    render() {
        const { user, history, loggedIn, userGroups } = this.props
        return (
            <div className="home">
                <div className="profile">
                    {loggedIn ? <Profile user={user} history={history} /> : null}
                </div>
                <div className="posts">
                    {this.renderPosts()}
                </div>
                <div className="groups">
                    {loggedIn ? <GroupList groups={userGroups} history={history} /> : null}
                </div>
            </div>
        )
    }
}

export default Home

import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import Profile from './Profile'
import GroupList from './GroupList'
import '../css/Home.css'

class Home extends Component {
    // state = {
    //     posts: []
    // }

    renderPosts = () => {
        const orderPosts = this.props.posts
        orderPosts.reverse()
        return orderPosts.map(post => <PostCard key={post.id} postInfo={post} />)
    }

    render() {
        const { user, history, loggedIn } = this.props
        return (
            <div className="home">
                <div className="profile">
                    {loggedIn ? <Profile user={user} history={history} /> : null}
                </div>
                <div className="posts">{this.renderPosts()}</div>
                <div className="groups">
                    {loggedIn ? <GroupList /> : null}
                </div>
            </div>
        )
    }
}

export default Home

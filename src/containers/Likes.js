import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import AuthHOC from '../services/AuthHOC'
import { connect } from "react-redux"

class Likes extends Component {
    renderPosts = () => {
        const { posts, user, loggedIn} = this.props
        const likedPosts = posts.filter(post => !!post.likes.find(like => like.user_id))
        return likedPosts.map(post => <PostCard key={post.id} postInfo={post} user={user} loggedIn={loggedIn} />)
    }

    render() {
        return (
            <div>
                <h2>Liked Posts</h2>
                {this.renderPosts()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        user: state.currentUser,
        loggedIn: !!state.currentUser.id
    }
}

export default connect(mapStateToProps)(AuthHOC(Likes))

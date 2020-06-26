import React, { Component, Fragment } from 'react'
import Profile from '../containers/Profile'
import PostCard from '../components/PostCard'
import AuthHOC from '../services/AuthHOC'
import { connect } from "react-redux"
import { likePost, removeFollow } from "../redux"

class Followee extends Component {
    getFollowee = () => {
        // eslint-disable-next-line
        return this.props.user.followees.find(followee => followee.id == this.props.match.params.user_id)
    }

    handleUnfollow = (user_id, follow_id) => {
        this.props.removeFollow(user_id, follow_id)
        this.props.history.push('/')
    }

    renderPosts = () => {
        const { posts, likePost, user, loggedIn } = this.props
        const showPosts = posts.filter(post => !post.deleted)
        const followeePosts = showPosts.filter(post => post.user.id === this.getFollowee().id)
        return followeePosts.map(post => <PostCard
            key={post.id}
            postInfo={post}
            user={user}
            loggedIn={loggedIn}
            handleClickLike={likePost}
        />)
    }

    render() {
        return (
            <Fragment>
            {this.props.loggedIn ? 
            <div className="followee">
                <div className="pro file">
                    <Profile user={this.getFollowee()} currentUser={this.props.user} handleUnfollow={this.handleUnfollow} />
                </div>
                <div className="post list">{this.renderPosts()}</div>
            </div>
            : null}
            </Fragment>
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

const mapDispatchToProps = dispatch => {
    return {
        likePost: (user_id, post_id) => dispatch(likePost(user_id, post_id)),
        // addFollow: (user_id, follow_id) => dispatch(addFollow(user_id, follow_id)),
        removeFollow: (user_id, follow_id) => dispatch(removeFollow(user_id, follow_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthHOC(Followee))

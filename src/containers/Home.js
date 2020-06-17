import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import Profile from './Profile'
import GroupList from './GroupList'
import { connect } from "react-redux"
import { likePost } from "../redux"
import '../css/Home.css'

class Home extends Component {
    state = {
        addClicked: false
    }

    renderPosts = () => {
        const { posts, likePost, user, loggedIn } = this.props
        const showPosts = posts.filter(post => !post.deleted)
        return showPosts.map(post => <PostCard
            key={post.id}
            handleClickLike={likePost}
            postInfo={post}
            user={user}
            loggedIn={loggedIn}
        />)
    }

    getUserGroups = () => {
        return this.props.groups.filter(group => !!group.users.find(user => user.id === this.props.user.id))
    }

    render() {
        const { user, history, loggedIn } = this.props
        return (
            <div className="home">
                <div className="profile">
                    {loggedIn ? <Profile user={user} history={history} currentUser={user} /> : null}
                </div>
                <div className="posts">
                    {this.renderPosts()}
                </div>
                <div className="groups">
                    {loggedIn ? <GroupList groups={this.getUserGroups()} history={history} /> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        groups: state.groups,
        user: state.currentUser,
        loggedIn: !!state.currentUser.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        likePost: (user_id, post_id) => dispatch(likePost(user_id, post_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

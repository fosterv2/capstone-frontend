import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import AuthHOC from '../services/AuthHOC'
import Profile from '../containers/Profile'
import { connect } from "react-redux"
import { leaveGroup, likePost } from "../redux"

class Group extends Component {

    getGroup = () => {
        // eslint-disable-next-line
        return this.props.groups.find(group => group.id == this.props.match.params.group_id)
    }

    listUsers = () => {
        return this.getGroup().users.map(user => <Profile key={user.id} user={user} />)
    }

    renderPosts = () => {
        const { posts, likePost, user, loggedIn } = this.props
        const showPosts = posts.filter(post => !post.deleted)
        const groupPosts = showPosts.filter(post => {
            return !!post.groups.find(group => group.id === this.getGroup().id)
        })
        return groupPosts.map(post => <PostCard
            key={post.id}
            postInfo={post}
            user={user}
            loggedIn={loggedIn}
            handleClickLike={likePost}
        />)
    }

    handleClickLeave = () => {
        this.props.leaveGroup(this.props.user.id, this.getGroup().id)
        this.props.history.push('/groups')
    }

    render() {
        const group = this.getGroup()
        return (
            <div>{group ? 
            <div className="group">
                <h1>{group.name}</h1>
                <p>{group.description}</p>
                <button onClick={() => this.props.history.push('/groups')}>See all Groups</button>
                {// eslint-disable-next-line
                group.creator_id == this.props.user.id ?
                <button onClick={() => console.log("Need a group edit")}>Edit Group</button>
                : <button onClick={this.handleClickLeave}>Leave Group</button>}
                <h2>Group Members:</h2>
                <div className="users">{this.listUsers()}</div>
                {this.renderPosts()}
            </div>
             : null}</div>
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
        leaveGroup: (user_id, group_id) => dispatch(leaveGroup(user_id, group_id)),
        likePost: (user_id, post_id) => dispatch(likePost(user_id, post_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthHOC(Group))

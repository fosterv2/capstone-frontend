import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import CommentCard from '../components/CommentCard'
import CommentForm from '../forms/CommentForm'
import Profile from '../containers/Profile'
import PostForm from '../forms/PostForm'
import { connect } from "react-redux"
import { updatePost, deletePost, likePost, addFollow, removeFollow } from "../redux"
import '../css/Post.css'

// const BASE_URL = "https://cat-space-backend.herokuapp.com/"
const BASE_URL = "http://localhost:3000/"

class Post extends Component {
    state = {
        comments: [],
        addComment: false,
        updatePost: false,
        // updateComment: false
    }

    componentDidMount() {
        fetch(`${BASE_URL}comments/${this.props.match.params.post_id}`)
        .then(resp => resp.json())
        .then(comments => {
            comments.sort((a, b) => {
                if (a.created_at > b.created_at) {
                    return -1
                } else if (a.created_at < b.created_at) {
                    return 1
                } else {
                    return 0
                }
            })
            this.setState({ comments })
        })
    }

    getPost = () => {
        // eslint-disable-next-line
        return this.props.posts.find(post => post.id == this.props.match.params.post_id)
    }

    renderComments = () => {
        return this.state.comments.length === 0 ?
        <p>(This post has no comments)</p>
        : this.state.comments.map(comment => <CommentCard key={comment.id} commentInfo={comment} />)
    }

    toggleAddComment = () => {
        this.setState(prev => {
            return { addComment: !prev.addComment }
        })
    }

    toggleUpdatePost = () => {
        this.setState(prev => {
            return { updatePost: !prev.updatePost }
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({ addClicked: false })
        const body = {
            content: event.target.content.value,
            post_id: this.getPost().id,
            user_id: this.props.user.id
        }
        fetch(`${BASE_URL}comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(comment => this.setState(prev => {
            return {
                comments: [comment, ...prev.comments],
                addComment: false
            }
        }))
    }

    handlePostDelete = post_id => {
        this.props.deletePost(post_id)
        this.props.history.push('/')
    }

    render() {
        const { user, loggedIn, groups, likePost, updatePost, addFollow, removeFollow } = this.props
        return (
            <div className="posting">
                <div className="post info">
                {!!this.getPost() && user.id ?
                <Profile user={this.getPost().user} currentUser={user} handleFollow={addFollow} handleUnfollow={removeFollow} />
                : <div className="profile card"></div>}
                {!!this.getPost() ?
                <PostCard
                    postInfo={this.getPost()}
                    handleClickLike={likePost}
                    onHandleClick={this.toggleAddComment}
                    user={user}
                    loggedIn={loggedIn}
                    handleUpdate={this.toggleUpdatePost}
                    handleDelete={this.handlePostDelete}
                />
                : null}
                </div>
                {this.state.updatePost ?
                <PostForm
                    handleSubmit={updatePost}
                    handleBack={this.toggleUpdatePost}
                    postInfo={this.getPost()}
                    user={user}
                    groups={groups}
                />
                : null}
                {this.state.addComment ? 
                <CommentForm handleSubmit={this.handleSubmit} handleBack={this.toggleAddComment} />
                : null }
                {this.renderComments()}
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
        updatePost: post => dispatch(updatePost(post)),
        deletePost: post_id => dispatch(deletePost(post_id)),
        likePost: (user_id, post_id) => dispatch(likePost(user_id, post_id)),
        addFollow: (user_id, follow_id) => dispatch(addFollow(user_id, follow_id)),
        removeFollow: (user_id, follow_id) => dispatch(removeFollow(user_id, follow_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)

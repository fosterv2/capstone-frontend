import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import CommentCard from '../components/CommentCard'
import CommentForm from '../forms/CommentForm'
import Profile from '../containers/Profile'
// import { fetchLike } from '../services/FormHook'
import { connect } from "react-redux";
import '../css/Post.css'

class Post extends Component {
    state = {
        comments: [],
        addClicked: false
    }

    componentDidMount() {
        fetch(`http://localhost:3000/comments/${this.props.match.params.post_id}`)
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
        return this.state.comments.map(comment => <CommentCard key={comment.id} commentInfo={comment} />)
    }

    handleClick = () => {
        this.setState(prev => {
            return { addClicked: !prev.addClicked }
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
        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(comment => this.setState(prev => {
            return { comments: [comment, ...prev.comments] }
        }))
    }

    render() {
        return (
            <div className="posting">
                <div className="post info">
                {!!this.getPost() ? <Profile user={this.getPost().user} /> : null}
                {!!this.getPost() ?
                <PostCard
                    postInfo={this.getPost()}
                    handleClickLike={this.props.handleLike}
                    onHandleClick={this.handleClick}
                    user={this.props.user}
                    loggedIn={this.props.loggedIn}
                    // onDelete={this.handleDelete}
                />
                : null}
                </div>
                {this.state.addClicked ? 
                <CommentForm handleSubmit={this.handleSubmit} handleBack={this.handleClick} />
                : null }
                {this.renderComments()}
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

export default connect(mapStateToProps)(Post)

import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import CommentCard from '../components/CommentCard'
import CommentForm from '../forms/CommentForm'
import { fetchLike } from '../services/FormHook'
import '../css/Post.css'

class Post extends Component {
    state = {
        post: {},
        comments: [],
        addClicked: false
    }

    componentDidMount() {
        fetch(`http://localhost:3000/posts/${this.props.match.params.post_id}`)
        .then(resp => resp.json())
        .then(post => this.setState({ post }))
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

    handleLike = (id, likes) => {
        // console.log(id, likes)
        fetchLike(id, likes)
        .then(postReturn => {
            this.setState({ post: postReturn })
        })
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
            post_id: this.state.post.id,
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
                {/* Add a user bio for using following */}
                {this.state.post.id ?
                <PostCard postInfo={this.state.post} handleClickLike={this.handleLike} onHandleClick={this.handleClick} />
                : null}
                {this.state.addClicked ? 
                <CommentForm handleSubmit={this.handleSubmit} handleBack={this.handleClick} />
                : null }
                {this.renderComments()}
                {/* : <button onClick={this.handleClick}>Add Comment</button>} */}
            </div>
        )
    }
}

export default Post

import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import CommentCard from '../components/CommentCard'
import CommentForm from '../forms/CommentForm'
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
        .then(comments => this.setState({ comments: comments.reverse() }))
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
        // console.log(event.target.content.value, this.state.post.id, this.props.user.id)
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
                {this.state.post.id ? <PostCard postInfo={this.state.post} onHandleClick={this.handleClick} /> : null}
                {this.state.addClicked ? 
                <CommentForm handleSubmit={this.handleSubmit} />
                : null }
                {this.renderComments()}
                {/* : <button onClick={this.handleClick}>Add Comment</button>} */}
            </div>
        )
    }
}

export default Post

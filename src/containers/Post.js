import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import CommentCard from '../components/CommentCard'
import '../css/Post.css'

class Post extends Component {
    state = {
        post: {},
        comments: [],
        addClicked: false
    }

    componnentDidMount() {
        fetch(`http://localhost:3000/comments/${this.state.postId}`)
        .then(resp => resp.json())
        .then(comments => this.setState({ comments }))
    }

    findPost = () => {
        const post = this.props.posts.find(post => post.id == this.props.match.params.post_id)
        this.setState({ post })
    }

    renderComments = () => {
        return this.state.comments.map(comment => <CommentCard key={comment.id} commentInfo={comment} />)
    }

    render() {
        return (
            <div className="posting">
                {this.state.post.id ? <PostCard postInfo={this.state.post} /> : null}
                {this.renderComments}
                Add Comment
            </div>
        )
    }
}

export default Post

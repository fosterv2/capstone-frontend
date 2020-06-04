import React, { Component } from 'react'
import PostCard from '../components/PostCard'

class Home extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/posts")
        .then(resp => resp.json())
        .then(posts => this.setState({ posts }))
    }

    renderPosts = () => {
        return this.state.posts.map(post => <PostCard postInfo={post} />)
    }

    render() {
        return (
            <div className="home">
                <div></div>
                <div>{this.renderPosts()}</div>
                <div></div>
            </div>
        )
    }
}

export default Home

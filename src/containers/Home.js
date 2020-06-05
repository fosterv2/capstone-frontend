import React, { Component } from 'react'
import PostCard from '../components/PostCard'
// import Post from '../containers/Post'
// import { Route } from 'react-router-dom';
import '../css/Home.css'

class Home extends Component {
    state = {
        posts: []
    }

    // componentDidMount() {
    //     fetch("http://localhost:3000/posts")
    //     .then(resp => resp.json())
    //     .then(posts => this.setState({ posts }))
    // }

    renderPosts = () => {
        return this.props.posts.map(post => <PostCard key={post.id} postInfo={post} />)
    }

    render() {
        return (
            <div className="home">
                <div className="profile">Profile</div>
                <div className="posts">{this.renderPosts()}</div>
                <div className="groups">Groups</div>
                {/* <Route exact path="/posts/:id" render={props => <Post {...props} posts={this.state.posts} />} /> */}
            </div>
        )
    }
}

export default Home

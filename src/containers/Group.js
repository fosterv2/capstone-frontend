import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import { fetchLike } from '../services/FormHook'

class Group extends Component {
    state = {
        group: {
            name: "",
            description: "",
            users: []
        },
        posts: []
    }

    componentDidMount() {
        const group_id = this.props.match.params.group_id
        fetch(`http://localhost:3000/groups/${group_id}`)
        .then(resp => resp.json())
        .then(group => this.setState({ group }))
        fetch(`http://localhost:3000/posts/group/${group_id}`)
        .then(resp => resp.json())
        .then(posts => this.setState({ posts }))
    }

    handleLike = (id, likes) => {
        fetchLike(id, likes)
        .then(postReturn => {
            this.setState(prev => {
                return { posts: prev.posts.map(post => post.id === id ? postReturn : post) }
            })
        })
    }

    listUsers = () => {
        return this.state.group.users.map(user => <li key={user.id}>{user.username}</li>)
    }

    renderPosts = () => {
        return this.state.posts.map(post => {
            return <PostCard key={post.id} handleClickLike={this.handleLike} postInfo={post} />
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.group.name}</h1>
                <p>{this.state.group.description}</p>
                <ul>{this.listUsers()}</ul>
                {this.renderPosts()}
            </div>
        )
    }
}

export default Group

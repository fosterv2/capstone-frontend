import React, { Component } from 'react'
import PostCard from '../components/PostCard'
import Profile from './Profile'
import GroupList from './GroupList'
import { connect } from "react-redux";
import '../css/Home.css'

class Home extends Component {
    state = {
        addClicked: false
    }

    renderPosts = () => {
        const { posts, handleLike, user, loggedIn } = this.props
        return posts.map(post => {
            return <PostCard key={post.id} handleClickLike={handleLike} postInfo={post} user={user} loggedIn={loggedIn} />
        })
    }

    getUserGroups = () => {
      return this.props.groups.filter(group => !!group.users.find(user => user.id === this.props.user.id))
    }

    render() {
        const { user, history, loggedIn } = this.props
        return (
            <div className="home">
                <div className="profile">
                    {loggedIn ? <Profile user={user} history={history} /> : null}
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
        groups: state.groups
        // user
    }
}

export default connect(mapStateToProps)(Home)

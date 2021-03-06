import React, { Fragment} from 'react'
import { Link } from 'react-router-dom'

const PostCard = props => {
    const { user, created_at, post_img, content, id, likes, groups, deleted } = props.postInfo

    const parseDate = date => {
        const dateArr = date.split("-")
        return `${dateArr[1]}/${parseInt(dateArr[2])}/${dateArr[0]}`
    }

    const isPicture = () => {
        if (post_img) {
            const format = post_img.split(".").pop()
            return format === "gif" || format === "jpg" || format === "png"
        }
    }

    const renderDiv = () => {
        const word = likes.length === 1 ? "Like" : "Likes"
        let likePg
        if (user.id === props.user.id) {
            likePg = <p>{likes.length} {word} <span style={{ color: "red" }}>♡</span></p>
        } else if (likes.find(like => like.user_id === props.user.id)) {
            likePg = <p>{likes.length} {word} <span style={{ color: "red" }}>♥</span></p>
        } else {
            likePg = <p>{likes.length} {word} <span onClick={() => handleClickLike(props.user.id, id)}>♡</span></p>
        }
        const { loggedIn, onHandleClick, handleClickLike } = props
        if (loggedIn && onHandleClick) {
            return <div className="post buttons">
                {likePg}
                <p><span onClick={onHandleClick}>Add Comment</span></p>
            </div>
        } else if (onHandleClick) {
            return null
        } else if (loggedIn) {
            return <div className="post buttons">
                {likePg}
                <p><Link to={`/posts/${id}`}>Comments</Link></p>
            </div>
        } else {
            return <div className="post buttons">
                <p></p>
                <p><Link to={`/posts/${id}`}>Comments</Link></p>
            </div>
        }
    }

    const listGroups = () => {
        return groups.length === 0 ? <span> (None)</span> : groups.map(group => <span key={group.id}> @{group.name} </span>)
    }

    return (
        <Fragment>{deleted ?
        <div className="post card"><p style={{marginTop: "20%"}}><em>This post has been deleted</em></p></div>
        : <div className="post card">
            <div className="heading">
                <p><strong>Posted By:</strong> {user.username}</p>
                <p><strong>Posted On:</strong> {parseDate(created_at)}</p>
            </div>
            {isPicture() ? <img src={post_img} alt="cat" /> : null}
            <div className="content">
                <p>{content}</p>
            </div>
            {renderDiv()}
            {props.loggedIn ?
            <div className="post buttons">
                <p>Groups:{listGroups()}</p>
            </div>
            : null}
            {user.id === props.user.id && props.handleUpdate ?
            <div className="post user">
                <p onClick={props.handleUpdate}>Update Post</p>
                <p onClick={() => props.handleDelete(id)}>Delete Post</p>
            </div>
            : null}
        </div>}</Fragment>
    )
}

export default PostCard

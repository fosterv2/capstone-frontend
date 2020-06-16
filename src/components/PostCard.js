import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = props => {
    const { user, created_at, post_img, content, id, likes } = props.postInfo

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
        const { loggedIn, onHandleClick, handleClickLike } = props
        if (loggedIn && onHandleClick) {
            return <div className="post buttons">
                <p>{likes.length} Likes <span onClick={() => handleClickLike(props.user.id, id)}>+</span></p>
                <p><span onClick={onHandleClick}>Add Comment</span></p>
            </div>
        } else if (onHandleClick) {
            return null
        } else if (loggedIn) {
            return <div className="post buttons">
                <p>{likes.length} Likes <span onClick={() => handleClickLike(props.user.id, id)}>+</span></p>
                <p><Link to={`/posts/${id}`}>Comments</Link></p>
            </div>
        } else {
            return <div className="post buttons">
                <p></p>
                <Link to={`/posts/${id}`}>Comments</Link>
            </div>
        }
    }

    return (
        <div className="post card">
            <div className="heading">
                <p><strong>Posted By:</strong> {user.username}</p>
                <p><strong>Posted On:</strong> {parseDate(created_at)}</p>
            </div>
            {isPicture() ? <img src={post_img} alt="cat" /> : null}
            <div className="content">
                <p>{content}</p>
            </div>
            {renderDiv()}
            {user.id === props.user.id && props.handleUpdate ?
            <div className="post buttons">
                <p onClick={props.handleUpdate}>Update Post</p>
                <p onClick={() => props.handleDelete(id)}>Delete Post</p>
            </div>
            : null}
        </div>
    )
}

export default PostCard

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
        const { loggedIn, onHandleClick } = props
        if (loggedIn && onHandleClick) {
            return <div className="post buttons">
                <p>{likes} Likes <span onClick={() => props.handleClickLike(id, likes)}>+</span></p>
                <p><span onClick={props.onHandleClick}>Add Comment</span></p>
            </div>
        } else if (onHandleClick) {
            return null
        } else if (loggedIn) {
            return <div className="post buttons">
                <p>{likes} Likes <span onClick={() => props.handleClickLike(id, likes)}>+</span></p>
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
            {/* <div className="post buttons">
                {
                    props.loggedIn ?
                    <p>{likes} Likes <span onClick={() => props.handleClickLike(id, likes)}>+</span></p>
                    : null
                }
                <p>{
                    props.onHandleClick ? 
                    <span onClick={props.onHandleClick}>Add Comment</span>
                    : <Link to={`/posts/${id}`}>Comments</Link>
                }</p>
            </div> */}
            {renderDiv()}
            {user.id === props.user.id ?
            <div className="post buttons">
                <p onClick={() => console.log("Need an update")}>Update Comment</p>
                <p onClick={() => console.log("Need a delete")}>Delete Comment</p>
            </div>
            : null}
        </div>
    )
}

export default PostCard

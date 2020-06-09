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
            <div className="post buttons">
                <p>{likes} Likes <span onClick={() => props.handleClickLike(id, likes)}>+</span></p>
                <p>{
                    props.onHandleClick ? 
                    <span onClick={props.onHandleClick}>Add Comment</span>
                    : <Link to={`/posts/${id}`}>Comments</Link>
                }</p>
            </div>
        </div>
    )
}

export default PostCard

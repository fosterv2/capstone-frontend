import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = props => {
    const parseDate = date => {
        const dateArr = date.split("-")
        return `${dateArr[1]}/${parseInt(dateArr[2])}/${dateArr[0]}`
    }

    const { postInfo } = props
    return (
        <div className="post card">
            <div className="heading">
                <p>Posted By: {postInfo.user.username}</p>
                <p>Posted On: {parseDate(postInfo.created_at)}</p>
            </div>
            {postInfo.post_img ? <img src={postInfo.post_img} alt="cat" /> : null}
            <div className="content">
                <p>{postInfo.content}</p>
            </div>
            <div className="post buttons">
                <p>{postInfo.likes} Likes <span onClick={() => console.log("Liked")}>+</span></p>
                <p><Link to={`/posts/${postInfo.id}`}>Comment</Link></p>
            </div>
        </div>
    )
}

export default PostCard

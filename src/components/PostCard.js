import React from 'react'

const PostCard = props => {
    const { postInfo } = props
    return (
        <div className="post card">
            {postInfo.post_img ? <img src={postInfo.post_img} alt="cat" /> : null}
            <p>{postInfo.content}</p>
        </div>
    )
}

export default PostCard

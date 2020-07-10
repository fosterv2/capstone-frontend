import React from 'react'

const CommentCard = ({ commentInfo, currentUser, handleDelete }) => {
    const { id, content, user, created_at } = commentInfo

    const parseDate = date => {
        const dateArr = date.split("-")
        return `${dateArr[1]}/${parseInt(dateArr[2])}/${dateArr[0]}`
    }

    return (
        <div className="comment card">
            <div className="heading">
                <p><strong>Posted By:</strong> {user.username}</p>
                <p><strong>Posted On:</strong> {parseDate(created_at)}</p>
            </div>
            <div className="content">
                <p>{content}</p>
            </div>
            {user.id === currentUser.id ?
            <div className="post user">
                <p onClick={() => console.log("Maybe an update")}>Update Comment</p>
                <p onClick={() => handleDelete(id)}>Delete Comment</p>
            </div> : null}
        </div>
    )
}

export default CommentCard

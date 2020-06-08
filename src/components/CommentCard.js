import React from 'react'

const CommentCard = ({ commentInfo }) => {
    const { content, user, created_at } = commentInfo

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
        </div>
    )
}

export default CommentCard

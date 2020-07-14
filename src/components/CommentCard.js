import React, { Fragment, useState } from 'react'
import CommentForm from '../forms/CommentForm'

const CommentCard = ({ commentInfo, currentUser, handleUpdate, handleDelete }) => {
    const { id, content, user, created_at } = commentInfo
    const [back, setBack] = useState(false)

    const parseDate = date => {
        const dateArr = date.split("-")
        return `${dateArr[1]}/${parseInt(dateArr[2])}/${dateArr[0]}`
    }

    const toggleBack = () => {
        setBack(!back)
    }

    return (
        <Fragment>
        {back ? <CommentForm handleBack={toggleBack} handleSubmit={handleUpdate} commentInfo={commentInfo} /> :
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
                <p onClick={toggleBack}>Update Comment</p>
                <p onClick={() => handleDelete(id)}>Delete Comment</p>
            </div> : null}
        </div>}
        </Fragment>
    )
}

export default CommentCard

import React, { useState } from 'react'

const CommentForm = ({ handleSubmit, handleBack, commentInfo }) => {
    const [content, setContent] = useState(commentInfo.content)

    const handleChange = event => {
        setContent(event.target.value)
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        const info = {
            id: commentInfo.id,
            content: content
        }
        handleSubmit(info)
        handleBack()
    }

    return (
        <div className="toggle form">
            <p className="back" onClick={handleBack}>X</p>
            <form onSubmit={handleFormSubmit}>
                <label>Comment Content</label><br/>
                <textarea
                    name="content"
                    placeholder="Enter comment content"
                    value={content}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CommentForm

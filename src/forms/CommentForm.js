import React, { useState } from 'react'

const CommentForm = ({ handleSubmit, handleBack }) => {
    const [content, setContent] = useState("")

    const handleChange = event => {
        setContent(event.target.value)
    }

    return (
        <div className="toggle form">
            <p className="back" onClick={handleBack}>Back</p>
            <form onSubmit={handleSubmit}>
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

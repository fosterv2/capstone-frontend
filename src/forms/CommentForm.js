import React, { useState } from 'react'

const CommentForm = ({ handleSubmit }) => {
    const [content, setContent] = useState("")

    const handleChange = event => {
        setContent(event.target.value)
    }

    return (
        <div>
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

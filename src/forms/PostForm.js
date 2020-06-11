import React, { useState } from 'react'

const PostForm = ({ handleSubmit, history }) => {
    const [content, setContent] = useState("")
    const [img_url, setImage] = useState("")

    const handleContentChange = event => {
        setContent(event.target.value)
    }
    
    const handleImgChange = event => {
        setImage(event.target.value)
    }

    const submitPost = event => {
        event.preventDefault()
        handleSubmit(event)
        history.push('/')
    }

    return (
        <div className="post form">
            <h1>Make a New Post</h1>
            {/* Add group? or put in group page? */}
            <form onSubmit={submitPost}>
                <textarea
                    name="content"
                    placeholder="Enter post content"
                    value={content}
                    onChange={handleContentChange}
                />
                <input
                    name="img_url"
                    placeholder="Enter an image url"
                    value={img_url}
                    onChange={handleImgChange}
                /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default PostForm

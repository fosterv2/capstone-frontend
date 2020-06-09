import React, { useState } from 'react'

const PostForm = ({ handleSubmit }) => {
    const [content, setContent] = useState("")
    const [img_url, setImage] = useState("")

    const handleContentChange = event => {
        setContent(event.target.value)
    }
    
    const handleImgChange = event => {
        setImage(event.target.value)
    }

    return (
        <div>
            {/* Add group? or put in group page? */}
            <form onSubmit={handleSubmit}>
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
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default PostForm

import React, { useState } from 'react'
import AuthHOC from '../services/AuthHOC'
import { connect } from "react-redux";
import { addPost } from "../redux"

const PostForm = props => {
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
        const body = {
            content: event.target.content.value,
            post_img: event.target.img_url.value,
            user_id: props.user.id
        }
        props.addPost(body)
        props.history.push('/')
    }

    return (
        <div className="post form">
            <h1>Make a New Post</h1>
            {/* group drop-down for "tags" */}
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

const mapStateToProps = state => {
    return {
        user: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPost: (body) => dispatch(addPost(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthHOC(PostForm))

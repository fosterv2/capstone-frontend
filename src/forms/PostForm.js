import React, { useState } from 'react'
import AuthHOC from '../services/AuthHOC'

const PostForm = props => {
    const [content, setContent] = useState(props.postInfo.content)
    const [img_url, setImage] = useState(props.postInfo.post_img)
    const [postGroups, setPostGroups] = useState(props.postInfo.groups.map(group => group.name))

    const handleContentChange = event => {
        setContent(event.target.value)
    }
    
    const handleImgChange = event => {
        setImage(event.target.value)
    }

    const handleGroupsChange = event => {
        const groupName = event.target.value
        // const checkedGroup = getUserGroups().find(group => group.name === groupName)
        if (!postGroups.includes(groupName)) {
            setPostGroups([...postGroups, groupName])
        } else {
            setPostGroups(postGroups.filter(group => group !== groupName))
        }
    }

    const submitPost = event => {
        event.preventDefault()
        const groupIds = props.groups.filter(group => postGroups.includes(group.name)).map(group => group.id)
        const body = {
            id: props.postInfo.id,
            content: content,
            post_img: img_url,
            group_ids: groupIds,
            user_id: props.user.id
        }
        props.handleSubmit(body)
        if (props.history){
            props.history.push('/')
        } else {
            props.handleBack()
        }
    }

    const getUserGroups = () => {
        return props.groups.filter(group => !!group.users.find(user => user.id === props.user.id))
    }

    const renderGroups = () => {
        // const groupNames = postGroups.map(group => group.name)
        return getUserGroups().map(group => {
            const htmlName = group.name.toLowerCase().split(" ").join("-")
            return <div key={group.id}>
                <label htmlFor={htmlName}>{group.name}</label>
                <input
                    id={htmlName}
                    type="checkbox"
                    value={group.name}
                    // name="group"
                    checked={postGroups.includes(group.name)}
                    onChange={handleGroupsChange}
                />
            </div>
        })
    }

    return (
        <div className="toggle form">
            {props.handleBack ? <p className="back" onClick={props.handleBack}>X</p> : <h1>Make a New Post</h1>}
            <form onSubmit={submitPost}>
                <label>Post Content</label><br/>
                <textarea
                    name="content"
                    placeholder="Enter post content"
                    value={content}
                    onChange={handleContentChange}
                /><br />
                <label>Image URL</label><br/>
                <input
                    name="img_url"
                    placeholder="Enter an image url"
                    value={img_url}
                    onChange={handleImgChange}
                /><br />
                <p>Choose Group(s)</p>
                <div className="checkboxes">{renderGroups()}</div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AuthHOC(PostForm)

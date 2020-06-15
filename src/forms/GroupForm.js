import React, { useState } from 'react'

const GroupForm = ({ handleSubmit, handleBack }) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const handleChangeName = event => {
        setName(event.target.value)
    }

    const handleChangeDescription = event => {
        setDescription(event.target.value)
    }

    return (
        <div className="toggle form">
            <p className="back" onClick={handleBack}>Back</p>
            <form onSubmit={handleSubmit}>
                <label>Group Name</label><br/>
                <input
                    name="name"
                    placeholder="Enter group name"
                    value={name}
                    onChange={handleChangeName}
                /><br />
                <label>Description</label><br/>
                <textarea
                    name="description"
                    placeholder="Enter group description"
                    value={description}
                    onChange={handleChangeDescription}
                /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default GroupForm

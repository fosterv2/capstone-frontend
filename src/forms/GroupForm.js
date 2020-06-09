import React, { useState } from 'react'

const GroupForm = ({ handleSubmit }) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const handleChangeName = event => {
        setName(event.target.value)
    }

    const handleChangeDescription = event => {
        setDescription(event.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Enter group name"
                    value={name}
                    onChange={handleChangeName}
                />
                <textarea
                    name="description"
                    placeholder="Enter group description"
                    value={description}
                    onChange={handleChangeDescription}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default GroupForm

import React from 'react'
import { Link } from 'react-router-dom'

const GroupList = ({ groups }) => {
    const renderGroups = () => {
        return groups.map(group => <li key={group.id}><Link to={`/groups/${group.id}`}>{group.name}</Link></li>)
    }

    return (
        <div>
            <h3>Your Groups</h3>
            <ul>{renderGroups()}</ul>
            <p>Seach more groups</p>
        </div>
    )
}

export default GroupList

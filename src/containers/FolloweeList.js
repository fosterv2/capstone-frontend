import React from 'react'
import { Link } from 'react-router-dom'

const FolloweeList = ({ followees }) => {
    const renderFollowees = () => {
        return followees.length === 0 ?
        <p>(No users followed)</p>
        : followees.map(followee => {
            return <li key={followee.id}><Link to={`users/${followee.id}`}>{followee.username}</Link></li>
        })
    }

    return (
        <div className="user follow">
            <h3>Followed Users</h3>
            <ul>{renderFollowees()}</ul>
        </div>
    )
}

export default FolloweeList

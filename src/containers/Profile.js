import React from 'react'
import AuthHOC from '../services/AuthHOC'
import '../css/Profile.css'

const Profile = props => {
    const { username, breed, owner_name, img_url } = props.user
    return (
        <div className="profile card">
            <h2>{username}</h2>
            <img src={img_url} alt="profile" />
            <div className="info">
                <p>Breed: {breed}</p>
                <p>Owner: {owner_name}</p>
                {/* add followers */}
                {props.history ?
                <button onClick={() => props.history.push("/update_user")}>Update Profile</button>
                : null}
            </div>
        </div>
    )
}

export default AuthHOC(Profile)

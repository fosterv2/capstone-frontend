import React from 'react'
import '../css/Profile.css'

const Profile = ({ user, history }) => {
    const { username, breed, owner_name, img_url } = user
    return (
        <div className="profile card">
            <h2>{username}</h2>
            <img src={img_url} alt="profile" />
            <div className="info">
                <p>Breed: {breed}</p>
                <p>Owner: {owner_name}</p>
                {/* add followers */}
                <button onClick={() => history.push("/update_user")}>Update Profile</button>
            </div>
        </div>
    )
}

export default Profile

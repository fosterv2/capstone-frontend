import React from 'react'
import '../css/Profile.css'

const Profile = ({ user, history, currentUser, handleFollow, handleUnfollow }) => {
    const { id, username, breed, owner_name, img_url } = user

    const isPicture = () => {
        if (img_url) {
            const format = img_url.split(".").pop()
            return format === "gif" || format === "jpg" || format === "png"
        }
    }

    return (
        <div className="profile card">
            <h2>{username}</h2>
            <img src={isPicture() ? img_url : "https://i.imgur.com/VFDasqc.png"} alt="profile" />
            <div className="info">
                <p>Breed: {breed}</p>
                <p>Owner: {owner_name}</p>
                {currentUser.id === user.id ?
                <p>{currentUser.followers.length} followers</p>
                : !currentUser.followees.find(followee => id === followee.id) ?
                <button onClick={() => handleFollow(currentUser.id, user.id)}>Follow</button>
                : <button onClick={() => handleUnfollow(currentUser.id, user.id)}>Unfollow</button>}
                {history ? <button onClick={() => history.push("/update_user")}>Update Profile</button> : null}
            </div>
        </div>
    )
}

export default Profile

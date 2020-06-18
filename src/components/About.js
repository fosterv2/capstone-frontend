import React from 'react'

const About = () => {
    return(
        <div className="about">
            <img src="https://i.imgur.com/CeNqBPn.png" style={{marginTop: "15px"}} alt="cat-logo" />
            <p>
                An app for cats to connect with each other and share their thoughts and feelings
                (because cats do have feelings).
            </p>
            <p>Before logging in, a user can see all posts on the home page and the about page.</p>
            <p>Once they have logged in they can see their profile and groups along with posts on the home page.</p>
            <p>They can make posts with a picture and content and tag it to groups and edit or delete them.</p>
            <p>They can also make comments on any posts and like any other user's posts once.</p>
            <p>A user can also join and leave groups and see all posts associated with the groups they have joined.</p>
            <p>A user can also follow any other user through their profile on the group page or the page of one of their posts.</p>
            <p>
                Created by <a href="https://github.com/fosterv2" target="_blank" rel="noopener noreferrer">Valerie Foster</a>
            </p>
        </div>
    )
}

export default About

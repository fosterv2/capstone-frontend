import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormInput } from '../services/FormHook'
import { connect } from "react-redux";
import { setUser, BASE_URL } from "../redux";

const Signup = props => {
    const username = useFormInput("")
    const breed = useFormInput("")
    const owner_name = useFormInput("")
    const img_url = useFormInput("")
    const password = useFormInput("")
    const [error, setError] = useState(false)
    const [file, setFile] = useState(null)

    const handleFileChange = event => {
        event.preventDefault()
        setFile(event.target.files[0])
    }

    const handleSubmit = event => {
        event.preventDefault()
        setError(false)
        const formData = new FormData()
        formData.append("username", username.value)
        formData.append("breed", breed.value)
        formData.append("owner_name", owner_name.value)
        formData.append("img_url", img_url.value)
        formData.append("password", password.value)
        formData.append("image", file)
        fetch(`${BASE_URL}users`, {
            method: "POST",
            body: formData
        })
        .then(resp => resp.json())
        .then(response => {
            if (!response.error) {
                props.setUser(response.user)
                localStorage.setItem("token", response.jwt)
                props.history.push('/')
            } else {
                setError(true)
            }
        })
    }

    return (
        <div className="ui form">
            <h1>Sign Up</h1>
            {error ? <h3>Wrong inputs</h3> : null}
            <form onSubmit={handleSubmit}>
                <div className="ui field">
                    <label>Username</label><br/>
                    <input
                        name="username"
                        placeholder="Enter username"
                        {...username}
                    />
                </div>
                <div className="ui field">
                    <label>Breed</label><br/>
                    <input
                        name="breed"
                        placeholder="Enter breed"
                        {...breed}
                    />
                </div>
                <div className="ui field">
                    <label>Owner Name</label><br/>
                    <input
                        name="owner_name"
                        placeholder="Enter owner name"
                        {...owner_name}
                    />
                </div>
                <div className="ui field">
                    <label>Password</label><br/>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        {...password}
                    />
                </div>
                <div className="ui field">
                    <label>Profile Image (Optional)</label><br/>
                    <input type="file" onChange={handleFileChange} />
                    <p style={{marginLeft: "7em", marginTop: "3px"}}>Or</p>
                    <input
                        name="img_url"
                        placeholder="Enter an image url"
                        {...img_url}
                    />
                </div>
                <div className="form button">
                    <button type="submit">
                        Sign Up
                    </button>
                </div>
                <div className="toggle button">
                    <p>Or <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: data => dispatch(setUser(data))
    }
}

export default connect(null, mapDispatchToProps)(Signup)

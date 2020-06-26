import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormInput } from '../services/FormHook'
import { connect } from "react-redux";
import { setUser } from "../redux";

// const BASE_URL = "https://cat-space-backend.herokuapp.com/users"
const BASE_URL = "http://localhost:3000/users"

const Signup = props => {
    const username = useFormInput("")
    const breed = useFormInput("")
    const owner_name = useFormInput("")
    const img_url = useFormInput("")
    const password = useFormInput("")
    const [error, setError] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()
        fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                breed: breed.value,
                owner_name: owner_name.value,
                img_url: img_url.value,
                password: password.value
            })
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
                    <label>Image URL</label><br/>
                    <input
                        name="img_url"
                        placeholder="Enter an image url"
                        {...img_url}
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

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormInput } from '../services/FormHook'
import { connect } from "react-redux";
import { setUser, BASE_URL } from "../redux";

const Login = props => {
    const username = useFormInput("")
    const password = useFormInput("")
    const [error, setError] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()
        setError(false)
        fetch(`${BASE_URL}auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                username: username.value,
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
            <h1>Login</h1>
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
                        Login
                    </button>
                </div>
            </form>
            <div className="toggle button">
                <p>Or <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: data => dispatch(setUser(data))
    }
}

export default connect(null, mapDispatchToProps)(Login)

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const URL = "http://localhost:3000/users"
const EMPTYFIELDS = {
    username: "",
    owner_name: "",
    breed: "",
    img_url: "",
    password: ""
}

class Signup extends Component {
    state = {
        fields: EMPTYFIELDS,
        error: false
    }

    handleChange = event => {
        const newFields = {...this.state.fields, [event.target.name]: event.target.value}
        this.setState({ fields: newFields })
    }

    handleSubmit = event => {
        event.preventDefault()
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(this.state.fields)
        })
        .then(resp => resp.json())
        .then(user => {console.log(user)
            if (!user.error) {
                this.props.onLogin(user)
                this.props.history.push('/')
            } else {
                this.setState({ error: true })
            }
        })
        .catch()
        this.setState({ fields: EMPTYFIELDS })
    }

    render() {
        const { username, owner_name, breed, img_url, password } = this.state.fields
        return(
            <div className="ui form">
                {/* {this.state.error ? <h1>That username is already taken</h1> : null} */}
                <form onSubmit={this.handleSubmit}>
                    <div className="ui field">
                        <label>Username</label><br/>
                        <input
                            name="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="ui field">
                        <label>Owner Name</label><br/>
                        <input
                            name="owner_name"
                            placeholder="Enter owner name"
                            value={owner_name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="ui field">
                        <label>Breed</label><br/>
                        <input
                            name="breed"
                            placeholder="Enter breed"
                            value={breed}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="ui field">
                        <label>Image URL</label><br/>
                        <input
                            name="img_url"
                            placeholder="Enter an image url"
                            value={img_url}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="ui field">
                        <label>Password</label><br/>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div>
                    {/* <div className="ui field">
                        <label>Password Confirmation</label><br/>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div> */}
                    <div className="form button">
                        <button type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="toggle button">
                    <p>Or <Link to="/login">Login</Link></p>
                    {/* <h2>or</h2>
                    <button type="submit" onClick={() => this.props.history.push("/login")}>
                        Login
                    </button> */}
                </div>
            </div>
        )
    }    
}

export default Signup

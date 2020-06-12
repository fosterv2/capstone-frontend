import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormInput } from '../services/FormHook'

const URL = "http://localhost:3000/users"

const Signup = props => {
    const username = useFormInput("")
    const breed = useFormInput("")
    const owner_name = useFormInput("")
    const img_url = useFormInput("")
    const password = useFormInput("")
    const [error, setError] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()
        fetch(URL, {
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
        .then(user => {
            if (!user.error) {
                props.onLogin(user)
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
// const EMPTYFIELDS = {
//     username: "",
//     owner_name: "",
//     breed: "",
//     img_url: "",
//     password: ""
// }

// class Signup extends Component {
//     state = {
//         fields: EMPTYFIELDS,
//         error: false
//     }

//     handleChange = event => {
//         const newFields = {...this.state.fields, [event.target.name]: event.target.value}
//         this.setState({ fields: newFields })
//     }

//     handleSubmit = event => {
//         event.preventDefault()
//         fetch(URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             },
//             body: JSON.stringify(this.state.fields)
//         })
//         .then(resp => resp.json())
//         .then(user => {
//             if (!user.error) {
//                 this.props.onLogin(user)
//                 this.props.history.push('/')
//             } else {
//                 this.setState({ error: true })
//             }
//         })
//         .catch()
//         this.setState({ fields: EMPTYFIELDS })
//     }

//     render() {
//         const { username, owner_name, breed, img_url, password } = this.state.fields
//         return(
//             <div className="ui form">
//                 {/* {this.state.error ? <h1>That username is already taken</h1> : null} */}
//                 <form onSubmit={this.handleSubmit}>
//                     <div className="ui field">
//                         <label>Username</label><br/>
//                         <input
//                             name="username"
//                             placeholder="Enter username"
//                             value={username}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <div className="ui field">
//                         <label>Owner Name</label><br/>
//                         <input
//                             name="owner_name"
//                             placeholder="Enter owner name"
//                             value={owner_name}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <div className="ui field">
//                         <label>Breed</label><br/>
//                         <input
//                             name="breed"
//                             placeholder="Enter breed"
//                             value={breed}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <div className="ui field">
//                         <label>Image URL</label><br/>
//                         <input
//                             name="img_url"
//                             placeholder="Enter an image url"
//                             value={img_url}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <div className="ui field">
//                         <label>Password</label><br/>
//                         <input
//                             name="password"
//                             type="password"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     {/* <div className="ui field">
//                         <label>Password Confirmation</label><br/>
//                         <input
//                             name="password"
//                             type="password"
//                             placeholder="password"
//                             value={password}
//                             onChange={this.handleChange}
//                         />
//                     </div> */}
//                     <div className="form button">
//                         <button type="submit">
//                             Sign Up
//                         </button>
//                     </div>
//                 </form>
//                 <div className="toggle button">
//                     <p>Or <Link to="/login">Login</Link></p>
//                     {/* <h2>or</h2>
//                     <button type="submit" onClick={() => this.props.history.push("/login")}>
//                         Login
//                     </button> */}
//                 </div>
//             </div>
//         )
//     }    
// }

export default Signup

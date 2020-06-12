import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormInput } from '../services/FormHook'

const URL = "http://localhost:3000/auth"

const Login = props => {
    const username = useFormInput("")
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
// const EMPTYFIELDS = {
//     username: "",
//     password: ""
// }

// class Login extends Component {
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
//             body: JSON.stringify({
//                 username: this.state.fields.username,
//                 password: this.state.fields.password
//             })
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
//         this.setState({ fields: EMPTYFIELDS })
//     }

//     render() {
//         const { username, password } = this.state.fields
//         return (
//             <div className="ui form">
//                 {this.state.error ? <h1>Wrong inputs</h1> : null}
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
//                         <label>Password</label><br/>
//                         <input
//                             name="password"
//                             type="password"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <div className="form button">
//                         <button type="submit">
//                             Login
//                         </button>
//                     </div>
//                 </form>
//                 <div className="toggle button">
//                     <p>Or <Link to="/signup">Sign Up</Link></p>
//                 </div>
//             </div>
//         )
//     }
// }

export default Login

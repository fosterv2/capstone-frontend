import React, { Component } from 'react'
// import { useFormInput } from '../services/FormHook'

// const ProfileForm = ({ user }) => {
//     const username = useFormInput(user.username)
//     const breed = useFormInput(user.breed)
//     const owner_name = useFormInput(user.owner_name)
//     const img_url = useFormInput(user.img_url)

//     return (
//         <div className="ui form">
//                 <h1>Your User Profile</h1>
//                 <form onSubmit={() => console.log("Hi")}>
//                     <div className="ui field">
//                         <label>Username</label><br/>
//                         <input
//                             name="username"
//                             placeholder="Enter username"
//                             {...username}
//                         />
//                     </div>
//                     <div className="ui field">
//                         <label>Breed</label><br/>
//                         <input
//                             name="breed"
//                             placeholder="Enter breed"
//                             {...breed}
//                         />
//                     </div>
//                     <div className="ui field">
//                         <label>Owner Name</label><br/>
//                         <input
//                             name="owner_name"
//                             placeholder="Enter owner name"
//                             {...owner_name}
//                         />
//                     </div>
//                     <div className="ui field">
//                         <label>Image URL</label><br/>
//                         <input
//                             name="img_url"
//                             placeholder="Enter an image url"
//                             {...img_url}
//                         />
//                     </div>
//                     <div className="form button">
//                         <button type="submit">
//                             Update Profile
//                         </button>
//                     </div>
//                 </form>
//             </div>
//     )
// }

class ProfileForm extends Component {
    state = {
        fields: {
            username: "",
            breed: "",
            owner_name: "",
            img_url: ""
        }
    }

    componentDidMount() {
        this.setState({ fields: {...this.props.user} })
    }

    handleOnChange = event => {
        const newFields = { ...this.state.fields, [event.target.name]: event.target.value }
        this.setState({ fields: newFields })
    }
    
    render() {
        const { username, breed, owner_name, img_url } = this.state.fields
        return (
            <div className="ui form">
                <h1>Your User Profile</h1>
                <form onSubmit={() => console.log("Hi")}>
                    <div className="ui field">
                        <label>Username</label><br/>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="ui field">
                        <label>Breed</label><br/>
                        <input
                            name="breed"
                            placeholder="Enter breed"
                            value={breed}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="ui field">
                        <label>Owner Name</label><br/>
                        <input
                            name="owner_name"
                            placeholder="Enter owner name"
                            value={owner_name}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="ui field">
                        <label>Image URL</label><br/>
                        <input
                            name="img_url"
                            placeholder="Enter an image url"
                            value={img_url}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form button">
                        <button type="submit">
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProfileForm
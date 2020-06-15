import React, { Component } from 'react'
import { connect } from "react-redux";
import { updateUser } from "../redux";

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

    handleSubmit = event => {
        event.preventDefault()
        this.props.updateUser(this.state.fields)
        this.props.history.push("/")
    }
    
    render() {
        const { username, breed, owner_name, img_url } = this.state.fields
        return (
            <div className="ui form">
                <h1>Your User Profile</h1>
                <form onSubmit={this.handleSubmit}>
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

const mapStateToProps = state => {
    return {
        user: state.currentUser
    }
}
  
  const mapDispatchToProps = dispatch => {
    return {
        updateUser: (data) => dispatch(updateUser(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

// members along with posts
import React, { Component } from 'react'

class Group extends Component {
    state = {
        group: {
            name: "",
            description: "",
            users: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/groups/${this.props.match.params.group_id}`)
        .then(resp => resp.json())
        .then(group => this.setState({ group }))
    }

    listUsers = () => {
        return this.state.group.users.map(user => <li>{user.username}</li>)
    }

    render() {
        return (
            <div>Hello from a Group</div>
        )
    }
}

export default Group

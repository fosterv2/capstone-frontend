import React, { Component } from 'react'
import GroupForm from '../forms/GroupForm'
import { Link } from 'react-router-dom'
import AuthHOC from '../services/AuthHOC'
import { connect } from "react-redux";
import { addGroup, joinGroup, leaveGroup } from "../redux"

class AllGroups extends Component {
    state = {
        addClicked: false,
        currentGroup: {
            name: "",
            description: ""
        }
    }

    renderGroups = () => {
        return this.props.groups.map(group => {
            return <div className="join" key={group.id}>
            {
                !group.users.find(user => user.id === this.props.user.id) ?
                <p><span onClick={() => this.handleClickName(group)}>{group.name}</span><br />
                <button onClick={() => this.props.joinGroup(this.props.user.id, group.id)}>Join</button></p>
                : <p><Link to={`/groups/${group.id}`}>{group.name}</Link><br />
                <button onClick={() => this.props.leaveGroup(this.props.user.id, group.id)}>Leave</button></p>
            }
            </div>
        })
    }

    // handleJoinClick = group_id => {
    //     this.props.j
    // }

    handleClickButton = () => {
        this.setState(prev => {
            return { addClicked: !prev.addClicked }
        })
    }

    handleClickName = group => {
        this.setState({ currentGroup: group })
    }

    handleSubmit = event => {
        event.preventDefault()
        const body = {
            name: event.target.name.value,
            description: event.target.description.value,
            creator_id: this.props.user.id
        }
        this.props.addGroup(body)
        this.setState({ addClicked: false })
    }

    render() {
        return (
            <div className="main groups">
                <div className="all groups">
                    {this.state.addClicked ?
                    <GroupForm groupInfo={{name: "", description: ""}} handleSubmit={this.handleSubmit} handleBack={this.handleClickButton} />
                    : <button onClick={this.handleClickButton}>Start a new Group</button>}
                    <h3>Click on a group for info</h3>
                    {this.renderGroups()}
                </div>
                <div className="single group">
                    <h2>{this.state.currentGroup.name}</h2>
                    <p>{this.state.currentGroup.description}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        groups: state.groups,
        user: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addGroup: (body) => dispatch(addGroup(body)),
        joinGroup: (user_id, group_id) => dispatch(joinGroup(user_id, group_id)),
        leaveGroup: (user_id, group_id) => dispatch(leaveGroup(user_id, group_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthHOC(AllGroups))

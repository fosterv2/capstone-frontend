import React, { Component, Fragment } from 'react'
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

    renderJoinedGroups = () => {
        const { groups, user, leaveGroup } = this.props
        return groups.filter(group => group.users.find(groupUser => groupUser.id === user.id)).map(group => {
            return <div className="join" key={group.id}>
                <p><Link to={`/groups/${group.id}`}>{group.name}</Link><br />
                <button onClick={() => leaveGroup(user.id, group.id)}>Leave</button></p>
            </div>
        })
    }

    renderOtherGroups = () => {
        const { groups, user, joinGroup } = this.props
        return groups.filter(group => !group.users.find(groupUser => groupUser.id === user.id)).map(group => {
            return <div className="join" key={group.id}>
                <p><span onClick={() => this.handleClickName(group)}>{group.name}</span><br />
                <button onClick={() => joinGroup(user.id, group.id)}>Join</button></p>
            </div>
        })
    }

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
            <Fragment>
            {this.state.addClicked ?
            <GroupForm groupInfo={{name: "", description: ""}} handleSubmit={this.handleSubmit} handleBack={this.handleClickButton} />
            : <button style={{ marginLeft: "5%", marginTop: "3%" }} onClick={this.handleClickButton}>Start a new Group</button>}
            <div className="main groups">
                <div className="all groups">
                    <h3>Your Groups</h3>
                    {this.renderJoinedGroups()}
                </div>
                <div className="all groups">
                    <h3>Other Groups (click name for info)</h3>
                    {this.renderOtherGroups()}
                </div>
                <div className="single group">
                    <h2>{this.state.currentGroup.name}</h2>
                    <p>{this.state.currentGroup.description}</p>
                </div>
            </div>
            </Fragment>
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

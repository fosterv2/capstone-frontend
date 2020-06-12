import React, { Component } from 'react'
import GroupForm from '../forms/GroupForm'
import { Link } from 'react-router-dom'
import AuthHOC from '../services/AuthHOC'

class AllGroups extends Component {
    state = {
        addClicked: false,
        currentGroup: {
            name: "",
            description: ""
        }
    }

    renderGroupsOld = () => {
        return this.props.groups.map(group => {
            return <div className="join" key={group.id}>
                <p><span onClick={() => this.handleClickName(group)}>{group.name}</span><br />
                {
                    !group.users.find(user => user.id === this.props.user.id) ?
                    <button onClick={() => this.props.handleJoinClick(group.id)}>Join</button>
                    : <button onClick={() => this.props.handleLeaveClick(group.id)}>Leave</button>
                }</p>
            </div>
        })
    }

    renderGroups = () => {
        return this.props.groups.map(group => {
            return <div className="join" key={group.id}>
            {
                !group.users.find(user => user.id === this.props.user.id) ?
                <p><span onClick={() => this.handleClickName(group)}>{group.name}</span><br />
                <button onClick={() => this.props.handleJoinClick(group.id)}>Join</button></p>
                : <p><Link to={`/groups/${group.id}`}>{group.name}</Link><br />
                <button onClick={() => this.props.handleLeaveClick(group.id)}>Leave</button></p>
            }
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
        this.props.handleSubmit(event)
        this.setState({ addClicked: false })
    }

    render() {
        return (
            <div className="main groups">
                <div className="all groups">
                    {
                        this.state.addClicked ?
                        <GroupForm handleSubmit={this.handleSubmit} handleBack={this.handleClickButton} />
                        : <button onClick={this.handleClickButton}>Start a new Group</button>
                    }
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

export default AuthHOC(AllGroups)

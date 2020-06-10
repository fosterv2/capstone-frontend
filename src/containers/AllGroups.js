import React, { Component } from 'react'
import GroupForm from '../forms/GroupForm'

class AllGroups extends Component {
    state = {
        addClicked: false
    }

    renderGroups = () => {
        return this.props.groups.map(group => {
            return <div key={group.id}>
                <p><span onClick={() => console.log("Show a group profile")}>{group.name}</span><br />
                <button onClick={() => this.props.handleClick(group.id)}>Join</button></p>
            </div>
        })
    }

    handleClick = () => {
        this.setState(prev => {
            return { addClicked: !prev.addClicked }
        })
    }

    render() {
        return (
            <div className="all groups">
                {this.state.addClicked ?
                <GroupForm handleSubmit={this.props.handleSubmit} handleBack={this.handleClick} />
                : <button onClick={this.handleClick}>Start a new Group</button>}
                {this.renderGroups()}
            </div>
        )
    }
}

export default AllGroups
